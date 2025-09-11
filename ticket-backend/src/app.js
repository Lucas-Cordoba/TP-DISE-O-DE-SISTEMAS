const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const purchaseRoutes = require("./routes/purchase.routes");
const eventRoutes = require("./routes/events.routes");
const ticketRoutes = require("./routes/ticket.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes); 
module.exports = app;