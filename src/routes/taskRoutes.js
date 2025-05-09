import express from "express";
import taskController from "../controllers/taskController.js";
import { validateCreate, validateUpdate } from "../validators/taskValidator.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 id:
 * *                   type: integer
 * *                 title:
 * *                   type: string
 * *                 description:
 * *                   type: string
 * *                 dueDate:
 * *                   type: string
 * *                   format: date-time
 * *                 status:
 * *                   type: string
 * *                   enum: [pending, in-progress, completed]
 * *                 createdAt:
 * *                   type: string
 * *                   format: date-time
 * *                 updatedAt:
 * *                   type: string
 * *                   format: date-time
  * *       500:
 * *         description: Error interno del servidor
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: Error interno del servidor
 * *       404:
 * *         description: No se encontraron tareas
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: No se encontraron tareas
 * *       400:
 * *         description: Error de validacion
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: Error de validacion
 * *  
 */
router.post("/tasks", validateCreate, taskController.createTask.bind(taskController));

/** 
 * @swagger
 * /tasks:
 * *   get:
 *     summary: Obtiene todas las tareas    
 * *     tags: [Tareas]
 * *     responses:
 * *       200:
 * *         description: Lista de tareas obtenida exitosamente
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: array
 * *               items:
 * *                 type: object
 * *                 properties:
 * *                   id:
 * *                     type: integer
 * *                   title:
 * *                     type: string
 * *                   description:
 * *                     type: string
 * *                   dueDate:
 * *                     type: string
 * *                     format: date-time
 * *                   status:
 * *                     type: string
 * *                     enum: [pending, in-progress, completed]
 * *                   createdAt:
 * *                     type: string
 * *                     format: date-time
 * *                   updatedAt:
 * *                     type: string
 * *                     format: date-time
 * *       500:
 * *         description: Error interno del servidor
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: Error interno del servidor
 * *       404:
 * *         description: No se encontraron tareas
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: No se encontraron tareas
 * *       400:
 * *         description: Error de validacion
 * *         content:
 * *           application/json:
 * *             schema:
 * *               type: object
 * *               properties:
 * *                 message:
 * *                   type: string
 * *                   example: Error de validacion
 * *  
 * 
 */
router.get("/tasks", taskController.getTasks.bind(taskController));


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *           properties:
 *            id:
 *             type: integer
 *            title:
 *            type: string
 *           description:
 *            type: string
 *           dueDate:
 *           type: string
 *          format: date-time
 *          status:
 *           type: string
 *          enum: [pending, in-progress, completed]
 *         createdAt:
 *        type: string
 *        format: date-time
 *        updatedAt:
 *       type: string
 *      format: date-time
 *        404:
 *          description: Tarea no encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Tarea no encontrada
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *        
 *
 */
router.get("/tasks/:id", taskController.getTaskById.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *        content:
 *          application/json:
 *           schema:
 *           type: object
 *          properties:
 *           id:
 *            type: integer
 *          title:
 *           type: string
 *         description:
 *          type: string
 *         dueDate:
 *        type: string
 *        format: date-time
 *        status:
 *        type: string
 *       enum: [pending, in-progress, completed]   
 *       createdAt:
 *       type: string
 *      format: date-time
 *      updatedAt:
 *      type: string
 *     format: date-time
 *        400:
 * 
 *          description: Error de validacion
 *          content:
 *           application/json:
 *            schema:
 *           type: object
 *          properties:
 *           message:
 *           type: string
 *         example: Error de validacion
 *         404:
 *        description: Tarea no encontrada
 *       content:
 *         application/json:
 *        schema:
 *        type: object
 *       properties:
 *        message:
 *       type: string
 *      example: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 *        content:
 *         application/json:
 *        schema:
 *        type: object
 *       properties:
 *       message:
 *      type: string
 * 
 * 
 */

router.put("/tasks/:id", validateUpdate, taskController.updateTask.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *        content:
 *         application/json:
 *        schema:
 *       type: object
 *      properties:
 *       message:
 *      type: string
 *      example: Tarea eliminada exitosamente
 *        404:
 *       description: Tarea no encontrada
 *      content:
 *        application/json:
 *       schema:
 *      type: object
 *      properties:
 *      message:
 *     type: string
 *     example: Tarea no encontrada
 *        500:
 *       description: Error interno del servidor
 *       content:
 *      application/json:
 *      schema:
 *     type: object
 *     properties:
 *     message:
 *    type: string
 *   example: Error interno del servidor
 *
 */
router.delete("/tasks/:id", taskController.deleteTask.bind(taskController));


export default router;
