import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Definimos el modelo de la tabla tasks
const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    allowNull: false,
    defaultValue: "pending"
  }
}, {
  tableName: "tasks",
  // createdAt \ updatedAt
  timestamps: true 
});

export default Task;
