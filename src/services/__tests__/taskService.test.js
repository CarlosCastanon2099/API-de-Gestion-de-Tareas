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
  