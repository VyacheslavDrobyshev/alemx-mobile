fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### get_project_name

```sh
[bundle exec] fastlane get_project_name
```

iOS: get project name.

### bump_build_number_ios

```sh
[bundle exec] fastlane bump_build_number_ios
```

iOS: Increment build number.

### bump_build_number_android

```sh
[bundle exec] fastlane bump_build_number_android
```

Android: Increment build number.

### bump_build_number

```sh
[bundle exec] fastlane bump_build_number
```

iOS & Android: Increment build number.

### get_commit_message

```sh
[bundle exec] fastlane get_commit_message
```

Get version commit message

### git_commit_version

```sh
[bundle exec] fastlane git_commit_version
```

Git: Commit version

### update_version_ios

```sh
[bundle exec] fastlane update_version_ios
```

Switch ios environment

### update_version_android

```sh
[bundle exec] fastlane update_version_android
```

Switch android environment

### store_build_version

```sh
[bundle exec] fastlane store_build_version
```

Save build number

### get_changelog

```sh
[bundle exec] fastlane get_changelog
```

Get unreleased changelogs

----


## Android

### android bundle

```sh
[bundle exec] fastlane android bundle
```

Build signed aab

### android release

```sh
[bundle exec] fastlane android release
```

Deploy a new version to the Google Play

### android ad

```sh
[bundle exec] fastlane android ad
```

Push a new release build to the App Distribution

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
