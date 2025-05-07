import Task from "../models/task.js";

class TaskRepository {
  /**
   * Clase que crea una nueva tarea
   * @param {Object} data
   * @returns {Promise<Task>}
   */
  async create(data) {
    const task = await Task.create(data);
    return task;
  }

  /**
   * Metodo que obtiene todas las tareas
   * @returns {Promise<Task[]>}
   */
  async findAll() {
    const tasks = await Task.findAll();
    return tasks;
  }

  /**
   * Metodo que obtiene una tarea por ID
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  async findById(id) {
    const task = await Task.findByPk(id);
    return task;
  }

  /**
   * Metodo que actualiza una tarea
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<[number]>} 
   */
  async update(id, data) {
    const [updatedCount] = await Task.update(data, {
      where: { id }
    });
    return updatedCount;
  }

  /**
   * Metodo que elimina una tarea
   * @param {string} id
   * @returns {Promise<number>} 
   */
  async delete(id) {
    const deletedCount = await Task.destroy({
      where: { id }
    });
    return deletedCount;
  }
}

export default new TaskRepository();
