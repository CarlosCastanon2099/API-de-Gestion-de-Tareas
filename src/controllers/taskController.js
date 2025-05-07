import taskService from "../services/taskService.js";

class TaskController {
  /**
   * POST /tasks
   */
  async createTask(req, res, next) {
    try {
      const dto = req.body;
      const task = await taskService.addTask(dto);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /tasks
   */
  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.listTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /tasks/:id
   */
  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const task = await taskService.getTask(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /tasks/:id
   * Sólo actualiza el campo status
   */
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const statusDto = req.body;
      const updated = await taskService.changeStatus(id, statusDto);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /tasks/:id
   */
  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      await taskService.removeTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();