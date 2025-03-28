const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importamos CORS

const app = express();
const port = 5000;

// Middleware para manejar JSON
app.use(bodyParser.json());

// Usamos CORS para permitir solicitudes de React
app.use(cors());

// Conexión a la base de datos MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // Usuario por defecto en XAMPP
  password: '',    // Contraseña (vacía si no está configurada)
  database: 'login_db', // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

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
      res.status(200).json({Message: "Inicio exitoso"});
    } else {
      res.status(401).json({Message: "No exitoso"});
    }
  });
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

