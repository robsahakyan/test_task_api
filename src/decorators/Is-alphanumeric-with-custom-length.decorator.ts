import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isAlphanumericWithCustomLength', async: false })
export class IsAlphanumericWithCustomLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const hasLetters = /[a-zA-Z]/.test(text);
    const hasNumbers = /[0-9]/.test(text);
    return hasLetters && hasNumbers;
  }

  defaultMessage(args: ValidationArguments) {
    return 'SKU must contain at least one letter and one number';
  }
}
