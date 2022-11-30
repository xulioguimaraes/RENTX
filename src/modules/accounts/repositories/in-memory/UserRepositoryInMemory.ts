import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async create({
    drive_license,
    password,
    name,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { drive_license, password, name, email });

    this.users.push(user);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
