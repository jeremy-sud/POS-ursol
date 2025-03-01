const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log('Middleware inicializado: CORS y JSON parseados');

// Ruta para crear un producto
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;
  console.log(`Solicitud recibida: Crear producto -> Nombre: ${nombre}, Precio: ${precio}, Stock: ${stock}`); // Depuración

  if (!nombre || !precio || !stock) {
    console.error('Error: Uno o más campos requeridos están vacíos'); // Depuración
    return res.status(400).send('Todos los campos son requeridos');
  }

  const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
  connection.query(query, [nombre, precio, stock], (err) => {
    if (err) {
      console.error('Error al agregar producto en la base de datos:', err); // Depuración
      return res.status(500).send('Error al agregar producto');
    }
    console.log('Producto agregado exitosamente en la base de datos'); // Depuración
    res.status(201).send('Producto agregado exitosamente');
  });
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  console.log('Solicitud recibida: Obtener todos los productos'); // Depuración
  const query = 'SELECT * FROM productos';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos desde la base de datos:', err); // Depuración
      return res.status(500).send('Error al obtener productos');
    }
    console.log('Productos obtenidos correctamente:', results); // Depuración
    res.status(200).json(results);
  });
});

// Ruta para registrar una venta
app.post('/ventas', (req, res) => {
  const { detalles, total } = req.body;
  console.log('Solicitud recibida: Registrar venta'); // Depuración
  console.log('Detalles recibidos:', detalles, 'Total:', total); // Depuración

  if (!detalles || !total) {
    console.error('Error: Detalles de la venta o total están vacíos'); // Depuración
    return res.status(400).send('Detalles de la venta y total son requeridos');
  }

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar transacción:', err); // Depuración
      throw err;
    }

    const ventaQuery = 'INSERT INTO ventas (total) VALUES (?)';
    connection.query(ventaQuery, [total], (err, ventaResult) => {
      if (err) {
        console.error('Error al registrar la venta:', err); // Depuración
        return connection.rollback(() => {
          res.status(500).send('Error al registrar la venta');
        });
      }

      const ventaId = ventaResult.insertId;
      console.log(`Venta registrada con ID: ${ventaId}`); // Depuración

      const detalleQuery = 'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, subtotal) VALUES ?';
      const detallesValores = detalles.map((item) => [ventaId, item.producto_id, item.cantidad, item.subtotal]);
      console.log('Detalles a insertar en la base de datos:', detallesValores); // Depuración

      connection.query(detalleQuery, [detallesValores], (err) => {
        if (err) {
          console.error('Error al registrar los detalles de la venta:', err); // Depuración
          return connection.rollback(() => {
            res.status(500).send('Error al registrar los detalles de la venta');
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error('Error al confirmar la transacción:', err); // Depuración
            return connection.rollback(() => {
              res.status(500).send('Error al confirmar la venta');
            });
          }
          console.log('Venta registrada exitosamente con todos los detalles'); // Depuración
          res.status(201).send('Venta registrada exitosamente');
        });
      });
    });
  });
});

// Ruta para obtener el historial de ventas
app.get('/ventas', (req, res) => {
  console.log('Solicitud recibida: Obtener historial de ventas'); // Depuración
  const query = `
    SELECT v.id AS venta_id, v.fecha, v.total, dv.producto_id, dv.cantidad, dv.subtotal
    FROM ventas v
    JOIN detalle_ventas dv ON v.id = dv.venta_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL del historial de ventas:', err.message); // Depuración
      return res.status(500).send('Error al obtener historial de ventas');
    }
    console.log('Historial de ventas obtenido correctamente:', results); // Depuración
    res.status(200).json(results);
  });
});

// Middleware para manejo de errores genéricos
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.stack); // Depuración
  res.status(500).send('Ocurrió un error en el servidor');
});

// Inicia el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend ejecutándose en http://localhost:${PORT}`); // Depuración
});
