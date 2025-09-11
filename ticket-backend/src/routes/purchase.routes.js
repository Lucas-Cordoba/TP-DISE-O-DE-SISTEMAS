const express = require("express");
const router = express.Router();
const { createPurchase } = require("../controllers/purchase.controller");
const authMiddleware = require("../middleware/auth.middleware"); 

// Crear una compra (requiere token)
router.post("/", authMiddleware, createPurchase);

module.exports = router;