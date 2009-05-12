//--
//-- Adapted TiddlyWiki Saving code.
//--

var saveUsingSafari = false;

var startSaveArea = '<div id="' + 'storeArea">'; // Split up into two so that indexOf() of this source doesn't find it
var endSaveArea = '</d' + 'iv>';

// If there are unsaved changes, force the user to confirm before exitting
// function confirmExit()
// {
// 	hadConfirmExit = true;
// 	if((store && store.isDirty && store.isDirty()) || (story && story.areAnyDirty && story.areAnyDirty()))
// 		return config.messages.confirmExit;
// }

// Give the user a chance to save changes before exitting
// function checkUnsavedChanges()
// {
// 	if(store && store.isDirty && store.isDirty() && window.hadConfirmExit === false) {
// 		if(confirm(config.messages.unsavedChangesWarning))
// 			saveChanges();
// 	}
// }

function updateLanguageAttribute(s)
{
	if(config.locale) {
		var mRE = /(<html(?:.*?)?)(?: xml:lang\="([a-z]+)")?(?: lang\="([a-z]+)")?>/;
		var m = mRE.exec(s);
		if(m) {
			var t = m[1];
			if(m[2])
				t += ' xml:lang="' + config.locale + '"';
			if(m[3])
				t += ' lang="' + config.locale + '"';
			t += ">";
			s = s.substr(0,m.index) + t + s.substr(m.index+m[0].length);
		}
	}
	return s;
}

function updateMarkupBlock(s,blockName,tiddlerName)
{
	return s.replaceChunk(
			"<!--%0-START-->".format([blockName]),
			"<!--%0-END-->".format([blockName]),
			"\n" + convertUnicodeToFileFormat(store.getRecursiveTiddlerText(tiddlerName,"")) + "\n");
}

function updateOriginal(original,posDiv,localPath)
{
	if(!posDiv)
		posDiv = locateStoreArea(original);
	if(!posDiv) {
		alert("invalid file error");
		return null;
	}
	var revised = original.substr(0,posDiv[0] + startSaveArea.length) + "\n" +
				convertUnicodeToFileFormat(store.allTiddlersAsHtml()) + "\n" +
				original.substr(posDiv[1]);
	var newSiteTitle = convertUnicodeToFileFormat(getPageTitle()).htmlEncode();
	revised = revised.replaceChunk("<title"+">","</title"+">"," " + newSiteTitle + " ");
	revised = updateLanguageAttribute(revised);
	revised = updateMarkupBlock(revised,"PRE-HEAD","MarkupPreHead");
	revised = updateMarkupBlock(revised,"POST-HEAD","MarkupPostHead");
	revised = updateMarkupBlock(revised,"PRE-BODY","MarkupPreBody");
	revised = updateMarkupBlock(revised,"POST-SCRIPT","MarkupPostBody");
	return revised;
}

function locateStoreArea(original)
{
	// Locate the storeArea div's
	var posOpeningDiv = original.indexOf(startSaveArea);
	var limitClosingDiv = original.indexOf("<"+"!--POST-STOREAREA--"+">");
	if(limitClosingDiv == -1)
		limitClosingDiv = original.indexOf("<"+"!--POST-BODY-START--"+">");
	var posClosingDiv = original.lastIndexOf(endSaveArea,limitClosingDiv == -1 ? original.length : limitClosingDiv);
	return (posOpeningDiv != -1 && posClosingDiv != -1) ? [posOpeningDiv,posClosingDiv] : null;
}

// function autoSaveChanges(onlyIfDirty,tiddlers)
// {
// 	if(config.options.chkAutoSave)
// 		saveChanges(onlyIfDirty,tiddlers);
// }

function loadOriginal(localPath)
{
	return loadFile(localPath);
}

