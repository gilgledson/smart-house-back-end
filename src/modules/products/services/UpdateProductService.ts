import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    quantity,
    price,
  }: IRequest): Promise<Product> {
    const productRepository = await getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError(`Product not found`);
    }
    const productExists = await productRepository.findByName(product.name);
    if (productExists && productExists.id != id) {
      throw new AppError(`Product ${name} already exists`, 422);
    }
    product.quantity = quantity;
    product.price = price;
    product.name = name;
    await productRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
