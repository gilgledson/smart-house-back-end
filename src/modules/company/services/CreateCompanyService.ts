import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Company from "../typeorm/entities/Company";
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

interface IRequest {
    name: string;
    document_number: string;
    status: number;
    domain: string;
    city: string;
    state: string;
    street: string;
}
export default class CreateCompanyService {
    public async execute({name, document_number, state,street, domain, city,status}: IRequest): Promise<Company> {
        const companyRepository = await getCustomRepository(CompanyRepository);
        const companyExists = await companyRepository.findCompanyByDocumentNumber(document_number);
        if(companyExists) {
            throw new AppError(`Document number ${document_number} already used`, 422);
        }
        const company = companyRepository.create({
            name,
            document_number,
            status,
            street,
            state, 
            domain, 
            city
        });
        await companyRepository.save(company);
        return company;
    }
}