import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export class VedValidators extends Validators {

    static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value !== null) {
                if (control.value.trim().length >= minLength) {
                    return null;
                }
                else {
                    return { minlength: { value: control.value } };
                }
            }
            else {
                return null;
            }
        };
    }
}
