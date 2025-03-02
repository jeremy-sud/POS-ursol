const { getConnection } = require("../db");

const generarVenta = async (req, res) => {
  const { productos, total, clienteId } = req.body;

  if (!productos || !total || !clienteId) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  try {
    const connection = getConnection();
    await connection.beginTransaction();

    const [ventaResult] = await connection.query(
      "INSERT INTO ventas (cliente_id, total) VALUES (?, ?)",
      [clienteId, total]
    );

    const ventaId = ventaResult.insertId;

    for (const producto of productos) {
      await connection.query(
        "INSERT INTO ventas_productos (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
        [ventaId, producto.id, producto.cantidad, producto.precio]
      );
    }

    await connection.commit();
    res.status(201).send("Venta generada exitosamente");
  } catch (err) {
    await connection.rollback();
    console.error("Error al generar la venta:", err);
    res.status(500).send("Error al generar la venta");
  }
};

module.exports = {
  generarVenta,
};
