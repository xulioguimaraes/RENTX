import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByLicensePlace(license_plate: string): Promise<Car>;
  create(data: ICreateCarsDTO): Promise<Car>;
}
export { ICarsRepository };
