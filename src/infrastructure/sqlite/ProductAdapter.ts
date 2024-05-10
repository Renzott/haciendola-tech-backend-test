import { Op } from "sequelize";
import { Product } from "../../domain/product/Product";
import { ProductRepository } from "../../domain/product/ProductRepository";
import { SequelizeProduct } from "./model/Product";

export class ProductAdapter implements ProductRepository {
    
        private readonly sequelizeProduct;
    
        constructor() {
            this.sequelizeProduct = SequelizeProduct;
        }
    
        create(product: Product): Promise<Product> {
            let newProduct = this.sequelizeProduct.create(product);
            return newProduct;
        }

        async update(product: Product): Promise<Product> {
            await this.sequelizeProduct.update(product, { where: { sku: product.sku } });
            return product;
        }

        async delete(id: string): Promise<boolean> {
            let product = await this.sequelizeProduct.findOne({ where: { sku: id } });
            if (product) {
                await product.destroy();
                return true;
            }
            return false;
        }

        async findById(id: string): Promise<Product | null> {
            throw new Error("Method not implemented.");
        }

        findAll(): Promise<Product[]> {
            return this.sequelizeProduct.findAll();
        }

        findAllByTitle(title: string): Promise<Product[] | null> {
            return this.sequelizeProduct.findAll({ where: { title:{ [Op.like]: `${title}%` } } });
        }
        
}