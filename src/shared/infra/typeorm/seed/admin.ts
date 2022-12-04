import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { hash } from "bcrypt";
import { v4 } from "uuid";
import { createConnection } from "..";

async function create() {
  const id = v4();
  const password = await hash("admin", 8);

  const connection = await createConnection("localhost");
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
  await connection.destroy();
}

create().then(() => console.log("User admin create"));
