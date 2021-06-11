import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
})
export class SelectControlComponent extends ControlComponent {
  get options(): any[] {
    return this.field.options as any[];
  }
}
