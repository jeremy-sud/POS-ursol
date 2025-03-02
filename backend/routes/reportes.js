const express = require("express");
const router = express.Router();
const { getReporteVentas } = require("../controllers/reportesController");

router.get("/ventas/:periodo", getReporteVentas);

module.exports = router;
