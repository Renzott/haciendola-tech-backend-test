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
            let data = await this.sequelizeProduct.update(product, { where: { sku: product.sku }});
            
            if (data[0] === 0) {
              return Promise.reject(new Error("No se pudo actualizar el producto"));
            }
            
            return Promise.resolve(product);
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
            let page = 1;
            // get first 10 products to paginate
            let limit = 10;

            return this.sequelizeProduct.findAll({ offset: (page - 1) * limit, limit: limit });
        }

        findAllByTitle(title: string): Promise<Product[] | null> {
            return this.sequelizeProduct.findAll({ where: { title:{ [Op.like]: `${title}%` } } });
        }
        
}