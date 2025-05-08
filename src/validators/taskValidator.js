import Joi from "joi";
import createError from "http-errors";

// Esquema para crear tarea
const schemaCreate = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().iso().optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").required()
});

// Esquema para actualizar estado
const schemaUpdate = Joi.object({
  status: Joi.string().valid("pending", "in-progress", "completed").required()
});

// Middleware para validar creacion
export const validateCreate = (req, res, next) => {
  const { error } = schemaCreate.validate(req.body);
  if (error) {
    next(createError(400, error.details.map(d => d.message).join(", ")));
  } else {
    next();
  }
};

// Middleware para validar actualizacion de estado
export const validateUpdate = (req, res, next) => {
  const { error } = schemaUpdate.validate(req.body);
  if (error) {
    next(createError(400, error.details.map(d => d.message).join(", ")));
  } else {
    next();
  }
};
