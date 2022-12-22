import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { createConnection } from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import { DataSource } from "typeorm";
import { v4 } from "uuid";
import request from "supertest";
import { app } from "@shared/infra/http/app";
let connection: DataSource;
describe("List Categories", () => {
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
  it("should be able to list all categories cars", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "julio@gmail.com",
      password: "admin",
    });
    const { token } = responseToken.body;
    const res = await request(app)
      .post("/categories")
      .send({
        description: "Description supertest",
        name: "Category superteste",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    console.log(res.status);

    const { body, status } = await request(app).get("/categories");
    console.log(body);

    expect(status).toBe(200);
    // expect(body.length).toBe(1);
  });
});
