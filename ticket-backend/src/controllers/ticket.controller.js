const db = require("../database");

const obtenerComprasDelUsuario = async (req, res) => {
  try {
    const userId = req.user.id;

    const [tickets] = await db.query(
      `SELECT t.id AS ticketId, e.name AS eventName, t.first_name, t.last_name, t.dni
       FROM tickets t
       JOIN purchases p ON t.purchase_id = p.id
       JOIN events e ON p.event_id = e.id
       WHERE p.user_id = ?`,
      [userId]
    );

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las compras" });
  }
};

module.exports = { obtenerComprasDelUsuario };