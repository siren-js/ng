# `@siren-js/ng`

Library for working with [Siren] in Angular, primarily building
[dynamic forms][dynamic-form] backed by Siren [actions].

[actions]: https://github.com/kevinswiber/siren#actions-1
[dynamic-form]: https://angular.io/guide/dynamic-form
[siren]: https://github.com/kevinswiber/siren

## Installation

Install this package (and its peer dependency) in your Angular app from NPM.

```sh
npm install @siren-js/ng @siren-js/core
```

You will likely also want to install the [Siren.js client][client] for
[submitting `Action`s][submit].

[client]: https://github.com/siren-js/client
[submit]: https://github.com/siren-js/client#submitting-actions

```sh
npm install @siren-js/client
```

## Dynamic Forms

The `actionToFormGroup()` and `fieldToFormControl()` utility functions allow for
easily building [dynamic forms][dynamic-form] from `Action`s and `Field`s from
`@siren-js/core`.

### From `Action` to `FormGroup`

The `actionToFormGroup()` function accepts an `Action` object and builds a
[`FormGroup`][fg] with a control for each field in the `Action`'s `fields` using
the [`fieldToFormControl()`](#from-field-to-formcontrol) function. The
`FormGroup`'s controls are indexed by the `Field`'s `name`.

[fg]: https://angular.io/api/forms/FormGroup

Here's an example component that uses the `actionToFormGroup()` component. For a
more complete example, see the [example project](../../example/README.md).

```ts
@Component(/* ... */)
export class MyDynamicFormComponent implements OnInit {
  @Input() action!: Action;
  formGroup!: FormGroup;

  get fields(): Field[] {
    return action.fields ?? [];
  }

  ngOnInit(): void {
    this.formGroup = actionToFormGroup(action);
  }
}
```

```html
<form [formGroup]="formGroup">
  <div *ngFor="let field of fields">
    <!-- display fields, binding to FormControls -->
  </div>
</form>
```

### From `Field` to `FormControl`

The `fieldToFormControl()` function builds a [`FormControl`][fc] from a `Field`
object. This function offers more fine-grained control over building dynamic
forms.

[fc]: https://angular.io/api/forms/FormControl

The generated `FormControl` will keep the `Field`'s `value` (with a few
exceptions mentioned below) in sync with the `FormControl`'s value via the
`valueChanges` `Observable`.

```html
<div [formGroup]="formGroup">
  <input [type]="field.type" [formControlName]="field.name" />
</div>
```

### Checkbox Controls

In Angular's [reactive forms][reactive-forms], the `value` of a `FormControl`
must be `true` or `false`, indicating its checkedness. Therefore a `FormControl`
generated from a `checkbox` `Field` updates the `Field`'s [`checked`][checked]
property, rather than its `value`.

[checked]: https://github.com/siren-js/spec-extensions#checked
[reactive-forms]: https://angular.io/guide/reactive-forms

If the `checkbox` `Field` is [required], then a [`ValidatorFn`][validator] is
added to the `FormControl` to ensure the checkbox is checked. Additionally, if
the `Field` is [disabled], then the `FormControl` is also disabled.

[disabled]: https://github.com/siren-js/spec-extensions#disabled-2
[required]: https://github.com/siren-js/spec-extensions#required
[validator]: https://angular.io/api/forms/ValidatorFn

### Radio Button and Select Controls

When binding `FormControl`s to radio buttons or dropdowns, be sure to set the
`input` element's `value` to the index of the corresponding `group` or `options`
item.

```html
<div [formGroup]="formGroup">
  <label *ngFor="let button of buttons; index as i">
    <input type="radio" [value]="i" [formControlName]="field.name" />
  </label>
</div>
```

### File Upload Controls

Due to limitations with Angular's [reactive forms][reactive-forms], the
`FormControl` generated from a `file` `Field` cannot properly stay in sync for
[action submission][submit]. For that, we provide the `SyncFilesDirective`,
which updates a `Field`'s `files` property when the corresponding file upload
`input` element's selected files changes.

To utilize this directive, start by importing the `SireNgModule` in your app:

```ts
import { SireNgModule } from "@siren-js/ng";

@NgModule({
  imports: [SireNgModule /* ... */],
  // ...
})
export class AppModule {}
```

Then bind `sireNgSyncFiles` to the corresponding `Field` on your file upload
`input` element:

```html
<div [formGroup]="formGroup">
  <input type="file" [sireNgSyncFiles]="field" />
</div>
```

<!-- ## Code scaffolding

Run `ng generate component component-name --project ng` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng`.

> Note: Don't forget to add `--project ng` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build @siren-js/ng` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build @siren-js/ng`, go to the dist folder `cd dist/@siren-js/ng` and run `npm publish`.

## Running unit tests

Run `ng test ng` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
