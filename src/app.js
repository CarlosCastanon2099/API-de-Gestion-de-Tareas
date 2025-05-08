import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" assert { type: "json" };
import sequelize, { testConnection } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import createError from "http-errors";

// Carga variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas de la API
app.use(taskRoutes);

// Documentacion Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para 404
app.use((req, res, next) => {
  next(createError(404, "Recurso no encontrado"));
});

// Handler de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

// Inicializacion de servidor y BD
const init = async () => {
  await testConnection();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
};

// Si se ejecuta directamente -> inicializa
if (import.meta.url === `file://${process.argv[1]}`) {
  init();
}

export default app;
