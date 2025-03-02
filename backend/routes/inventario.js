const express = require("express");
const { body } = require("express-validator");
const {
  getInventario,
  actualizarInventario,
} = require("../controllers/inventarioController");
const router = express.Router();

router.get("/", getInventario);

router.put(
  "/",
  body("productoId").isInt(),
  body("cantidad").isInt(),
  actualizarInventario
);

module.exports = router;
