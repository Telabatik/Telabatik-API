const { indexHandler, registerHandler, loginHandler } = require('../server/handler');
 
const routes = [
  {
    path: '/',
    method: 'GET',
    handler: indexHandler,
  },
  {
    path: '/auth/register',
    method: 'POST',
    handler: registerHandler,
  },
  {
    path: '/auth/login',
    method: 'POST',
    handler: loginHandler,
  },
];
 
module.exports = routes;