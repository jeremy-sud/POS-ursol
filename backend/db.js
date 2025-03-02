const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const connectionConfig = {
  host: 'localhost', // Cambia esto si tu servidor MySQL está en otro lugar
  user: 'nuevo_usuario', // Usuario de MySQL
  password: 'nueva_contraseña', // Contraseña de MySQL
  database: 'pos_db', // Asegúrate de que el nombre coincide con tu base de datos
  port: 3306, // Puerto predeterminado para MySQL (ajusta si usas otro)
};

let connection;

// Función para conectar a la base de datos
const connectToDatabase = async () => {
  if (connection) {
    return connection;
  }

  try {
    console.log('Intentando conectar a la base de datos con la siguiente configuración:'); // Depuración
    console.log(connectionConfig); // Muestra la configuración para verificar errores

    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Conexión exitosa a la base de datos'); // Depuración
    console.log(`🌟 Conectado al host: ${connectionConfig.host}, Base de datos: ${connectionConfig.database}`);

    // Probar la conexión con una consulta inicial
    const [results] = await connection.query('SELECT 1 + 1 AS solution');
    console.log('🔍 Consulta de prueba ejecutada exitosamente. Resultado:', results[0].solution); // Depuración

    return connection;
  } catch (err) {
    console.error('🚨 Error al conectar a la base de datos:'); // Depuración
    console.error(`❌ Detalles del error: ${err.message}`); // Detalles más claros del error
    console.error('🛠️ Verifica que tu servidor MySQL esté en ejecución y que los datos de conexión sean correctos.');
    process.exit(1); // Detener la aplicación si no se puede conectar
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error('La conexión a la base de datos no está establecida. Llama a connectToDatabase primero.');
  }
  return connection;
};

// Exportar la función de conexión para usarla en otros archivos
module.exports = {
  connectToDatabase,
  getConnection,
};
