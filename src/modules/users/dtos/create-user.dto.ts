import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { UniqueEmail } from '../validators/unique-email.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: "Name can't be empty" })
  name: string;

  @IsEmail(undefined, { message: 'Email is invalid' })
  @UniqueEmail({ message: 'Email already registered' })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 6 and 30 characters long',
  })
  password: string;
}
