import { AppError } from "@shared/errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;

let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      description: "Description test",
      name: "Category teste",
    };
    await createCategoryUseCase.execute(category);

    const categoryCreate = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreate).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        description: "Description test",
        name: "Category teste",
      };
      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
