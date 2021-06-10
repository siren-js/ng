import { Directive, HostListener, Input } from '@angular/core';
import { Field } from '@siren-js/core';

@Directive({
  selector: 'input[type=file][sireNgSyncFiles]',
})
export class SyncFilesDirective {
  @Input('sireNgSyncFiles') field!: Field;

  @HostListener('change', ['$event.target.files'])
  onChange(files: FileList) {
    this.field.files = files;
  }
}
