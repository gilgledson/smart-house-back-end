import CustomerRepository from '../../customers/typeorm/repositories/CustomerRepository';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import AppError from '@shared/errors/AppError';

export default class DeleteCompanyService {
    public async execute(id: string): Promise<[]> {
        const companyRepository = getCustomRepository(CompanyRepository);
        const company = await companyRepository.findCompanyById(id);
        if (!company) {
         throw new AppError(`company not found`);
        }
        companyRepository.softDelete(company.id);
        return [];
    }
}