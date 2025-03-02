const express = require("express");
const { getConnection } = require("../db");
const router = express.Router();

// Ruta para crear una nueva base de datos
router.post("/create", async (req, res) => {
  const { dbName } = req.body;
  console.log(`Solicitud recibida: Crear base de datos -> Nombre: ${dbName}`);

  if (!dbName || typeof dbName !== "string" || dbName.trim() === "") {
    console.error(
      "Error: El nombre de la base de datos es requerido y debe ser una cadena no vacía"
    );
    return res
      .status(400)
      .send(
        "El nombre de la base de datos es requerido y debe ser una cadena no vacía"
      );
  }

  try {
    const connection = getConnection();
    await connection.query(`CREATE DATABASE ${dbName}`);
    console.log("Base de datos creada exitosamente");
    res.status(201).send("Base de datos creada exitosamente");
  } catch (err) {
    console.error("Error al crear la base de datos:", err);
    res.status(500).send("Error al crear la base de datos");
  }
});

// Ruta para listar todas las bases de datos
router.get("/list", async (req, res) => {
  console.log("Solicitud recibida: Listar todas las bases de datos");

  try {
    const connection = getConnection();
    const [results] = await connection.query("SHOW DATABASES");
    console.log("Bases de datos obtenidas correctamente:", results);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener las bases de datos:", err);
    res.status(500).send("Error al obtener las bases de datos");
  }
});

module.exports = router;
