import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UserTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async finByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find((ut) => ut.refresh_token === refresh_token);
  }
  async deleteById(id: string): Promise<void> {
    this.usersTokens.splice(
      this.usersTokens.indexOf(this.usersTokens.find((ut) => ut.id === id))
    );
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token && refresh_token
    );
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);
    return userToken;
  }
}

export { UserTokensRepositoryInMemory };
