export class AccountRequestDto {
  username: string;
  password: string;
  name: string;
  photo?: string;
  cpf: string;
  email: string;
  role: Roles;
}
