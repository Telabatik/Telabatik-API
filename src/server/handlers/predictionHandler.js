const { inferClassification } = require('../../service/inferenceService')
const crypto = require('crypto');

async function predictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label } = await inferClassification(model, image);

  const data = {
    "id": crypto.randomUUID(),
    "predictedAt": new Date().toISOString(),
    "label": label,
    "confidenceScore": confidenceScore
  };

  const response = h.response({
    status: 'success',
    message: 'Model predicted successfully.',
    data
  });

  response.code(201);
  return response;
}

module.exports = { predictHandler };