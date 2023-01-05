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
    const rental = await createrentalUseCase.execute({
      car_id: "1234",
      expected_return_date: dayAdd,
      user_id: "1234",
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createrentalUseCase.execute({
        car_id: "1234",
        expected_return_date: dayAdd,
        user_id: "1234",
      });

      const rental = await createrentalUseCase.execute({
        car_id: "1234",
        expected_return_date: dayAdd,
        user_id: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createrentalUseCase.execute({
        car_id: "2222",
        expected_return_date: dayAdd,
        user_id: "XXXX",
      });

      const rental = await createrentalUseCase.execute({
        car_id: "2222",
        expected_return_date: dayAdd,
        user_id: "XXXX",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createrentalUseCase.execute({
        car_id: "2222",
        expected_return_date: dayjs().toDate(),
        user_id: "XXXX",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
