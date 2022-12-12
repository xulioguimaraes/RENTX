import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);
    return car;
  }
  async findByLicensePlace(license_plate: string): Promise<Car> {
    return this.cars.find((item) => item.license_plate === license_plate);
  }
  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const car = this.cars.filter((item) => {
      if (
        item.available === true ||
        (brand && item.brand === brand) ||
        (category_id && item.category_id === category_id) ||
        (name && item.name === name)
      ) {
        return item;
      }
    });
    return car;
  }
  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }
}

export { CarsRepositoryInMemory };
