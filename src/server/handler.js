async function indexHandler(request, h) {
  const response = h.response({
    status: 'success',
    message: 'Reached Telabatik API Service',
    data: {
      accessedAt: new Date().toISOString()
    }
  });

  response.code(200);
  return response;
}

module.exports = indexHandler;