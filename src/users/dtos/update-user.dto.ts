import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validacoes/unique-email.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: "Name can't be empty" })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Email is invalid' })
  @UniqueEmail({ message: 'Email already registered' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must be longer than 6 caracters' })
  @IsOptional()
  password: string;
}
