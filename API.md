## Classes

<dl>
<dt><a href="#ArchiveManager">ArchiveManager</a></dt>
<dd><p>Archive Manager - manages a set of archives for the browser</p>
</dd>
<dt><a href="#DropboxDatasource">DropboxDatasource</a> ⇐ <code>TextDatasource</code></dt>
<dd><p>Datasource for Dropbox archives</p>
</dd>
<dt><a href="#EntryFinder">EntryFinder</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#StorageInterface">StorageInterface</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#ArchiveTools">ArchiveTools</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#flattenEntries">flattenEntries(archives)</a> ⇒ <code><a href="#EntrySearchInfo">Array.&lt;EntrySearchInfo&gt;</a></code></dt>
<dd><p>Flatten entries into a searchable structure</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveDetailsDisplay">ArchiveDetailsDisplay</a> : <code>Object</code></dt>
<dd><p>Archive details for display</p>
</dd>
<dt><a href="#ManagedArchiveItem">ManagedArchiveItem</a> : <code>Object</code></dt>
<dd><p>Stored archive entry</p>
</dd>
<dt><a href="#EntrySearchInfo">EntrySearchInfo</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="ArchiveManager"></a>

## ArchiveManager
Archive Manager - manages a set of archives for the browser

**Kind**: global class  

