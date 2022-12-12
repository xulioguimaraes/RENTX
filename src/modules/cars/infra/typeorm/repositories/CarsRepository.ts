import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }
  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });
    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("cars.name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }
    return await carsQuery.getMany();
  }
  async findByLicensePlace(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_plate } });
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
    await this.repository.save(car);
    return car;
  }
}

export { CarsRepository };