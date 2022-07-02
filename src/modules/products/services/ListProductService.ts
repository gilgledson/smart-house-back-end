import Product from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = await getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;
