import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const listRentalsByUserUsecase = container.resolve(
      ListRentalsByUserUseCase
    );
    const rentals = await listRentalsByUserUsecase.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
