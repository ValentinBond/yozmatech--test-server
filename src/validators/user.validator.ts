import Joi from 'joi';

export const UserSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserSignUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 30 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(6).max(50).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must be at most 50 characters',
  }),
});
