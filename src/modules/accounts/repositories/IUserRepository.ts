import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>
}
