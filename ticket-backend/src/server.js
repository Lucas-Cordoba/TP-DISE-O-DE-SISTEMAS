require("dotenv").config();              // cargar variables de entorno
const app = require("./app");            // tu app con rutas y middlewares
require("./database");                   // se conecta a la base de datos MySQL

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});