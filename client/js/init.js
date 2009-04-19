// Let's not pollute the global namespace.
var jqw = {};


// entry API.
// What are the query expressions to return the desired entry elements?
jqw.api = {
	entry: 'div.hentry',
	title: '.entry-title',
	content : 'div.entry-content',
	meta : 'dl.meta',
	tags: 'ul.tags'
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
			console.log(e.message);
		}
	};
};






