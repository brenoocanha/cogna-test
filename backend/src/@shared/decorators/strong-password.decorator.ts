import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return (
            typeof value === 'string' &&
            value.length >= 6 &&
            value.length <= 255 &&
            /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value)
          );
        },
        defaultMessage() {
          return 'A senha deve ter entre 6 e 255 caracteres, conter pelo menos uma letra maiúscula, um número e um caractere especial';
        },
      },
    });
  };
}
