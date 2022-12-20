import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Rental } from "../entites/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id } });
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id } });
  }
}

export { RentalsRepository };
