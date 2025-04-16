import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appNoSpecialChars]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoSpecialCharsDirective,
      multi: true,
    },
  ],
})
export class NoSpecialCharsDirective implements Validator {
  @Input('appNoSpecialChars') forbiddenChars: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || !this.forbiddenChars || this.forbiddenChars.length === 0) {
      return null;
    }

    const hasForbidden = this.forbiddenChars.some(char => value.includes(char));
    return hasForbidden
      ? { noSpecialChars: { forbiddenChars: this.forbiddenChars } }
      : null;
  }
}
