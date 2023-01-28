import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository
  ) {}
  async execute() {
    return await this.carsRespository.findAllCars();
  }
}
export { ListAllCarsUseCase };
