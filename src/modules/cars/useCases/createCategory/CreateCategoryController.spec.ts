import { app } from "@shared/infra/http/app";
import request from "supertest";
import { createConnection } from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import { v4 } from "uuid";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { DataSource } from "typeorm";
let connection: DataSource;
// createConnection("localhost");
describe("Create category controller", () => {
  beforeAll(async () => {
    const id = v4();
    connection = await createConnection("localhost");

    const password = await hash("admin", 8);

    await connection.runMigrations();
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id,
          password,
          name: "Julio",
          email: "julio@gmail.com",
          isAdmin: true,
          create_at: new Date(),
          drive_license: "1234",
          avatar: "",
        },
      ])
      .execute();
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "julio@gmail.com",
      password: "admin",
    });
    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        description: "Description supertest",
        name: "Category superteste",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });

  it(" Should not be able to create a new category with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "julio@gmail.com",
      password: "admin",
    });
    const { refresh_token } = responseToken.body;
    await request(app)
      .post("/categories")
      .send({
        description: "Description supertest",
        name: "Category superteste",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    const response = await request(app)
      .post("/categories")
      .send({
        description: "Description supertest",
        name: "Category superteste",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(400);
  });

 
});
