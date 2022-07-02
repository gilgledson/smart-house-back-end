import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = await getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({ id: id });
    if (!product) {
      throw new AppError(`Product not found`);
    }
    return product;
  }
}

export default ShowProductService;
