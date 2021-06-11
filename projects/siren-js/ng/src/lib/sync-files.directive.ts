import { Directive, HostListener, Input } from '@angular/core';
import { Field } from '@siren-js/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=file][sireNgSyncFiles]',
})
export class SyncFilesDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('sireNgSyncFiles') field!: Field;

  @HostListener('change', ['$event.target.files'])
  onChange(files: FileList): void {
    this.field.files = files;
  }
}
