import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findAllCars(): Promise<Car[]>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findByLicensePlace(license_plate: string): Promise<Car>;
  create(data: ICreateCarsDTO): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
export { ICarsRepository };
