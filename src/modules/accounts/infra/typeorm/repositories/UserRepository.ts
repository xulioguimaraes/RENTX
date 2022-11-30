import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/User";


class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    drive_license,
    name,
    password,
    email,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      drive_license,
      name,
      password,
      email,
      avatar,
      id,
    });
    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
export { UserRepository };
