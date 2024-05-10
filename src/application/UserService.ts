import { User } from "../domain/user/User";
import { UserRepository } from "../domain/user/UserRepository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async update(user: User): Promise<User> {
        return this.userRepository.update(user);
    }
}