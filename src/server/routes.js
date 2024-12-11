const { indexHandler, registerHandler, loginHandler, testValidationHandler } = require('../server/handler');
 
const routes = [
  {
    path: '/',
    method: 'GET',
    handler: indexHandler,
    config: { auth: false }
  },
  {
    path: '/auth/register',
    method: 'POST',
    handler: registerHandler,
    config: { auth: false }
  },
  {
    path: '/auth/login',
    method: 'POST',
    handler: loginHandler,
    config: { auth: false }
  },
  {
    path: '/auth/test-validate',
    method: 'GET',
    handler: testValidationHandler,
  }
];
 
module.exports = routes;