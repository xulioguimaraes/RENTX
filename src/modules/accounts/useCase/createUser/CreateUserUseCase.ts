import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({
    drive_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const alreadyUserExists = await this.usersRepository.findByEmail(email)
    if (alreadyUserExists) {
      throw new AppError("User already exists");
      
    }
    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      drive_license,
      email,
      name,
      password: passwordHash,
    });
  }
}
export { CreateUserUseCase };
