import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  drive_license: string;

  @Column()
  avatar: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.isAdmin = false
      this.avatar = ""
    }
  }
}

export { User };
