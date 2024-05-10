import { DataTypes, Model } from "sequelize";
import { Product } from "../../../domain/product/Product";
import database from "../../../libs/sequelize";

export class SequelizeProduct extends Model<Product> {
    declare sku: string;
    declare handle: string;
    declare title: string;
    declare description: string;
    declare grams: number;
    declare stock: number;
    declare price: number;
    declare comparePrice: number;
    declare barcode: string;
}

SequelizeProduct.init({
    sku: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    handle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    grams: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comparePrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database,
    modelName: "Product",
    tableName: "products",
});