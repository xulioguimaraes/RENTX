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
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
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
    id,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      id,
    });
    await this.repository.save(car);
    return car;
  }
  async findById(car_id: string): Promise<Car> {
    return await this.repository.findOne({ where: { id: car_id } });
  }
}

export { CarsRepository };
