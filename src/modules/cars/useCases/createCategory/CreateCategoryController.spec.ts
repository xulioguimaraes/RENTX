import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create category controller", () => {
  it("should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      description: "Description supertest",
      name: "Category superteste",
    });
    expect(response.status).toBe(201);
  });
});
