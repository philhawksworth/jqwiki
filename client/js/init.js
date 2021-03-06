// Let's not pollute the global namespace.
var jqw = {};


// a logging utility.
jqw.log = function(){
	
	if(window.console && window.console.log) {
		console.log(arguments);
	}
	
};


// entry API.
// What are the query expressions to return the desired entry elements?
jqw.api = {
	entry: 'div.hentry',
	title: '.entry-title',
	content : '.entry-content',
	meta : 'dl.meta',
	tags: 'ul.tags'
};


// Options. Somewhere to store various data about the user and their preferences.
jqw.options = {
	username: 'PhilHawksworth',
	animations: true,
	autosave: true
};


// Some default values.
jqw.defaults = {
	newEntry : {
		title: 'New entry',
		content: ''
	},
	missingEntry : {
		content: 'This entry doesn\'t exist yet. Go on and create it.'
	}
};


// DOM ready. Let's boogie.
$(document).ready(function() {
	jqw.init();
});


// Start the jqwiki-ness
jqw.init = function() {
	
	$(document).trigger('init.jqwiki');
	
	// Hide the store.
	$('#store').hide();
	$(document).trigger('hideStore.jqwiki');
		
	// apply page template.
	jqw.applyPageTemplate('DefaultTheme');
	
	// display default entries.
	jqw.displayListedEntries('DefaultEntries');
	$(document).trigger('displayDefaultEntries.jqwiki');
	
	// execute any script entries.
	jqw.execute({tag: 'script'});
	
	// Add our event handlers.
	jqw.addEventHandlers();
};


// generate an entry ID
jqw.entryID = function(name) {
	return "entry_" + name.replace(" ","_");
};


// generate entry natural name
jqw.entryName = function(id) {
	return id.substr(7).replace("_"," ");
};


// find the entry in the store which corresponds to one in the story.
jqw.findStoredEntry = function(div) {
	var title = $(div).find(jqw.api.title).text();
	return $('#'+jqw.entryID(title));
};



// Find the Entry links in an element or string.
jqw.findEntryLinks = function(source) {
	return $(source).find('a.entryLink');
};


// Execute a script entry (or a collection by tag)
jqw.execute = function(args) {
	
	// gather the scripts
	var scripts = [];
	if(typeof args == 'object') {
		$('div.'+ args.tag).each(function(index) {
			var entry = $(this);
			scripts.push( entry.find('pre').html());
		});
	} else if (typeof args == 'string') {
		scripts.push( $('#'+jqw.entryID(args)).find('pre').html() );
	}
	
	// execute them
	for (var s=0; s < scripts.length; s++) {
		try {
			(new Function( scripts[s] ))();
		} catch(e){
			jqw.log(e.message);
		}
	};
};






