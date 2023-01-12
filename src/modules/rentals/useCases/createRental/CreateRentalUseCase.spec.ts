import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createrentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
describe("create Rental", () => {
  const dayAdd = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createrentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      brand: "brand",
      category_id: "123444",
      daily_rate: 12,
      description: "Description",
      fine_amount: 5,
      license_plate: "test",
    });
    const rental = await createrentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd,
      user_id: "1234",
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "2323",
      expected_return_date: dayAdd,
      user_id: "123s34",
    });

    await expect(
      createrentalUseCase.execute({
        car_id: "12333",
        expected_return_date: dayAdd,
        user_id: "user",
      })
    ).rejects.toEqual(new AppError("there's a rental inprogress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "2222",
      expected_return_date: dayAdd,
      user_id: "XXXX",
    });
    // await createrentalUseCase.execute({
    //   car_id: "2222",
    //   expected_return_date: dayAdd,
    //   user_id: "XXXX",
    // });

    await expect(
      createrentalUseCase.execute({
        car_id: "2222",
        expected_return_date: dayAdd,
        user_id: "XXXX",
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createrentalUseCase.execute({
        car_id: "2222",
        expected_return_date: dayjs().toDate(),
        user_id: "XXXX",
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
