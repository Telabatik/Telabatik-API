const { registerUser, loginUser } = require('../service/userService');

async function indexHandler(request, h) {
  const response = h.response({
    status: 'success',
    message: 'Reached Telabatik API Service.',
    data: {
      accessedAt: new Date().toISOString()
    }
  });

  response.code(200);
  return response;
}

async function registerHandler(request, h) {
  const userData = request.payload;
  const registered = await registerUser(userData);

  if (!registered) {
    const response = h.response({
      status: 'error',
      message: 'User registration failed.',
    });
  
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'User registered successfully.',
    data: {
      ...registered
    }
  });

  response.code(201);
  return response;
}

async function loginHandler(request, h) {
  const userData = request.payload;
  const loggedIn = await loginUser(userData);

  if (!loggedIn) {
    const response = h.response({
      status: 'error',
      message: 'User login failed.',
    });
  
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'User logged in successfully.',
    data: {
      ...loggedIn
    }
  });

  response.code(200);
  return response;
}

async function testValidationHandler(request, h) {
  const response = h.response({
    status: 'success',
    message: 'Token validation successful. User ID: ' + request.auth.credentials.id,
    data: {
      accessedAt: new Date().toISOString()
    }
  });

  response.header("Authorization", request.headers.authorization);
  response.code(200);
  return response;
}

module.exports = { indexHandler, registerHandler, loginHandler, testValidationHandler };