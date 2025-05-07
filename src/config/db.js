import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargamos las variables de entorno
dotenv.config();

// La configuracion de la BD 
const dialect = process.env.DB_DIALECT || "sqlite";
const storage = process.env.DB_STORAGE || "./data/database.sqlite";

// Instanciamos Sequelize
const sequelize = new Sequelize({
  dialect,
  storage,

   // Logs de SQL dehabilitados 
  logging: false,
});

// Funcion para probar la conexion a la BD
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

export default sequelize;
