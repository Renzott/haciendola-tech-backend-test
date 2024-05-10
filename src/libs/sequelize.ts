import { Sequelize } from "sequelize";

const database = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite",
    logging: false,
});



export default database;