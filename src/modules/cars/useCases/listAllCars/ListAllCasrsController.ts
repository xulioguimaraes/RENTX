import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCarsUseCase } from "./ListAllCarsUseCase";

class ListAllCarsController {
  async handle(request: Request, response: Response) {
    const listAllCarsUseCase = container.resolve(ListAllCarsUseCase);
    const cars = await listAllCarsUseCase.execute();
    return response.json(cars);
  }
}
export { ListAllCarsController };
