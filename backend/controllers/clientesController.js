const { getConnection } = require("../db");

const getClientes = async (req, res) => {
  try {
    const connection = getConnection();
    const [results] = await connection.query("SELECT * FROM clientes");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener los clientes:", err);
    res.status(500).send("Error al obtener los clientes");
  }
};

const addCliente = async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  try {
    const connection = getConnection();
    await connection.query(
      "INSERT INTO clientes (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );
    res.status(201).send("Cliente agregado exitosamente");
  } catch (err) {
    console.error("Error al agregar el cliente:", err);
    res.status(500).send("Error al agregar el cliente");
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  if (!id || (!nombre && !email)) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  try {
    const connection = getConnection();
    await connection.query(
      "UPDATE clientes SET nombre = ?, email = ? WHERE id = ?",
      [nombre, email, id]
    );
    res.status(200).send("Cliente actualizado exitosamente");
  } catch (err) {
    console.error("Error al actualizar el cliente:", err);
    res.status(500).send("Error al actualizar el cliente");
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("El ID del cliente es requerido");
  }

  try {
    const connection = getConnection();
    await connection.query("DELETE FROM clientes WHERE id = ?", [id]);
    res.status(200).send("Cliente eliminado exitosamente");
  } catch (err) {
    console.error("Error al eliminar el cliente:", err);
    res.status(500).send("Error al eliminar el cliente");
  }
};

const searchClientes = async (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).send("El nombre es requerido");
  }

  try {
    const connection = getConnection();
    const [results] = await connection.query(
      "SELECT * FROM clientes WHERE nombre LIKE ?",
      [`%${nombre}%`]
    );
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al buscar los clientes:", err);
    res.status(500).send("Error al buscar los clientes");
  }
};

module.exports = {
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
};
