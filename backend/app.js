require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const productosRouter = require('./routes/productos');
const databaseRouter = require('./routes/database');
const clientesRouter = require('./routes/clientes');
const reportesRouter = require('./routes/reportes');
const ventasRouter = require('./routes/ventas');
const inventarioRouter = require('./routes/inventario');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use('/productos', productosRouter);
app.use('/database', databaseRouter);
app.use('/clientes', clientesRouter);
app.use('/reportes', reportesRouter);
app.use('/ventas', ventasRouter);
app.use('/inventario', inventarioRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
