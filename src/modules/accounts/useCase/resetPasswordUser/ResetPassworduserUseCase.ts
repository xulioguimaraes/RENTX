import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
interface IResquest {
  refresh_token: string;
  password: string;
}

@injectable()
class ResetPassworduserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ password, refresh_token }: IResquest) {
    const userToken = await this.userTokensRepository.finByRefreshToken(
      refresh_token
    );

    if (!userToken) {
      throw new AppError("Token invalid!");
    }
    if (
      this.dayjsDateProvider.compareIfBefore(
        userToken.expires_date,
        this.dayjsDateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }
    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPassworduserUseCase };
