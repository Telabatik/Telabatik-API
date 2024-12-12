require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes/routes');
const { loadModel } = require('../service/inferenceService');
const { fetchUserById } = require('../service/firestoreService');

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  const model = await loadModel();
  server.app.model = model;

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
    { key: process.env.SECRET_KEY,
      validate: async (decoded) => {
        if (!(await fetchUserById(decoded.id))) {
          return { isValid: false };
        }
      
        return { isValid: true };
      }
    });

  server.auth.default('jwt');

  server.route(routes);

  server.ext('onPreResponse', function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      const newResponse = h.response({
        status: 'error',
        message: response.message
      });
      
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
})();