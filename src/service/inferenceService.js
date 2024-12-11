const tf = require('@tensorflow/tfjs-node');

function loadModel() {
  const modelUrl = "file://inference-model/model.json";
  return tf.loadGraphModel(modelUrl);
}

async function inferClassification(model, image) {
  const tensor = tf.node.decodeJpeg(image, ratio=1/2)
  .resizeNearestNeighbor([224, 224])
  .expandDims()
  .toFloat()

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;

  const classes = [
    'Batik Buketan', 'Batik Cendrawasih', 'Batik Ceplok', 'Batik Corak Insang', 
    'Batik Dayak', 'Batik Gunungan', 'Batik Ikat Celup', 'Batik Kawung', 'Batik Lereng', 
    'Batik Megamendung', 'Batik Nitik', 'Batik Parang', 'Batik Prada', 'Batik Sekar', 
    'Batik Sidoluhur', 'Batik Truntum', 'Batik Tumpal',
  ];

  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const label = classes[classResult];

  return { confidenceScore, label };
  
}
module.exports = { loadModel, inferClassification };