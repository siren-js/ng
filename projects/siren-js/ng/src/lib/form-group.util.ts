import { FormControl, FormGroup } from '@angular/forms';
import { Action } from '@siren-js/core';
import { fieldToFormControl } from './form-control.util';

export function actionToFormGroup(action: Action): FormGroup {
  const controls: Record<string, FormControl> = {};
  for (const field of action.fields ?? []) {
    controls[field.name] = fieldToFormControl(field);
  }
  return new FormGroup(controls);
}
