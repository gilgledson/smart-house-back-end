import AppError from '@shared/errors/AppError';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';

export default class CustomerRepository extends Repository<Customer> {
  public async findByEmail(email: string): Promise<Customer> {
    const customer = await this.findOne({ email: email });
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
  public async findByName(name: string): Promise<Customer> {
    const customer = await this.findOne({ name: name });
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
  public async findById(id: string): Promise<Customer> {
    const customer = await this.findOne({ id: id });
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
}
