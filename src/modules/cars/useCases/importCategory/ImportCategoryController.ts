import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    const importCategoryUseCase =  container.resolve(
      ImportCategoryUseCase
    );
    await importCategoryUseCase.exeute(file);
    return response.send();
  }
}
export { ImportCategoryController };
