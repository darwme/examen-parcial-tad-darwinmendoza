const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./models/db');  // Conexión a la base de datos
const app = express();

// Configuración de EJS para el frontend
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para mostrar el formulario de añadir recompensa
app.get('/add-recompensa', (req, res) => {
  res.render('addRecompensa');
});

// Ruta para procesar el formulario y añadir recompensa a la base de datos
app.post('/add-recompensa', async (req, res) => {
  const { tipo_recompensa, valor, condiciones, empleado_id, fecha_emision } = req.body;
  try {
    // Insertar recompensa en la base de datos
    const result = await pool.query(
      `INSERT INTO recompensa (tipo_recompensa, valor, condiciones, empleado_id, fecha_emision)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [tipo_recompensa, valor, condiciones, empleado_id, fecha_emision]
    );
    res.redirect('/');  // Redirige a la página principal o muestra un mensaje de éxito
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al añadir recompensa');
  }
});

// Ruta para la página principal
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recompensa');
    res.render('index', { recompensas: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar las recompensas');
  }
});

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
