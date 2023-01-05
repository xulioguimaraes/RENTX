import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import AppDataSource from "@shared/infra/typeorm";
import { IsNull, Repository } from "typeorm";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

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
    return await this.repository.findOne({ where: { user_id, end_date: IsNull() } });
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id, end_date: IsNull() } });
  }
  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { id } });
  }
}

export { RentalsRepository };
