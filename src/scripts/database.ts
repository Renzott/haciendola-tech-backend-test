import { readFileSync } from "fs";
import { UserService } from "../application/UserService";
import { UserAdapter as SequelizeUserAdapter } from "../infrastructure/sqlite/UserAdapter";
import csvtojson from "csvtojson";
import database from "../libs/sequelize";
import { SequelizeProduct } from "../infrastructure/sqlite/model/Product";
import { encrypt } from "../libs/crypto";

const DB_PATH = "db/database.sqlite";
const DATA_PATH = "resources/data.csv";

const userService = new UserService(new SequelizeUserAdapter());

const csv = csvtojson({
    noheader: false,
    headers: ["handle", "title", "description", "sku", "grams", "stock", "price", "comparePrice", "barcode"]
});

export const initDatabase = async () => {
    try {
        readFileSync(DB_PATH);
        console.log("Database found, skipping creation...");
    } catch (error) {
        console.log("Database not found, creating database...");
        
        await database.sync();
        let data = await csv.fromFile(DATA_PATH);

        const encryptPassword = encrypt("strongpassword")

        userService.create({
            email: "root@mail.com",
            username: "ADMIN",
            password: encryptPassword
        })

        SequelizeProduct.bulkCreate(data);
    }
}
