export interface ICreateUserDTO {
  name: string;
  password: string;
  drive_license: string;
  email: string;
  id?: string;
  avatar?: string;
}