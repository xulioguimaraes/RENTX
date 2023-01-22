import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }
  async finByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ where: { refresh_token } });
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    await this.repository.save(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ where: { user_id, refresh_token } });
  }
}
export { UserTokensRepository };
