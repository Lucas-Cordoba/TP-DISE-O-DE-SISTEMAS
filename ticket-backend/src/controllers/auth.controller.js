const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error en el registro", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Buscar usuario por email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    

    if (users.length === 0) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const user = users[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.PASSWORD);

    if (!validPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el login", error: err.message });
  }
};

module.exports = { register, login };