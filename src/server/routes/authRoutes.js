const { registerHandler, loginHandler, testValidationHandler } = require('../handlers/authHandler');

const routes = [
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