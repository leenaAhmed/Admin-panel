import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const mustMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let passControl = control.get('password');
  let confirmPassControl = control.get('confirmPassword');
  if (
    !passControl ||
    !confirmPassControl ||
    !passControl.value ||
    !confirmPassControl.value
  )
    return null;

  let errorpass = {
    notMatchPassword: {
      pass: passControl?.value,
      confrim: confirmPassControl?.value,
    },
  };
  return passControl?.value == confirmPassControl?.value ? null : errorpass;
};
