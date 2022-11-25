import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>
}
