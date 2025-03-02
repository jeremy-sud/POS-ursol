const express = require("express");
const { body } = require("express-validator");
const { generarVenta } = require("../controllers/ventasController");
const router = express.Router();

router.post(
  "/",
  body("productos").isArray().notEmpty(),
  body("total").isFloat({ gt: 0 }),
  body("clienteId").isInt(),
  generarVenta
);

module.exports = router;
