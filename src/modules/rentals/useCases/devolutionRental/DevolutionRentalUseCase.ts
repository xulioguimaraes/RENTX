import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rentals = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rentals.car_id);
    const minimun_daily = 1;
    if (!rentals) {
      throw new AppError("Rentals does not exists");
    }
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compare(rentals.start_date, dateNow);

    if (daily <= 0) {
      daily = minimun_daily;
    }

    const delay = this.dateProvider.compare(
      dateNow,
      rentals.expected_return_date
    );
    let total = 0;

    if (delay > 0) {
      total = daily * car.fine_amount;
    }

    total += daily * car.daily_rate;

    rentals.end_date = dateNow;
    rentals.total = total;

    await this.rentalsRepository.create(rentals);
    await this.carsRepository.updateAvailable(car.id, true);

    return rentals;
  }
}

export { DevolutionRentalUseCase };
