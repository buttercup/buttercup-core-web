# Buttercup core-web changelog

## v0.29.0
_2017-05-28_

 * Update core to 0.40.0
   * Update webdav-fs to 1.0.0
   * Add event emitters to core classes
   * **Bugfix**: empty value encoding

## v0.28.1
_2017-05-27_

 * Move SubtleCrypto reference into PBKDF2 function (fixes global reference when not available - eg. not browser)

## v0.28.0
_2017-05-24_

 * Allow for external PBKDF2 functions in patching

## v0.27.1
_2017-05-22_

 * Update core to 0.39.1
   * Expose previously created methods for React Native support

## v0.27.0
_2017-05-21_

 * Update core to 0.39.0
   * Support setting deferred handlers for `TextDatasource` crypto

## v0.26.0
_2017-05-02_

_Due to package **deprecation**, this release helps to gradually phase out functionality in core-web._

 * Remove `ArchiveManager` and `StorageInterface`
 * Upgrade core to 0.38.0
   * New `ArchiveManager`
 * Add `LocalStorageInterface` for use with core's `ArchiveManager`

## v0.25.2
_2017-04-16_

 * Upgrade core to 0.37.1
   * Bugfix: Merging deletion commands when remote hasn't changed

## v0.25.1
_2017-03-29_

 * Bugfix: Error in archive unlock process (wrong password) broke state

## v0.25.0
_2017-03-27_

 * Upgrade core to 0.37.0
    * Added support for `Group.getGroup()` to access parent groups

## v0.24.0
_2017-03-20_

 * Added `EntryFinder` for fuzzy searching entries

## v0.23.0
_2017-03-13_

 * Upgrade core to 0.35.0
    * Entry property serialisation (breaks backwards compatibility with older Buttercup builds)

## v0.22.0
_2017-03-09_

 * Improve URL matching

## v0.21.0
_2017-03-07_

 * **Breaking**:
    * Export UMD module instead of default `window` only attachment
    * Update core to 0.34.0 (credentials breaking changes)
    * Global, shared `archiveManager` reference removed
 * `ArchiveManager` gets singleton method

## v0.20.0
_2017-01-25_

 * Add update method for unlocked archives in ArchiveManager

## v0.19.0
_2017-01-22_

 * Add `type` property to `displayList` of `ArchiveManager` (_This contains breaking changes to the save format in local storage._)

## v0.18.0
_2017-01-10_

 * Added `removeArchive` to `ArchiveManager`

## v0.17.3
_2017-01-09_

 * Bugfix: typo in output of ArchiveManager.displayList

## v0.17.2
_2017-01-07_

 * Upgrade core to 0.33.1
   * Type checking for `Archive` and `Group` instances
   * Better type checking in group moving

## v0.17.0
_2017-01-07_

 * Upgrade core to 0.33.0
   * Add `getHistory` and `createFromHistory` `Archive` methods

## v0.16.0
_2017-01-06_

 * Upgrade core to 0.32.0
   * Add `findEntryByID` to `Archive` and `Group` classes
   * Add `emptyTrash` method to `Archive`

## v0.15.1
_2016-12-30_

 * Fixed OwnCloudDatasource instantiation

## v0.15.0
_2016-12-27_

 * Added [API documentation](API.md)
 * Load Archive Manager state on boot
 * Added Dropbox datasource
 * Filter URL-based entries if they're deleted (trash)
 * **Breaking changes:**
    * Rewrote `ArchiveManager`

## v0.14.1
_2016-12-17_

 * Update `SubtleCrypto`'s `importKey` to use `extractable: false` (fix for Chrome)
 * Run `loadState` on init for archive manager

## v0.14.0
_2016-12-11_

 * Credentials state output

## v0.13.0
_2016-12-03_

 * Credentials update (meta)

## v0.12.0
_2016-11-08_

 * Upgrade Buttercup core to 0.28.0
   * Shared archives
   * Group moving between archives
   * Archive `toObject` 

## v0.11.1
_2016-11-01_

 * Upgrade Buttercup core to 0.27.0
   * Group & Entry searching decorators for Archives and Groups
   * Renamed ManagedGroup to Group
   * Renamed ManagedEntry to Entry
   * Deprecated Archive.getGroupByID and Group.getGroupByID in favour of findGroupByID

## v0.10.4
_2016-10-20_

 * Fix publishing (no files included / babel not run)

## v0.10.0
_2016-10-16_

 * Upgrade Buttercup core to 0.25.0
    * Entry and Group deletion upgrade
    * Fixed `toObject` issues

## v0.9.0
_2016-10-15_

 * Upgrade Buttercup core to 0.24.0
    * Group `toObject` depth

## v0.8.0
_2016-07-18_

 * Workspace saving asynchronously
