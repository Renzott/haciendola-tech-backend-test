import { ValidationErrorItem } from "sequelize";
import { User } from "../../domain/user/User";
import { UserRepository } from "../../domain/user/UserRepository";
import { SequelizeUser } from "./model/User";

export class UserAdapter implements UserRepository {

    private readonly sequelizeUser;

    constructor() {
        this.sequelizeUser = SequelizeUser;
    }

    async create(user: User): Promise<User> {
        let newUser = await this.sequelizeUser.create(user);
        return newUser;
    }
    
    findByEmail(email: string): Promise<User | null> {
        return this.sequelizeUser.findOne({ where: { email: email } })
    }

    async update(user: User): Promise<User> {
        await this.sequelizeUser.update(user, { where: { email: user.email } });
        return user;
    }
}