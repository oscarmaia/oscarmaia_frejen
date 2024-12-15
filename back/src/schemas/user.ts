import Joi from 'joi';

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  name: Joi.string().optional(),
  id_department: Joi.number().optional(),
  admin: Joi.boolean().optional(),
});