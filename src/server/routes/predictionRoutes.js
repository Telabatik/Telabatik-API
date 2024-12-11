const { predictHandler } = require('../handlers/predictionHandler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: predictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
      auth: false
    },
  }
];

module.exports = routes;