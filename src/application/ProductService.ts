import { Product } from "../domain/product/Product";
import { ProductRepository } from "../domain/product/ProductRepository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }
    
    async findAll(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async findAllByTitle(title: string): Promise<Product[] | null> {
        return this.productRepository.findAllByTitle(title);
    }

    async create(product: Product): Promise<Product> {
        return this.productRepository.create(product);
    }

    async update(product: Product): Promise<Product> {
        return this.productRepository.update(product);
    }

    async delete(id: string): Promise<boolean> {
        return this.productRepository.delete(id);
    }
}
