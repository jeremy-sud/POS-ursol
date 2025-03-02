const { getConnection } = require("../db");

const getReporteVentas = async (req, res) => {
  const { periodo } = req.params;

  try {
    const connection = getConnection();
    const [results] = await connection.query(
      "SELECT * FROM ventas WHERE periodo = ?",
      [periodo]
    );
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener el reporte de ventas:", err);
    res.status(500).send("Error al obtener el reporte de ventas");
  }
};

module.exports = {
  getReporteVentas,
};
