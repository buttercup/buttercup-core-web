# Buttercup core-web changelog

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
