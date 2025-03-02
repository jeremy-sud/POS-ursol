const { getConnection } = require("../db");

const getInventario = async (req, res) => {
  try {
    const connection = getConnection();
    const [results] = await connection.query("SELECT * FROM inventario");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener el inventario:", err);
    res.status(500).send("Error al obtener el inventario");
  }
};

const actualizarInventario = async (req, res) => {
  const { productoId, cantidad } = req.body;

  if (!productoId || !cantidad) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  try {
    const connection = getConnection();
    await connection.query(
      "UPDATE inventario SET cantidad = ? WHERE producto_id = ?",
      [cantidad, productoId]
    );
    res.status(200).send("Inventario actualizado exitosamente");
  } catch (err) {
    console.error("Error al actualizar el inventario:", err);
    res.status(500).send("Error al actualizar el inventario");
  }
};

module.exports = {
  getInventario,
  actualizarInventario,
};
