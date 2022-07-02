import Company from "../typeorm/entities/Company";
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import AppError from "@shared/errors/AppError";

export default class RestoreCompanyService {
    public async execute(id: string): Promise<Company> {
        const companyRepository = await getCustomRepository(CompanyRepository);
        const company = await companyRepository.findOneWithTrashed(id, true);
        if(!company){
            throw new AppError(`company not found`);
        }
        await companyRepository.restore(company.id);
        return company;
    }
}


