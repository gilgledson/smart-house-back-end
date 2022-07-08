import CreateUserService from '../services/CreateUserService';
import { faker } from '@faker-js/faker';
import { createConnection } from 'typeorm';
import connection from '../../../shared/typeorm/connection';
import ListUserServices from '../services/ListUserServices';
import User from '../typeorm/entities/User';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import LoginAuthService from '../services/LoginService';

describe('Usuario do Sistema', () => {
  let createUser: CreateUserService;
  let listUser: ListUserServices;
  let updateUser: UpdateUserService;
  let deleteUser: DeleteUserService;
  let loginUser: LoginAuthService;
  let correntPassword: string;
  let currentUser: User;
  beforeAll(async () => {
    correntPassword = faker.internet.password();
    await connection.create();
    await connection.clear();
  });

  afterAll(async () => {
    await connection.clear();
  });

  beforeEach(async () => {
    createUser = new CreateUserService();
    listUser = new ListUserServices();
    updateUser = new UpdateUserService();
    deleteUser = new DeleteUserService();
    loginUser = new LoginAuthService();
  });

  test('Criando usuario', async () => {
    currentUser = await createUser.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: correntPassword,
    });
    expect(currentUser).toHaveProperty('id');
  });
  it('Login usuario', async () => {
    const user = await loginUser.execute({
      email: currentUser.email,
      password: correntPassword,
    });
    expect(user).toHaveProperty('token');
  });
  it('Listar usuario', async () => {
    const user = await listUser.execute();
    expect(user.length).toBe(1);
  });
  it('Editar usuario', async () => {
    const name = faker.name.firstName();
    const user = await updateUser.execute({
      id: currentUser.id,
      name: name,
      email: currentUser.email,
    });
    expect(user.name).toBe(name);
  });
  it('Deletar usuario', async () => {
    const user = await deleteUser.execute({
      id: currentUser.id,
    });
    expect(user.length).toBe(0);
  });
});
