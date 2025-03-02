require('dotenv').config();
const { connectToDatabase } = require('./db');
const app = require('./app');

const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(1);
  }
};

startServer();
