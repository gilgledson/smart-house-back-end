import { Router } from 'express';
import usersRoutes from '@modules/users/routes/users.routes';
import loginRouters from '@modules/users/routes/login.routers';
import profileRouters from '@modules/users/routes/profile.routes';


const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/profile', profileRouters);
routes.use('/auth/login', loginRouters);



export default routes;
