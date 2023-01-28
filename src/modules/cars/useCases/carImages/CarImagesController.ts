import { Request, Response } from "express";
import { container } from "tsyringe";
import { CarImagesUseCase } from "./CarImagesUseCase";

class CarImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const carImages = container.resolve(CarImagesUseCase);

    const car = await carImages.execute(id);

    return response.json(car);
  }
}

export { CarImagesController };
