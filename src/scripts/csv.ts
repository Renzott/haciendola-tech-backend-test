/*import csvtojson from "csvtojson";
import { Product } from "../domain/product/Product";
import database from "../libs/sequelize";
import { SequelizeUser } from "../infrastructure/sqlite/model/User";
import { SequelizeProduct } from "../infrastructure/sqlite/model/Product";

const csv = csvtojson({
    noheader: false,
    headers: ["handle", "title", "description", "sku", "grams", "stock", "price", "comparePrice", "barcode"]
});

async function main(){

    await database.sync();

    let data = await csv.fromFile("resources/data.csv");

    for (let item of data){
        console.log(item.sku);
    }

    await SequelizeProduct.bulkCreate(data);

}

main();*/