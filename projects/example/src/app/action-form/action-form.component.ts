import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action, Field } from '@siren-js/core';
import { actionToFormGroup } from '@siren-js/ng';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
})
export class ActionFormComponent implements OnInit {
  @Input() action!: Action;
  formGroup!: FormGroup;
  @Output() submitAction = new EventEmitter<Action>();

  get fields(): readonly Field[] {
    return this.action.fields ?? [];
  }

  ngOnInit(): void {
    this.formGroup = actionToFormGroup(this.action);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.submitAction.emit(this.action);
    }
  }
}
