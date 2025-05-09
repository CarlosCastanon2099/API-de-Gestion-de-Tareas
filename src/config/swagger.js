import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestion de Tareas",
      version: "1.0.0",
      description: "Documentacion de la API de tareas",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
export const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    url: "http://localhost:3000/api-docs.json",
  },
};
export const swaggerUiUrl = "/api-docs";
export const swaggerUiPath = "/api-docs.json";
export const swaggerUiTitle = "API de Gestion de Tareas";
