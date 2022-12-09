import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findByLicensePlace(license_plate: string): Promise<Car>;
  create(data: ICreateCarsDTO): Promise<Car>;
}
export { ICarsRepository };
