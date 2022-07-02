import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
interface IRequest {
  id: string;
  name: string;
  email: string;
}
export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = await getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    customer.name = name;
    customer.email = email;
    await customerRepository.save(customer);
    return customer;
  }
}
