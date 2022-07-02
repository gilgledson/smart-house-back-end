import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import Role from '@modules/auth/role/typeorm/entities/Role';
define(Role, () => {
  const role = new Role();
  const rolesName = faker.unique.name;
  role.title = rolesName;
  role.label = rolesName;
  return role;
});
