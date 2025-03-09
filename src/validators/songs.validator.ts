import Joi from 'joi';

export const addFavoriteSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  artist: Joi.string().min(2).max(100).required(),
  genre: Joi.string().valid('Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Classical').required(),
});

export const searchSchema = Joi.object({
  query: Joi.string().min(2).required(),
});

export const songsQuerySchema = Joi.object({
  query: Joi.string().optional(),
  sortBy: Joi.string().valid('title', 'artist', 'album').optional(),
  order: Joi.string().valid('asc', 'desc').default('asc'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  onlyFavorites: Joi.boolean().optional(),
});
