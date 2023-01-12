import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificatiosRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificatiosRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRespositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificatiosRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificatiosRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRespositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["1", "2", "3"];
    await expect(
     
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRespositoryInMemory.create({
      brand: "Brand",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1234",
      name: "Car 1",
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: " test",
      name: "Test",
    });
    const car_id = car.id;
    const specifications_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });
    expect(specificationCars).toHaveProperty("speifications");
    expect(specificationCars.speifications.length).toBe(1);
  });
});
