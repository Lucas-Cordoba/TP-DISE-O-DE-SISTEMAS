const express = require("express");
const router = express.Router();
const { obtenerComprasDelUsuario } = require("../controllers/ticket.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Ruta para obtener las compras del usuario (tickets)
router.get("/", authMiddleware, obtenerComprasDelUsuario);

module.exports = router;