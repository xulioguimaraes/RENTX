import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
// import "@shared/typeorm";
import "@shared/container";

import { createConnection } from "../typeorm";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection("database");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
