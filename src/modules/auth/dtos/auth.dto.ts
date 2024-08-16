import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail(undefined, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: "Passowrd can't be empty" })
  password: string;
}
