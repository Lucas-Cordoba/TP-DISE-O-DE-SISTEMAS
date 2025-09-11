const db = require("../database");

const createPurchase = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, cantidad, entradas } = req.body;

    if (!eventId || !cantidad || !entradas || entradas.length !== cantidad) {
      return res.status(400).json({ message: "Datos incompletos o incorrectos" });
    }

    // Insertar compra en la tabla purchases
    const [result] = await db.query(
      "INSERT INTO purchases (user_id, event_id) VALUES (?, ?)",
      [userId, eventId]
    );

    const purchaseId = result.insertId;

    // Insertar entradas en tickets vinculadas a purchaseId
    const insertTicketsPromises = entradas.map(({ nombre, apellido, dni }) => {
      return db.query(
        "INSERT INTO tickets (purchase_id, first_name, last_name, dni) VALUES (?, ?, ?, ?)",
        [purchaseId, nombre, apellido, dni]
      );
    });

    await Promise.all(insertTicketsPromises);

    res.status(201).json({ message: "Compra y tickets guardados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
};

module.exports = { createPurchase };