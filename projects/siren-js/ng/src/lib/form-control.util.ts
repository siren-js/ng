import { FormControl, Validators } from '@angular/forms';
import { Field } from '@siren-js/core';

export function fieldToFormControl(field: Field): FormControl {
  switch (field.type) {
    case 'checkbox':
      return checkboxFormControl(field);
    case 'radio':
      return radioButtonFormControl(field);
    case 'select':
      return selectFormControl(field);
    default:
      return defaultFormControl(field);
  }
}

function checkboxFormControl(field: Field): FormControl {
  const validator =
    field.required && !field.disabled
      ? Validators.requiredTrue
      : Validators.nullValidator;
  const control = new FormControl(!!field.checked, validator);
  if (field.disabled) {
    control.disable();
  }
  control.valueChanges.subscribe((checked) => {
    field.checked = checked;
  });
  return control;
}

function radioButtonFormControl(field: Field): FormControl {
  const checkedIndex = Array.isArray(field.group)
    ? field.group.findIndex((button) => button.checked)
    : -1;
  const control = new FormControl(checkedIndex);
  // tslint:disable-next-line:no-shadowed-variable
  control.valueChanges.subscribe((checkedIndex) => {
    if (Array.isArray(field.group)) {
      field.group.forEach((button, index) => {
        button.checked = index === checkedIndex;
      });
    }
  });
  return control;
}

function selectFormControl(field: Field): FormControl {
  const selected = findSelected(field);
  const control = new FormControl(selected);
  control.valueChanges.subscribe((value) => {
    if (Array.isArray(field.options)) {
      field.options.forEach((option, index) => {
        option.selected = Array.isArray(value)
          ? value.includes(index)
          : index === Number.parseInt(value);
      });
    }
  });
  return control;
}

function findSelected(field: Field): number | number[] {
  if (Array.isArray(field.options)) {
    if (field.multiple) {
      return field.options.reduce((indices, option, index) => {
        if (option.selected) {
          indices.push(index);
        }
        return indices;
      }, [] as number[]);
    } else {
      const index = field.options.findIndex((option) => option.selected);
      return Math.max(0, index);
    }
  }
  return 0;
}

function defaultFormControl(field: Field): FormControl {
  const control = new FormControl(field.value ?? '');
  control.valueChanges.subscribe((value) => {
    field.value = value;
  });
  return control;
}
