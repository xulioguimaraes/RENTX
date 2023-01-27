import { classToClassFromExist, instanceToInstance } from "class-transformer";
import { IUSerResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    drive_license,
    avatar_url,
  }: User): IUSerResponseDTO {
    const user = instanceToInstance({
      avatar,
      drive_license,
      email,
      id,
      name,
      avatar_url
    });
    return user
  }
}
export { UserMap };
