import { DataTypes, Model } from "sequelize";
import { User } from "../../../domain/user/User";
import database from "../../../libs/sequelize";

export class SequelizeUser extends Model<User, Omit<User, "id">> {
    declare id: string;
    declare username: string;
    declare email: string;
    declare password: string;
}

SequelizeUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database,
    modelName: "User",
    tableName: "users",
});