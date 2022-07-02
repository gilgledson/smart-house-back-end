import Company from '../typeorm/entities/Company';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

class ShowCompanyService {
  public async execute(id: string): Promise<Company> {
    const companyRepository = await getCustomRepository(CompanyRepository);
    const company = await companyRepository.findCompanyById(id);
    if (!company) {
      throw new AppError(`Company not found`);
    }
    return company;
  }
}
export default ShowCompanyService;
