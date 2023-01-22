import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";
@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailprovider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );
    if (!user) {
      throw new AppError("User does not exists");
    }
    const token = uuidV4();
    const expires_date = this.dayjsDateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
    const variables = {
      name: user.name,
      link: `http://localhost:3333/password/reset?token=${token}`,
    };
    console.log(process.env)
    
    await this.mailprovider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}
export { SendForgotPasswordMailUseCase };
