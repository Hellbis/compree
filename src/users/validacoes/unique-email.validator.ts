import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: any): Promise<boolean> {
    const emailExist = await this.usersService.findByEmail(value);
    return !emailExist;
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (obj: object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
