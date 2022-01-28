import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string, oldPasswor: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    const old = formGroup.controls[oldPasswor];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }

    if (old.value === '') {
      if (control.value === '' && matchingControl.value === '') {
        old.setErrors(null);
      } else {
        old.setErrors({ required: true });
      }
    }
  };
}
