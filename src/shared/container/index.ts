import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/repositories/Implementations/UserRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/Implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/Implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);