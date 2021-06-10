import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '@siren-js/core';

@Component({ template: '' })
export abstract class ControlComponent {
  @Input() field!: Field;
  @Input() formGroup!: FormGroup;

  get labelText(): string {
    return this.field.title ?? this.field.name;
  }
}
