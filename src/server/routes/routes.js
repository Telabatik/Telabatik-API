const authRoutes = require('../routes/authRoutes');
 
const routes = [
  {
    path: '/',
    method: 'GET',
    handler: (request, h) => {
      const response = h.response({
        status: 'success',
        message: 'Reached Telabatik API Service.',
        data: {
          accessedAt: new Date().toISOString()
        }
      });
    
      response.code(200);
      return response;
    },
    config: { auth: false }
  },
  ...authRoutes
];
 
module.exports = routes;