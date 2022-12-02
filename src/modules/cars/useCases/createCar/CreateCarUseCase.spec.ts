import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1235",
      name: "Name Car",
    });

    expect(car).toHaveProperty("id")
  });

  it("Should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Brand",
        category_id: "Category",
        daily_rate: 60,
        description: "Description",
        fine_amount: 100,
        license_plate: "ABC-1234",
        name: "Car 1",
      });
      await createCarUseCase.execute({
        brand: "Brand",
        category_id: "Category",
        daily_rate: 60,
        description: "Description",
        fine_amount: 100,
        license_plate: "ABC-1234",
        name: "Car 1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1235",
      name: "Name Car",
    });
    expect(car.available).toBe(true);
  });
});
