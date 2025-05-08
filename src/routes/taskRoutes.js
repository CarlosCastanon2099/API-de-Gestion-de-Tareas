import express from "express";
import taskController from "../controllers/taskController.js";
import { validateCreate, validateUpdate } from "../validators/taskValidator.js";

const router = express.Router();

// Crea la tarea
router.post("/tasks", validateCreate, taskController.createTask.bind(taskController));
// Lista las tareas
router.get("/tasks", taskController.getTasks.bind(taskController));
// Obtenemos detalles de la tarea
router.get("/tasks/:id", taskController.getTaskById.bind(taskController));
// Actualizamos el estado de la tarea
router.put("/tasks/:id", validateUpdate, taskController.updateTask.bind(taskController));
// Eliminamos la tarea
router.delete("/tasks/:id", taskController.deleteTask.bind(taskController));

export default router;
