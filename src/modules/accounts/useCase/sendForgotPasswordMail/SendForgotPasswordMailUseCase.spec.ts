import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
describe("Send forgot mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await userRepositoryInMemory.create({
      drive_license: "28398237",
      email: "test@isis.com",
      name: "Dr true",
      password: "2222",
    });

    await sendForgotPasswordMailUseCase.execute("test@isis.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be alble to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("jses@gail.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users toke",async ()=>{
   const generateTokenMail =  jest.spyOn(userRepositoryInMemory,"create") 
   await userRepositoryInMemory.create({
    drive_license: "2343211",
    email: "test@gamil.com",
    name: "Jr true",
    password: "2222",
  });

  await sendForgotPasswordMailUseCase.execute("test@gamil.com")
  expect(generateTokenMail).toBeCalled()
  })
});
