const { storeUserScanHistory, fetchUserScanHistory } = require('../../service/firestoreService');
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

  await storeUserScanHistory(request.auth.credentials.id, data);

  const response = h.response({
    status: 'success',
    message: 'Model predicted successfully.',
    data
  });

  response.code(201);
  return response;
}

async function predictHistoryHandler(request, h) {
  const data = await fetchUserScanHistory(request.auth.credentials.id);

  const response = h.response({
    status: 'success',
    message: 'User scan history retrieved successfully.',
    data
  });
  
  response.code(200);
  return response;
}

module.exports = { predictHandler, predictHistoryHandler };