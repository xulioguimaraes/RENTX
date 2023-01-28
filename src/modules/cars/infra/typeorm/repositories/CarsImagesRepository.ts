import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import AppDataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }
  async listImageCars(id: string): Promise<CarImage[]> {
    return this.repository.find({ where: { car_id: id } });
  }
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });
    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
