import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import User from '@modules/users/typeorm/entities/User';
define(User, () => {
  const user = new User();
  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.password = '1234561';
  return user;
});
