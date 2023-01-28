import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { CarImagesMap } from "@modules/cars/mapper/CarImagesMap";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute(id: string) {
    const images = await this.carsImagesRepository.listImageCars(id);
    return CarImagesMap.toDO(images);
  }
}

export { CarImagesUseCase };
