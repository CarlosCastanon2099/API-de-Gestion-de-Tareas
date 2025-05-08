// Mocks del repositorio 
jest.mock("../../repositories/taskRepository.js", () => ({
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn()
  }));
  
  import taskService from "../taskService.js";
  import taskRepo from "../../repositories/taskRepository.js";
  import createError from "http-errors";

  // ---------------------------------------------------
  // Tests de TaskService
  // ---------------------------------------------------

  // Test addTask
  describe("TaskService.addTask", () => {
    beforeEach(() => jest.clearAllMocks());
  
    test("crea y devuelve la tarea cuando dto es valido", async () => {
      const dto = { title: "Tarea 1", status: "pending" };
      const fakeTask = { id: "uuid", ...dto };
      taskRepo.create.mockResolvedValue(fakeTask);
  
      const result = await taskService.addTask(dto);
      expect(taskRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(fakeTask);
    });
  
    test("sin titulo lanza BadRequest", async () => {
      await expect(taskService.addTask({ status: "pending" }))
        .rejects.toMatchObject({ status: 400 });
    });
  });


  // Test getTask
  describe("TaskService.getTask", () => {
    beforeEach(() => jest.clearAllMocks());
  
    test("devuelve la tarea si existe", async () => {
      const fakeTask = { id: "uuid", title: "X", status: "pending" };
      taskRepo.findById.mockResolvedValue(fakeTask);
  
      const result = await taskService.getTask("uuid");
      expect(result).toBe(fakeTask);
    });
  
    test("si no existe lanza NotFound", async () => {
      taskRepo.findById.mockResolvedValue(null);
      await expect(taskService.getTask("nope"))
        .rejects.toMatchObject({ status: 404 });
    });
  });

  // Test removeTask
  describe("TaskService.removeTask", () => {
    beforeEach(() => jest.clearAllMocks());
  
    test("no arroja error si delete retorna >0", async () => {
      taskRepo.delete.mockResolvedValue(1);
      await expect(taskService.removeTask("uuid")).resolves.toBeUndefined();
      expect(taskRepo.delete).toHaveBeenCalledWith("uuid");
    });
  
    test("lanza NotFound si delete retorna 0", async () => {
      taskRepo.delete.mockResolvedValue(0);
      await expect(taskService.removeTask("nope"))
        .rejects.toMatchObject({ status: 404 });
    });
  });

  // Test listTasks
  describe("TaskService.listTasks", () => {
    beforeEach(() => jest.clearAllMocks());
  
    test("devuelve un array de tareas", async () => {
      const fakeTasks = [
        { id: "1", title: "T1", status: "pending" },
        { id: "2", title: "T2", status: "completed" }
      ];
      taskRepo.findAll.mockResolvedValue(fakeTasks);
  
      const result = await taskService.listTasks();
      expect(taskRepo.findAll).toHaveBeenCalled();
      expect(result).toEqual(fakeTasks);
    });
  
    test("devuelve array vacio si no hay tareas", async () => {
      taskRepo.findAll.mockResolvedValue([]);
  
      const result = await taskService.listTasks();
      expect(taskRepo.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  // Test changeStatus
  describe("TaskService.changeStatus", () => {
    beforeEach(() => jest.clearAllMocks());
  
    test("actualiza y devuelve la tarea si status es valido", async () => {
      const id = "uuid";
      const statusDto = { status: "completed" };
      const existingTask = { id, title: "T1", status: "pending" };
      const updatedTask = { id, title: "T1", status: "completed" };
  
      taskRepo.findById.mockResolvedValueOnce(existingTask);
      taskRepo.update.mockResolvedValue(1);
      taskRepo.findById.mockResolvedValueOnce(updatedTask);
  
      const result = await taskService.changeStatus(id, statusDto);
      expect(taskRepo.findById).toHaveBeenCalledWith(id);
      expect(taskRepo.update).toHaveBeenCalledWith(id, { status: statusDto.status });
      expect(result).toEqual(updatedTask);
    });
  
    test("lanza BadRequest si status es invalido", async () => {
      await expect(taskService.changeStatus("uuid", { status: "invalid" }))
        .rejects.toMatchObject({ status: 400 });
    });
  
    test("lanza NotFound si la tarea no existe", async () => {
      taskRepo.findById.mockResolvedValue(null);
      await expect(taskService.changeStatus("nope", { status: "pending" }))
        .rejects.toMatchObject({ status: 404 });
    });
  });
  
  // ---------------------------------------------------
  // ---------------------------------------------------
  // ---------------------------------------------------