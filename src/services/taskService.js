import taskRepo from "../repositories/taskRepository.js";
import createError from "http-errors";

class TaskService {
  /**
   * Crea una nueva tarea
   * @param {Object} dto
   * @returns {Promise<Task>}
   */
  async addTask(dto) {
    // Validación de negocio: título no vacío
    if (!dto.title || dto.title.trim() === "") {
      throw createError(400, "El campo 'title' es obligatorio");
    }
    const newTask = await taskRepo.create(dto);
    return newTask;
  }

  /**
   * Lista todas las tareas
   * @returns {Promise<Task[]>}
   */
  async listTasks() {
    return await taskRepo.findAll();
  }

  /**
   * Obtiene una tarea por ID
   * @param {string} id
   * @returns {Promise<Task>}
   */
  async getTask(id) {
    const task = await taskRepo.findById(id);
    if (!task) {
      throw createError(404, `Tarea con id ${id} no encontrada`);
    }
    return task;
  }

  /**
   * Cambia el estado de una tarea
   * @param {string} id
   * @param {Object} statusDto
   * @returns {Promise<Task>}
   */
  async changeStatus(id, statusDto) {
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!statusDto.status || !validStatuses.includes(statusDto.status)) {
      throw createError(400, `Status inválido, debe ser uno de: ${validStatuses.join(", ")}`);
    }
    const task = await this.getTask(id);
    await taskRepo.update(id, { status: statusDto.status });
    // Refrescar datos
    return await taskRepo.findById(id);
  }

  /**
   * Elimina una tarea
   * @param {string} id
   * @returns {Promise<void>}
   */
  async removeTask(id) {
    const deletedCount = await taskRepo.delete(id);
    if (deletedCount === 0) {
      throw createError(404, `Tarea con id ${id} no encontrada`);
    }
  }
}

export default new TaskService();
