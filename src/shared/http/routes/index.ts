import { Response, Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routers';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionRouters from '@modules/users/routes/session.routers';
import profileRouters from '@modules/users/routes/profile.routes';
import customerRoute from '@modules/customers/routes/customer.routes';
import companyRoutes from '@modules/company/routes/company.routes';
import roleRouter from '@modules/auth/role/routes/role.routes';
import permissionRouter from '@modules/auth/permissions/routes/permission.route';
import menuRouter from '@modules/auth/menus/routes/menu.routes';

const routes = Router();
routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/profile', profileRouters);
routes.use('/sessions', sessionRouters);
routes.use('/customers', customerRoute);
routes.use('/company', companyRoutes);
routes.use('/role', roleRouter);
routes.use('/permission', permissionRouter);
routes.use('/menu', menuRouter);


export default routes;
