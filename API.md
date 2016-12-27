## Classes

<dl>
<dt><a href="#ArchiveManager">ArchiveManager</a></dt>
<dd></dd>
<dt><a href="#ArchiveManager">ArchiveManager</a></dt>
<dd></dd>
<dt><a href="#DropboxDatasource">DropboxDatasource</a> ⇐ <code>TextDatasource</code></dt>
<dd></dd>
<dt><a href="#DropboxDatasource">DropboxDatasource</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#StorageInterface">StorageInterface</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveDetailsDisplay">ArchiveDetailsDisplay</a> : <code>Object</code></dt>
<dd><p>Archive details for display</p>
</dd>
<dt><a href="#ManagedArchiveItem">ManagedArchiveItem</a> : <code>Object</code></dt>
<dd><p>Stored archive entry</p>
</dd>
</dl>

<a name="ArchiveManager"></a>

## ArchiveManager
**Kind**: global class  

* [ArchiveManager](#ArchiveManager)
    * [new ArchiveManager()](#new_ArchiveManager_new)
    * [new ArchiveManager([storage])](#new_ArchiveManager_new)
    * _instance_
        * [.archives](#ArchiveManager+archives) : <code>Object</code>
        * [.displayList](#ArchiveManager+displayList) : <code>[Array.&lt;ArchiveDetailsDisplay&gt;](#ArchiveDetailsDisplay)</code>
        * [.storage](#ArchiveManager+storage) : <code>[StorageInterface](#StorageInterface)</code>
        * [.unlockedArchives](#ArchiveManager+unlockedArchives) : <code>[Array.&lt;ManagedArchiveItem&gt;](#ManagedArchiveItem)</code>
        * [.addArchive(name, workspace, credentials, masterPassword)](#ArchiveManager+addArchive)
        * [.isLocked(name)](#ArchiveManager+isLocked) ⇒ <code>Boolean</code>
        * [.loadState()](#ArchiveManager+loadState)
        * [.lock(name)](#ArchiveManager+lock) ⇒ <code>Promise</code>
        * [.saveState()](#ArchiveManager+saveState) ⇒ <code>Promise</code>
        * [.unlock(name, password)](#ArchiveManager+unlock) ⇒ <code>Promise</code>
    * _static_
        * [.ArchiveStatus](#ArchiveManager.ArchiveStatus)

<a name="new_ArchiveManager_new"></a>

### new ArchiveManager()
Archive Manager - manages a set of archives for the browser

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

### archiveManager.addArchive(name, workspace, credentials, masterPassword)
Add an archive to the manager

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | A unique name for the item |
| workspace | <code>SharedWorkspace</code> | The workspace that holds the archive, datasource etc. |
| credentials | <code>Credentials</code> | The credentials for remote storage etc.  (these should also already hold datasource meta information) |
| masterPassword | <code>String</code> | The master password |

<a name="ArchiveManager+isLocked"></a>

### archiveManager.isLocked(name) ⇒ <code>Boolean</code>
Check if an item is locked

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Boolean</code> - True if locked  
**Throws**:

- <code>Error</code> Throws if the item is not found


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |

<a name="ArchiveManager+loadState"></a>

### archiveManager.loadState()
Load the manager state
Used when the page loads to restore the archive items list (all are locked at
 this stage).

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+lock"></a>

### archiveManager.lock(name) ⇒ <code>Promise</code>
Lock an item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is locked  
**Throws**:

- <code>Error</code> Throws if the item is not found
- <code>Error</code> Throws if the item is already locked
- <code>Error</code> Throws if the item is currently being processed


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item to lock |

<a name="ArchiveManager+saveState"></a>

### archiveManager.saveState() ⇒ <code>Promise</code>
Save the state of the manager to the storage

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves once the state has been saved  
<a name="ArchiveManager+unlock"></a>

### archiveManager.unlock(name, password) ⇒ <code>Promise</code>
Unlock a locked item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is unlocked  
**Throws**:

- <code>Error</code> Throws if the item is not locked


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item to unlock |
| password | <code>String</code> | The master password of the item to unlock |

<a name="ArchiveManager.ArchiveStatus"></a>

### ArchiveManager.ArchiveStatus
Stored archive status

**Kind**: static enum of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager"></a>

## ArchiveManager
**Kind**: global class  

* [ArchiveManager](#ArchiveManager)
    * [new ArchiveManager()](#new_ArchiveManager_new)
    * [new ArchiveManager([storage])](#new_ArchiveManager_new)
    * _instance_
        * [.archives](#ArchiveManager+archives) : <code>Object</code>
        * [.displayList](#ArchiveManager+displayList) : <code>[Array.&lt;ArchiveDetailsDisplay&gt;](#ArchiveDetailsDisplay)</code>
        * [.storage](#ArchiveManager+storage) : <code>[StorageInterface](#StorageInterface)</code>
        * [.unlockedArchives](#ArchiveManager+unlockedArchives) : <code>[Array.&lt;ManagedArchiveItem&gt;](#ManagedArchiveItem)</code>
        * [.addArchive(name, workspace, credentials, masterPassword)](#ArchiveManager+addArchive)
        * [.isLocked(name)](#ArchiveManager+isLocked) ⇒ <code>Boolean</code>
        * [.loadState()](#ArchiveManager+loadState)
        * [.lock(name)](#ArchiveManager+lock) ⇒ <code>Promise</code>
        * [.saveState()](#ArchiveManager+saveState) ⇒ <code>Promise</code>
        * [.unlock(name, password)](#ArchiveManager+unlock) ⇒ <code>Promise</code>
    * _static_
        * [.ArchiveStatus](#ArchiveManager.ArchiveStatus)

<a name="new_ArchiveManager_new"></a>

### new ArchiveManager()
Archive Manager - manages a set of archives for the browser

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

### archiveManager.addArchive(name, workspace, credentials, masterPassword)
Add an archive to the manager

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | A unique name for the item |
| workspace | <code>SharedWorkspace</code> | The workspace that holds the archive, datasource etc. |
| credentials | <code>Credentials</code> | The credentials for remote storage etc.  (these should also already hold datasource meta information) |
| masterPassword | <code>String</code> | The master password |

<a name="ArchiveManager+isLocked"></a>

### archiveManager.isLocked(name) ⇒ <code>Boolean</code>
Check if an item is locked

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Boolean</code> - True if locked  
**Throws**:

- <code>Error</code> Throws if the item is not found


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |

<a name="ArchiveManager+loadState"></a>

### archiveManager.loadState()
Load the manager state
Used when the page loads to restore the archive items list (all are locked at
 this stage).

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="ArchiveManager+lock"></a>

### archiveManager.lock(name) ⇒ <code>Promise</code>
Lock an item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is locked  
**Throws**:

- <code>Error</code> Throws if the item is not found
- <code>Error</code> Throws if the item is already locked
- <code>Error</code> Throws if the item is currently being processed


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item to lock |

<a name="ArchiveManager+saveState"></a>

### archiveManager.saveState() ⇒ <code>Promise</code>
Save the state of the manager to the storage

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves once the state has been saved  
<a name="ArchiveManager+unlock"></a>

### archiveManager.unlock(name, password) ⇒ <code>Promise</code>
Unlock a locked item

**Kind**: instance method of <code>[ArchiveManager](#ArchiveManager)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the item is unlocked  
**Throws**:

- <code>Error</code> Throws if the item is not locked


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item to unlock |
| password | <code>String</code> | The master password of the item to unlock |

<a name="ArchiveManager.ArchiveStatus"></a>

### ArchiveManager.ArchiveStatus
Stored archive status

**Kind**: static enum of <code>[ArchiveManager](#ArchiveManager)</code>  
<a name="DropboxDatasource"></a>

## DropboxDatasource ⇐ <code>TextDatasource</code>
**Kind**: global class  
**Extends:** <code>TextDatasource</code>  

* [DropboxDatasource](#DropboxDatasource) ⇐ <code>TextDatasource</code>
    * [new DropboxDatasource()](#new_DropboxDatasource_new)
    * [new DropboxDatasource(accessToken, resourcePath)](#new_DropboxDatasource_new)
    * [.toObject()](#DropboxDatasource+toObject) ⇒ <code>Object</code>

<a name="new_DropboxDatasource_new"></a>

### new DropboxDatasource()
Datasource for Dropbox archives

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
<a name="DropboxDatasource"></a>

## DropboxDatasource
**Kind**: global class  

* [DropboxDatasource](#DropboxDatasource)
    * [new DropboxDatasource()](#new_DropboxDatasource_new)
    * [new DropboxDatasource(accessToken, resourcePath)](#new_DropboxDatasource_new)
    * [.toObject()](#DropboxDatasource+toObject) ⇒ <code>Object</code>

<a name="new_DropboxDatasource_new"></a>

### new DropboxDatasource()
Datasource for Dropbox archives

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
<a name="StorageInterface"></a>

## StorageInterface : <code>Object</code>
**Kind**: global variable  

* [StorageInterface](#StorageInterface) : <code>Object</code>
    * [.getData](#StorageInterface.getData)
    * [.setData](#StorageInterface.setData)

<a name="StorageInterface.getData"></a>

### StorageInterface.getData
Get data from storage

**Kind**: static property of <code>[StorageInterface](#StorageInterface)</code>  

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

<a name="ArchiveDetailsDisplay"></a>

## ArchiveDetailsDisplay : <code>Object</code>
Archive details for display

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the item |
| status | <code>ArchiveStatus</code> | The status of the item |

<a name="ManagedArchiveItem"></a>

## ManagedArchiveItem : <code>Object</code>
Stored archive entry

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>ArchiveStatus</code> | The status of the item |
| workspace | <code>SharedWorkspace</code> &#124; <code>undefined</code> | Reference to the workspace (undefined if locked) |
| credentials | <code>Credentials</code> &#124; <code>String</code> | Reference to Credentials instance (encrypted string if locked) |
| password | <code>String</code> &#124; <code>undefined</code> | The master password (undefined if locked) |

