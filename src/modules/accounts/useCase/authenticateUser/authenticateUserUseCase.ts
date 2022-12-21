import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

interface IResquest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IResquest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "934e82e8f9f970f8aa6f183a5cd64474", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
        token,
        user:{
            email: user.email,
            name: user.name
        }
    }

    return tokenReturn
  }
}
export { AuthenticateUserUseCase };
