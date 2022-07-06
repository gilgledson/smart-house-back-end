import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
const scheduleRouters = Router();
const scheduleController = new ScheduleController();

scheduleRouters.use(isAuthenticated);

scheduleRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      equipment_id: Joi.string().required(),
      date_schedule: Joi.date().required(),
      action: Joi.string().required().valid('ON', 'OFF'),
    },
  }),
  scheduleController.create,
);
export default scheduleRouters;
