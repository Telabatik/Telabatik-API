const indexHandler = require('../server/handler');
 
const routes = [
  {
    path: '/',
    method: 'GET',
    handler: indexHandler,
  }
];
 
module.exports = routes;