## Classes

<dl>
<dt><a href="#DropboxDatasource">DropboxDatasource</a> ⇐ <code>TextDatasource</code></dt>
<dd><p>Datasource for Dropbox archives</p>
</dd>
<dt><a href="#EntryFinder">EntryFinder</a></dt>
<dd></dd>
<dt><a href="#LocalStorageInterface">LocalStorageInterface</a> ⇐ <code>StorageInterface</code></dt>
<dd><p>Interface for localStorage</p>
</dd>
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
<dt><a href="#EntrySearchInfo">EntrySearchInfo</a> : <code>Object</code></dt>
<dd></dd>
</dl>

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

<a name="LocalStorageInterface"></a>

## LocalStorageInterface ⇐ <code>StorageInterface</code>
Interface for localStorage

**Kind**: global class  
**Extends:** <code>StorageInterface</code>  

* [LocalStorageInterface](#LocalStorageInterface) ⇐ <code>StorageInterface</code>
    * [.getAllKeys()](#LocalStorageInterface+getAllKeys) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.getValue(name)](#LocalStorageInterface+getValue) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.setValue(name, value)](#LocalStorageInterface+setValue) ⇒ <code>Promise</code>

<a name="LocalStorageInterface+getAllKeys"></a>

### localStorageInterface.getAllKeys() ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Get all keys from storage

**Kind**: instance method of <code>[LocalStorageInterface](#LocalStorageInterface)</code>  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise that resolves with an array of keys  
<a name="LocalStorageInterface+getValue"></a>

### localStorageInterface.getValue(name) ⇒ <code>Promise.&lt;String&gt;</code>
Get the value of a key

**Kind**: instance method of <code>[LocalStorageInterface](#LocalStorageInterface)</code>  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |

<a name="LocalStorageInterface+setValue"></a>

### localStorageInterface.setValue(name, value) ⇒ <code>Promise</code>
Set the value for a key

**Kind**: instance method of <code>[LocalStorageInterface](#LocalStorageInterface)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the value is set  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |
| value | <code>String</code> | The value to set |

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

<a name="EntrySearchInfo"></a>

## EntrySearchInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry |
| archive | <code>Archive</code> | The associated archive |

