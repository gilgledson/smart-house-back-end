import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';
const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(isAuthenticated);
profileRoutes.get('/', profileController.show);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  profileController.update,
);
export default profileRoutes;
