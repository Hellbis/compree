import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  // constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any): Promise<boolean> {
    // const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(
    //   value,
    // );
    // return !usuarioComEmailExiste;

    return false;
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
