import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

export default class ShowCustomerService {
  public async execute(id: string): Promise<Customer> {
    const customerRepository = await getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
}
