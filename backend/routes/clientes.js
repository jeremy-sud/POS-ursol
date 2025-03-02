const express = require("express");
const { body, param, query } = require("express-validator");
const router = express.Router();
const {
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
} = require("../controllers/clientesController");

router.get("/", getClientes);

router.post(
  "/",
  body("nombre").isString().notEmpty(),
  body("email").isEmail(),
  addCliente
);

router.put(
  "/:id",
  param("id").isInt(),
  body("nombre").optional().isString().notEmpty(),
  body("email").optional().isEmail(),
  updateCliente
);

router.delete("/:id", param("id").isInt(), deleteCliente);

router.get("/search", query("nombre").isString().notEmpty(), searchClientes);

module.exports = router;
