import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRespository: ISpecificationsRepository
  ) {}
  async execute({ specifications_id, car_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRespository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists");
    }

    const specifications = await this.specificationsRespository.findByIds(
      specifications_id
    );
    carExists.speifications = specifications;

    await this.carsRespository.create(carExists);
    console.log(carExists);
    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
