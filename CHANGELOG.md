# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][kac], and this project adheres to
[Semantic Versioning][semver].

[kac]: https://keepachangelog.com/en/1.0.0
[semver]: https://semver.org/spec/v2.0.0.html

## Unreleased

## 0.1.1 - 2021-06-23

### Fixed

- [#2] - Lowering Angular peer dependency requirements

[#2]: https://github.com/siren-js/ng/issues/2

## 0.1.0 - 2021-06-12

### Added

- `actionToFormGroup()` creates a `FormGroup` from an `Action`
- `fieldToFormControl()` creates a `FormControl` from a `Field`
- `SyncFilesDirective` (`sireNgSyncFiles`) for keeping `file` `input` elements
  in sync with `file` `Field`s