// Save this tiddlywiki with the pending changes
function saveChanges(tiddlers)
{
	//# Get the URL of the document
	var originalPath = document.location.toString();
	//# Check we were loaded from a file URL
	if(originalPath.substr(0,5) != "file:") {
		alert(config.messages.notFileUrlError);
	}
	var localPath = getLocalPath(originalPath);
	
	console.log('localPath: ', localPath);
	
	//# Load the original file
	var original = loadOriginal(localPath);
	if(original == null) {
		alert(config.messages.cantSaveError);
		if(store.tiddlerExists(config.messages.saveInstructions))
			story.displayTiddler(null,config.messages.saveInstructions);
		return;
	}
	//# Locate the storeArea div's
	var posDiv = locateStoreArea(original);
	if(!posDiv) {
		alert(config.messages.invalidFileError.format([localPath]));
		return;
	}
	saveMain(localPath,original,posDiv);
	if(config.options.chkSaveBackups)
		saveBackup(localPath,original);
	if(config.options.chkSaveEmptyTemplate)
		saveEmpty(localPath,original,posDiv);
	if(config.options.chkGenerateAnRssFeed && saveRss instanceof Function)
		saveRss(localPath);
	if(config.options.chkDisplayInstrumentation)
		displayMessage("saveChanges " + (new Date()-t0) + " ms");
}

function saveMain(localPath,original,posDiv)
{
	var save;
	try {
		//# Save new file
		var revised = updateOriginal(original,posDiv,localPath);
		save = saveFile(localPath,revised);
	} catch (ex) {
		showException(ex);
	}
	if(save) {
		displayMessage(config.messages.mainSaved,"file://" + localPath);
		store.setDirty(false);
	} else {
		alert(config.messages.mainFailed);
	}
}

// function saveBackup(localPath,original)
// {
// 	//# Save the backup
// 	var backupPath = getBackupPath(localPath);
// 	var backup = copyFile(backupPath,localPath);
// 	//# Browser does not support copy, so use save instead
// 	if(!backup)
// 		backup = saveFile(backupPath,original);
// 	if(backup)
// 		displayMessage(config.messages.backupSaved,"file://" + backupPath);
// 	else
// 		alert(config.messages.backupFailed);
// }


// function saveEmpty(localPath,original,posDiv)
// {
// 	//# Save empty template
// 	var emptyPath,p;
// 	if((p = localPath.lastIndexOf("/")) != -1)
// 		emptyPath = localPath.substr(0,p) + "/";
// 	else if((p = localPath.lastIndexOf("\\")) != -1)
// 		emptyPath = localPath.substr(0,p) + "\\";
// 	else
// 		emptyPath = localPath + ".";
// 	emptyPath += "empty.html";
// 	var empty = original.substr(0,posDiv[0] + startSaveArea.length) + original.substr(posDiv[1]);
// 	var emptySave = saveFile(emptyPath,empty);
// 	if(emptySave)
// 		displayMessage(config.messages.emptySaved,"file://" + emptyPath);
// 	else
// 		alert(config.messages.emptyFailed);
// }

function getLocalPath(origPath)
{
	var originalPath = convertUriToUTF8(origPath,config.options.txtFileSystemCharSet);
	// Remove any location or query part of the URL
	var argPos = originalPath.indexOf("?");
	if(argPos != -1)
		originalPath = originalPath.substr(0,argPos);
	var hashPos = originalPath.indexOf("#");
	if(hashPos != -1)
		originalPath = originalPath.substr(0,hashPos);
	// Convert file://localhost/ to file:///
	if(originalPath.indexOf("file://localhost/") == 0)
		originalPath = "file://" + originalPath.substr(16);
	// Convert to a native file format
	//# "file:///x:/path/path/path..." - pc local file --> "x:\path\path\path..."
	//# "file://///server/share/path/path/path..." - FireFox pc network file --> "\\server\share\path\path\path..."
	//# "file:///path/path/path..." - mac/unix local file --> "/path/path/path..."
	//# "file://server/share/path/path/path..." - pc network file --> "\\server\share\path\path\path..."
	var localPath;
	if(originalPath.charAt(9) == ":") // pc local file
		localPath = unescape(originalPath.substr(8)).replace(new RegExp("/","g"),"\\");
	else if(originalPath.indexOf("file://///") == 0) // FireFox pc network file
		localPath = "\\\\" + unescape(originalPath.substr(10)).replace(new RegExp("/","g"),"\\");
	else if(originalPath.indexOf("file:///") == 0) // mac/unix local file
		localPath = unescape(originalPath.substr(7));
	else if(originalPath.indexOf("file:/") == 0) // mac/unix local file
		localPath = unescape(originalPath.substr(5));
	else // pc network file
		localPath = "\\\\" + unescape(originalPath.substr(7)).replace(new RegExp("/","g"),"\\");
	return localPath;
}

