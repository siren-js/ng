import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'app-radio-button-control',
  templateUrl: './radio-button-control.component.html',
})
export class RadioButtonControlComponent extends ControlComponent {
  get buttons(): any[] {
    return this.field.group as any[];
  }
}
