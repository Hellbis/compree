import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validators/unique-email.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: "Name can't be empty" })
  name: string;

  @IsEmail(undefined, { message: 'Email is invalid' })
  @UniqueEmail({ message: 'Email already registered' })
  email: string;

  @MinLength(6, { message: 'Password must be longer than 6 caracters' })
  password: string;
}
