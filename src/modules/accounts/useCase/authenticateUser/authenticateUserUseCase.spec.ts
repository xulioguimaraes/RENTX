import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCase/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      drive_license: "000",
      email: "user@gmail.com",
      password: "1234",
      name: "User test",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: "user@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        drive_license: "000",
        email: "user@gmail.com",
        password: "1234",
        name: "User test",
      };
      await createUserUseCase.execute(user);

      const result = await authenticateUseCase.execute({
        email: user.email,
        password:"incorrect password" ,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
