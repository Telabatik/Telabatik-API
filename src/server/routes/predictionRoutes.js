const { predictHandler, predictHistoryHandler } = require('../handlers/predictionHandler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: predictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      }
    },
  },
  {
    path: '/predict/history',
    method: 'GET',
    handler: predictHistoryHandler
  }
];

module.exports = routes;