// function getBackupPath(localPath,title,extension)
// {
// 	var slash = "\\";
// 	var dirPathPos = localPath.lastIndexOf("\\");
// 	if(dirPathPos == -1) {
// 		dirPathPos = localPath.lastIndexOf("/");
// 		slash = "/";
// 	}
// 	var backupFolder = config.options.txtBackupFolder;
// 	if(!backupFolder || backupFolder == "")
// 		backupFolder = ".";
// 	var backupPath = localPath.substr(0,dirPathPos) + slash + backupFolder + localPath.substr(dirPathPos);
// 	backupPath = backupPath.substr(0,backupPath.lastIndexOf(".")) + ".";
// 	//# replace illegal filename characters(// \/:*?"<>|) and space with underscore
// 	if(title)
// 		backupPath += title.replace(/[\\\/\*\?\":<> ]/g,"_") + ".";
// 	backupPath += (new Date()).convertToYYYYMMDDHHMMSSMMM() + "." + (extension || "html");
// 	return backupPath;
// }


//--
//-- Filesystem code adapted from TiddlyWiki
//--
//#
//# This code is designed to be reusable, but please take care,
//# there are some intricacies that make it tricky to use these
//# functions with full UTF-8 files. For more details, see:
//#
//# http://trac.tiddlywiki.org/ticket/99
//#
//#
//# UTF-8 encoding rules:
//# 0x0000 - 0x007F:  0xxxxxxx
//# 0x0080 - 0x07FF:  110xxxxx 10xxxxxx
//# 0x0800 - 0xFFFF:  1110xxxx 10xxxxxx 10xxxxxx

function convertUTF8ToUnicode(u)
{
	// return config.browser.isOpera || !window.netscape ? manualConvertUTF8ToUnicode(u) : mozConvertUTF8ToUnicode(u);
	return mozConvertUTF8ToUnicode(u);
}

function manualConvertUTF8ToUnicode(utf)
{
	var uni = utf;
	var src = 0;
	var dst = 0;
	var b1, b2, b3;
	var c;
	while(src < utf.length) {
		b1 = utf.charCodeAt(src++);
		if(b1 < 0x80) {
			dst++;
		} else if(b1 < 0xE0) {
			b2 = utf.charCodeAt(src++);
			c = String.fromCharCode(((b1 & 0x1F) << 6) | (b2 & 0x3F));
			uni = uni.substring(0,dst++).concat(c,utf.substr(src));
		} else {
			b2 = utf.charCodeAt(src++);
			b3 = utf.charCodeAt(src++);
			c = String.fromCharCode(((b1 & 0xF) << 12) | ((b2 & 0x3F) << 6) | (b3 & 0x3F));
			uni = uni.substring(0,dst++).concat(c,utf.substr(src));
		}
	}
	return uni;
}

function mozConvertUTF8ToUnicode(u)
{
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
	} catch(ex) {
		return manualConvertUTF8ToUnicode(u);
	} // fallback
	var s = converter.ConvertToUnicode(u);
	var fin = converter.Finish();
	return fin.length > 0 ? s+fin : s;
}

//# convert unicode string to a format suitable for saving to file
//# this should be UTF8, unless the browser does not support saving non-ASCII characters
function convertUnicodeToFileFormat(s)
{
	// if(!config.browser.isIE)
	// 	return s;
	// else
		return convertUnicodeToHtmlEntities(s);
}

function convertUnicodeToHtmlEntities(s)
{
	var re = /[^\u0000-\u007F]/g;
	return s.replace(re,function($0) {return "&#" + $0.charCodeAt(0).toString() + ";";});
}

function convertUnicodeToUTF8(s)
{
// return convertUnicodeToFileFormat to allow plugin migration
	return convertUnicodeToFileFormat(s);
}

function manualConvertUnicodeToUTF8(s)
{
	return unescape(encodeURIComponent(s));
}

function mozConvertUnicodeToUTF8(s)
{
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
	} catch(ex) {
		return manualConvertUnicodeToUTF8(s);
	} // fallback
	var u = converter.ConvertFromUnicode(s);
	var fin = converter.Finish();
	return fin.length > 0 ? u + fin : u;
}

function convertUriToUTF8(uri,charSet)
{
	if(window.netscape == undefined || charSet == undefined || charSet == "")
		return uri;
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		var converter = Components.classes["@mozilla.org/intl/utf8converterservice;1"].getService(Components.interfaces.nsIUTF8ConverterService);
	} catch(ex) {
		return uri;
	}
	return converter.convertURISpecToUTF8(uri,charSet);
}


