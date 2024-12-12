const path = require('path');
const { uploadScanImage } = require('../../service/cloudStorageService');
const { storeUserScanHistory, fetchUserScanHistory } = require('../../service/firestoreService');
const { inferClassification } = require('../../service/inferenceService')
const crypto = require('crypto');

async function predictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label } = await inferClassification(model, image._data);

  if (confidenceScore < 35) {
    const response = h.response({
      status: 'error',
      message: 'Model could not make an accurate prediction, try again.',
    });
  
    response.code(400);
    return response;
  }

  const scanId = crypto.randomUUID();
  const predictedAt = new Date().toISOString();

  const extension = path.extname(image.hapi.filename);
  const imageUrl = await uploadScanImage(`${request.auth.credentials.id}/${scanId}${extension}`, image._data);

  const data = {
    "id": scanId,
    "predictedAt": predictedAt,
    "label": label,
    "confidenceScore": confidenceScore,
    "imageUrl": imageUrl
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