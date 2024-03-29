import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokensResponse {
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokensResponse> {
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }
    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign(
      {
        email,
      },
      auth.secret_refresh_token,
      {
        subject: user_id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );
    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });
    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
