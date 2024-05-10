import { Product } from "./Product";

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findAllByTitle(title: string): Promise<Product[] | null>;
}