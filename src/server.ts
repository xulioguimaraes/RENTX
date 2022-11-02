import express from "express";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "./database";
import { createConnection } from "./database";

createConnection("database")

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.json());

app.use(router);

app.listen(3333, () => console.log("server is running"));
