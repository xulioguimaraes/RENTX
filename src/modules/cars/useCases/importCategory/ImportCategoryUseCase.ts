import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}
  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }
  async exeute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;

      const existsCategory = await this.categoriesRepository.findByName(name);
      if (!existsCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });

    console.log(categories);
  }
}
export { ImportCategoryUseCase };
