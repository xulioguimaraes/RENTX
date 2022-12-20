import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entites/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
}

export { IRentalsRepository };
