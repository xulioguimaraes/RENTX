import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRespositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRespositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRespositoryInMemory.create({
      brand: "Brand",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1234",
      name: "Car 1",
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRespositoryInMemory.create({
      brand: "Brand 1",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1233",
      name: "Car 3",
    });
    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand 1" });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRespositoryInMemory.create({
      brand: "Brand 1",
      category_id: "Category",
      daily_rate: 60,
      description: "Description",
      fine_amount: 100,
      license_plate: "ABC-1235",
      name: "Car 2",
    });
    const cars = await listAvailableCarsUseCase.execute({ name: "Car 2" });
    expect(cars).toEqual([car]);
  });
});