* [ArchiveManager](#ArchiveManager)
    * [new ArchiveManager([storage])](#new_ArchiveManager_new)
    * _instance_
        * [.archives](#ArchiveManager+archives) : <code>Object</code>
        * [.displayList](#ArchiveManager+displayList) : <code>[Array.&lt;ArchiveDetailsDisplay&gt;](#ArchiveDetailsDisplay)</code>
        * [.storage](#ArchiveManager+storage) : <code>[StorageInterface](#StorageInterface)</code>
        * [.unlockedArchives](#ArchiveManager+unlockedArchives) : <code>[Array.&lt;ManagedArchiveItem&gt;](#ManagedArchiveItem)</code>
        * [.addArchive(archiveName, workspace, credentials, masterPassword)](#ArchiveManager+addArchive)
        * [.isLocked(archiveName)](#ArchiveManager+isLocked) ⇒ <code>Boolean</code>
        * [.loadState()](#ArchiveManager+loadState)
        * [.lock(archiveName)](#ArchiveManager+lock) ⇒ <code>Promise</code>
        * [.removeArchive(archiveName)](#ArchiveManager+removeArchive) ⇒ <code>Boolean</code>
        * [.saveState()](#ArchiveManager+saveState) ⇒ <code>Promise</code>
        * [.unlock(archiveName, password)](#ArchiveManager+unlock) ⇒ <code>Promise</code>
        * [.updateUnlocked()](#ArchiveManager+updateUnlocked) ⇒ <code>Promise</code>
    * _static_
        * [.ArchiveStatus](#ArchiveManager.ArchiveStatus)
        * [.getSharedManager()](#ArchiveManager.getSharedManager) ⇒ <code>[ArchiveManager](#ArchiveManager)</code>

<a name="new_ArchiveManager_new"></a>

### new ArchiveManager([storage])
Constructor for the manager


| Param | Type | Description |
| --- | --- | --- |
| [storage] | <code>[StorageInterface](#StorageInterface)</code> | Storage interface reference |

<a name="ArchiveManager+archives"></a>

### archiveManager.archives : <code>Object</code>
Archives reference

**Kind**: instance property of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+displayList"></a>

### archiveManager.displayList : <code>[Array.&lt;ArchiveDetailsDisplay&gt;](#ArchiveDetailsDisplay)</code>
Array of archive details ready for display

**Kind**: instance property of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+storage"></a>

### archiveManager.storage : <code>[StorageInterface](#StorageInterface)</code>
Storage reference

**Kind**: instance property of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+unlockedArchives"></a>

### archiveManager.unlockedArchives : <code>[Array.&lt;ManagedArchiveItem&gt;](#ManagedArchiveItem)</code>
Array of unlocked archive items

**Kind**: instance property of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+addArchive"></a>

### archiveManager.addArchive(archiveName, workspace, credentials, masterPassword)
Add an archive to the manager

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  

| Param | Type | Description |
| --- | --- | --- |
| archiveName | <code>String</code> | A unique name for the item |
| workspace | <code>Workspace</code> | The workspace that holds the archive, datasource etc. |
| credentials | <code>Credentials</code> | The credentials for remote storage etc.  (these should also already hold datasource meta information) |
| masterPassword | <code>String</code> | The master password |

<a name="ArchiveManager+isLocked"></a>

### archiveManager.isLocked(archiveName) ⇒ <code>Boolean</code>
Check if an item is locked

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Boolean</code> - True if locked  
**Throws**:

- <code>Error</code> Throws if the item is not found


| Param | Type | Description |
| --- | --- | --- |
| archiveName | <code>String</code> | The name of the item |

<a name="ArchiveManager+loadState"></a>

### archiveManager.loadState()
Load the manager state
Used when the page loads to restore the archive items list (all are locked at
 this stage).

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+lock"></a>

### archiveManager.lock(archiveName) ⇒ <code>Promise</code>
Lock an item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is locked  
**Throws**:

- <code>Error</code> Throws if the item is not found
- <code>Error</code> Throws if the item is already locked
- <code>Error</code> Throws if the item is currently being processed


| Param | Type | Description |
| --- | --- | --- |
| archiveName | <code>String</code> | The name of the item to lock |

<a name="ArchiveManager+removeArchive"></a>

### archiveManager.removeArchive(archiveName) ⇒ <code>Boolean</code>
Remove an archive by name

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Boolean</code> - True if deleted, false if not found  

| Param | Type | Description |
| --- | --- | --- |
| archiveName | <code>String</code> | The name of the archive to remove |

<a name="ArchiveManager+saveState"></a>

### archiveManager.saveState() ⇒ <code>Promise</code>
Save the state of the manager to the storage

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves once the state has been saved  
<a name="ArchiveManager+unlock"></a>

### archiveManager.unlock(archiveName, password) ⇒ <code>Promise</code>
Unlock a locked item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is unlocked  
**Throws**:

- <code>Error</code> Throws if the item is not locked


| Param | Type | Description |
| --- | --- | --- |
| archiveName | <code>String</code> | The name of the item to unlock |
| password | <code>String</code> | The master password of the item to unlock |

<a name="ArchiveManager+updateUnlocked"></a>

### archiveManager.updateUnlocked() ⇒ <code>Promise</code>
Update workspaces that are unlocked

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves after updating all unlocked workspaces  
<a name="ArchiveManager.ArchiveStatus"></a>

### ArchiveManager.ArchiveStatus
Stored archive status

**Kind**: static enum of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager.getSharedManager"></a>

### ArchiveManager.getSharedManager() ⇒ <code>[ArchiveManager](#ArchiveManager)</code>
Get the singleton shared instance

**Kind**: static method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>[ArchiveManager](#ArchiveManager)</code> - The shared instance  
<a name="DropboxDatasource"></a>

## DropboxDatasource ⇐ <code>TextDatasource</code>
Datasource for Dropbox archives

**Kind**: global class  
**Extends:** <code>TextDatasource</code>  

* [DropboxDatasource](#DropboxDatasource) ⇐ <code>TextDatasource</code>
    * [new DropboxDatasource(accessToken, resourcePath)](#new_DropboxDatasource_new)
    * [.toObject()](#DropboxDatasource+toObject) ⇒ <code>Object</code>

<a name="new_DropboxDatasource_new"></a>

### new DropboxDatasource(accessToken, resourcePath)
Datasource for Dropbox accounts


| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>String</code> | The dropbox access token |
| resourcePath | <code>String</code> | The file path |

<a name="DropboxDatasource+toObject"></a>

### dropboxDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of <code>[DropboxDatasource](#DropboxDatasource)</code>  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="EntryFinder"></a>

## EntryFinder
**Kind**: global class  

* [EntryFinder](#EntryFinder)
    * [new EntryFinder(_archives)](#new_EntryFinder_new)
    * [.items](#EntryFinder+items) : <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
    * [.lastResult](#EntryFinder+lastResult) : <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
    * [.initSearcher()](#EntryFinder+initSearcher)
    * [.search(term)](#EntryFinder+search) ⇒ <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>

<a name="new_EntryFinder_new"></a>

### new EntryFinder(_archives)

| Param | Type | Description |
| --- | --- | --- |
| _archives | <code>Array.&lt;Archive&gt;</code> &#124; <code>Archive</code> | The archives to search |

<a name="EntryFinder+items"></a>

### entryFinder.items : <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
All items

**Kind**: instance property of <code>[EntryFinder](#EntryFinder)</code>  
<a name="EntryFinder+lastResult"></a>

### entryFinder.lastResult : <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
The last result

**Kind**: instance property of <code>[EntryFinder](#EntryFinder)</code>  
<a name="EntryFinder+initSearcher"></a>

### entryFinder.initSearcher()
Initialise the searching mechanism

**Kind**: instance method of <code>[EntryFinder](#EntryFinder)</code>  
<a name="EntryFinder+search"></a>

### entryFinder.search(term) ⇒ <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
Search and get results

**Kind**: instance method of <code>[EntryFinder](#EntryFinder)</code>  
**Returns**: <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code> - The results  

| Param | Type | Description |
| --- | --- | --- |
| term | <code>String</code> | The search term |

<a name="StorageInterface"></a>

## StorageInterface : <code>Object</code>
**Kind**: global variable  

* [StorageInterface](#StorageInterface) : <code>Object</code>
    * [.getData](#StorageInterface.getData) ⇒ <code>\*</code>
    * [.setData](#StorageInterface.setData)

<a name="StorageInterface.getData"></a>

### StorageInterface.getData ⇒ <code>\*</code>
Get data from storage

**Kind**: static property of <code>[StorageInterface](#StorageInterface)</code>  
**Returns**: <code>\*</code> - The fetched data  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to fetch for |
| defaultValue | <code>\*</code> | The default value if the key is not found |

<a name="StorageInterface.setData"></a>

### StorageInterface.setData
Set data for a key

**Kind**: static property of <code>[StorageInterface](#StorageInterface)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to set for |
| rawData | <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code> &#124; <code>\*</code> | The raw data to set |

<a name="ArchiveTools"></a>

## ArchiveTools : <code>object</code>
**Kind**: global namespace  

* [ArchiveTools](#ArchiveTools) : <code>object</code>
    * [.extractDomain(url)](#ArchiveTools.extractDomain) ⇒ <code>String</code>
    * [.getEntriesForURL(archive, url)](#ArchiveTools.getEntriesForURL) ⇒ <code>Array.&lt;Entry&gt;</code>

<a name="ArchiveTools.extractDomain"></a>

### ArchiveTools.extractDomain(url) ⇒ <code>String</code>
Extract the domain from a URL

**Kind**: static method of <code>[ArchiveTools](#ArchiveTools)</code>  
**Returns**: <code>String</code> - The domain or an empty string if none found  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL to extract from |

<a name="ArchiveTools.getEntriesForURL"></a>

### ArchiveTools.getEntriesForURL(archive, url) ⇒ <code>Array.&lt;Entry&gt;</code>
Get entries for a particular URL

**Kind**: static method of <code>[ArchiveTools](#ArchiveTools)</code>  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of entries  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | A buttercup archive instance |
| url | <code>String</code> | A URL |

<a name="flattenEntries"></a>

## flattenEntries(archives) ⇒ <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code>
Flatten entries into a searchable structure

**Kind**: global function  
**Returns**: <code>[Array.&lt;EntrySearchInfo&gt;](#EntrySearchInfo)</code> - An array of searchable objects  

| Param | Type | Description |
| --- | --- | --- |
| archives | <code>Array.&lt;Archive&gt;</code> | An array of archives |

<a name="ArchiveDetailsDisplay"></a>

## ArchiveDetailsDisplay : <code>Object</code>
Archive details for display

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| status | <code>ArchiveStatus</code> | The status of the item |
| type | <code>String</code> | The type of archive connection |

<a name="ManagedArchiveItem"></a>

## ManagedArchiveItem : <code>Object</code>
Stored archive entry

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>ArchiveStatus</code> | The status of the item |
| workspace | <code>Workspace</code> &#124; <code>undefined</code> | Reference to the workspace (undefined if locked) |
| credentials | <code>Credentials</code> &#124; <code>String</code> | Reference to Credentials instance (encrypted string if locked) |
| password | <code>String</code> &#124; <code>undefined</code> | The master password (undefined if locked) |

<a name="EntrySearchInfo"></a>

## EntrySearchInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry |
| archive | <code>Archive</code> | The associated archive |

