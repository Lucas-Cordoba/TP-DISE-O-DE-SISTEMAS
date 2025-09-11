const db = require("../database");

const getAllEvents = async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM events");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener eventos" });
    }
  };
  
  const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Evento no encontrado" });
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener evento" });
    }
  };
  
  module.exports = { getAllEvents, getEventById };