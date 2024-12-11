require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes/routes');
const { getUserById } = require('../service/userService');
const { loadModel } = require('../service/inferenceService');

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
      validate: (decoded) => {
        if (!getUserById(decoded.id)) {
          return { isValid: false };
        }
      
        return { isValid: true };
      }
    });

  server.auth.default('jwt');

  server.route(routes);

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
})();