import { instanceToInstance } from "class-transformer";
import { CarImage } from "../infra/typeorm/entities/CarImage";

class CarImagesMap {
  static toDO(images: CarImage[]) {
    const newImages = images.map((image) => {
      switch (process.env.DISK) {
        case "local":
          return {
            car_image_url: `${process.env.APP_API_URL}/avatar/${image.image_name}`,
          };
        case "s3":
          return {
            car_image_url: `${process.env.AWS_BUCKET_URL}/avatar/${image.image_name}`,
          };

        default:
          return null;
      }
    });
    return newImages
  }
}
export { CarImagesMap };
