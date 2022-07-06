import { Router } from 'express';
import usersRoutes from '@modules/users/routes/users.routes';
import authRouters from '@modules/users/routes/auth.routers';
import profileRouters from '@modules/users/routes/profile.routes';
import equipmentRouters from '@modules/equipment/routes/equipment.routers';
import scheduleRouters from '@modules/schedule/routes/schedule.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/profile', profileRouters);
routes.use('/equipment', equipmentRouters);
routes.use('/schedule', scheduleRouters);
routes.use('/auth', authRouters);

export default routes;
