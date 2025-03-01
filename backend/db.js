const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connectionConfig = {
  host: 'localhost', // Cambia esto si tu servidor MySQL está en otro lugar
  user: 'nuevo_usuario', // Usuario de MySQL
  password: 'nueva_contraseña', // Contraseña de MySQL
  database: 'pos_db', // Asegúrate de que el nombre coincide con tu base de datos
  port: 3306, // Puerto predeterminado para MySQL (ajusta si usas otro)
};

// Crear la conexión a la base de datos
console.log('Intentando conectar a la base de datos con la siguiente configuración:'); // Depuración
console.log(connectionConfig); // Muestra la configuración para verificar errores

const connection = mysql.createConnection(connectionConfig);

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error('🚨 Error al conectar a la base de datos:'); // Depuración
    console.error(`❌ Detalles del error: ${err.message}`); // Detalles más claros del error
    console.error('🛠️ Verifica que tu servidor MySQL esté en ejecución y que los datos de conexión sean correctos.');
    process.exit(1); // Detener la aplicación si no se puede conectar
  } else {
    console.log('✅ Conexión exitosa a la base de datos'); // Depuración
    console.log(`🌟 Conectado al host: ${connectionConfig.host}, Base de datos: ${connectionConfig.database}`);
  }
});

// Probar la conexión con una consulta inicial
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('⚠️ Error al realizar consulta de prueba:'); // Depuración
    console.error(`❌ Detalles del error: ${err.message}`);
  } else {
    console.log('🔍 Consulta de prueba ejecutada exitosamente. Resultado:', results[0].solution); // Depuración
  }
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;
