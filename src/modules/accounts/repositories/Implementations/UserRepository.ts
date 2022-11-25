import { Repository } from "typeorm";
import AppDataSource from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

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
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      drive_license,
      name,
      password,
      email,
    });
    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
export { UserRepository };
