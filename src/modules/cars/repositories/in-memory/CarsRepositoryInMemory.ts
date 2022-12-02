import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);
    return car
  }
  async findByLicensePlace(license_plate: string): Promise<Car> {
    return this.cars.find((item) => item.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
