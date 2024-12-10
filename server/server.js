const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importamos CORS
const tf = require('@tensorflow/tfjs-node');

const app = express();
const port = 5000;

// Middleware para manejar JSON
app.use(bodyParser.json());

// Usamos CORS para permitir solicitudes de React
app.use(cors());

// Conexión a la base de datos MySQL (XAMPP)
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',    // Usuario por defecto en XAMPP
//   password: '',    // Contraseña (vacía si no está configurada)
//   database: 'login_db', // Nombre de tu base de datos
// });

// Conectar a la base de datos
// db.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conexión exitosa a la base de datos');
// });

let model = null;
let history = null;

// Endpoint para validar login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para verificar si el usuario y la contraseña son correctos
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error en la consulta');
    }

    if (result.length > 0) {
      res.status(200).json({ Message: "Inicio exitoso" });
    } else {
      res.status(401).json({ Message: "No exitoso" });
    }
  });
});

app.post('/model/trained', async (req, res) => {
  // const evaluation = model.evaluate(xs, ys);
  // const lossAmount = evaluation[0].dataSync()[0];
  // const accuracy = evaluation[1].dataSync()[0];
  // const mse = evaluation[2].dataSync()[0];

  // console.log(lossAmount, accuracy, mse)

  // const prediction = model.predict(xs);
  // prediction.print();

  console.log(history.history['acc'])

  res.send({
    success: true,
    history: {
      acc: history.history['acc'],
      loss: history.history['loss'],
      mse: history.history['mse']
    }
  })

});

app.post('/model/predict', (req, res) => {
  let xs = tf.tensor2d(req.body.inputs);
  const prediction = model.predict(xs);
  res.json({
    success: true,
    predicted: prediction.arraySync()
  })

});

app.post('/model/train', async (req, res) => {
  try {
    const inputs = req.body.inputs;
    const outputs = req.body.outputs;

    const layers = req.body.layers;
    const layersActivations = req.body.layersActivations;
    const optimizer = req.body.optimizer;
    const loss = req.body.loss;
    const epochs = req.body.epochs;
    
    // console.log(inputs);
    // console.log(outputs);

    let xs = tf.tensor2d(inputs);
    let ys = tf.tensor2d(outputs);

    // const xsmin = xs.min(0)
    // const xsmax = xs.max(0)
    // xs = xs.sub(xsmin).div(xsmax.sub(xsmin))

    // const ysmin = ys.min(0)
    // const ysmax = ys.max(0)
    // ys = ys.sub(ysmin).div(ysmax.sub(ysmin))

    console.log(await xs.array())
    console.log(await ys.array())

    model = tf.sequential();
    for(let layer in layers) {
      if(layer == 0) {
        continue;
      }
      else if(layer == 1) {
        model.add(tf.layers.dense({ units: layers[layer], activation: layersActivations[layer], inputShape: [xs.shape[1]] }));
      }
      else if(layer == (layers.length - 1)) {
        model.add(tf.layers.dense({ units: layers[layer], activation: layersActivations[layer] }));
      } else {
        model.add(tf.layers.dense({ units: ys.shape[1], activation: layersActivations[layer] }));
      }
    }

    model.compile({
      optimizer: tf.train[optimizer](),
      loss: loss,
      metrics: ['accuracy', 'mse'],
    });

    history = await model.fit(xs, ys, {
      epochs: epochs,
      batchSize: 64,
      shuffle: true,
      callbacks: tf.callbacks.earlyStopping({ patience: 5 }),
    });

    res.json({
      success: true
    })
    
  }
  catch (e) {
    res.json({
      success: false,
      error: e.message
    })
  }

});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

