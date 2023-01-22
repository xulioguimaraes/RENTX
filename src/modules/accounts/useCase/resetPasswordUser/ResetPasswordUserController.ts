import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPassworduserUseCase } from "./ResetPassworduserUseCase";
class ResetPasswordUserController {
  async handle(request: Request, response: Response) {
    const { token: refresh_token } = request.query;

    const { password } = request.body;
    
    const resetPasswordUserUseCase = container.resolve(
      ResetPassworduserUseCase
    );
    await resetPasswordUserUseCase.execute({
      password,
      refresh_token: String(refresh_token),
    });
    return response.send();
  }
}

export { ResetPasswordUserController };
