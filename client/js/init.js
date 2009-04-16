// Let's not pollute the global namespace.
var jqw = {};


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




// Apply a template to build the UI.
jqw.applyPageTemplate = function(name) {
	
	/*
		TODO find the pieces of the template. (CSS, PageTemplate, ViewTemplate, EditTemplate...)
	*/

	var pageTemplate = jqw.applyTemplate(name, name);
	$('#wiki').empty().append(pageTemplate);
	
	$(document).trigger('applyPageTemplate.jqwiki');
};


// Apply a template to build the UI.
jqw.applyTemplate = function(name, template) {
	var templated = $($('#'+jqw.entryID(template)).find('div.entry-content pre').clone().html());	
	templated =  jqw.expandMacros(templated, name);
	return templated;
};


// find macros and execute them.
jqw.expandMacros = function(source, name) {
	
	var data;
	source.contents().each(function(index) {
		data = $(this).metadata();
		data['source'] = $('#'+jqw.entryID(name));
		data['place'] = this;
		if($(this).metadata() && data.macro) {
			if(jqw.macros[data.macro]) {
				jqw.macros[data.macro](data);
			} else {
				console.log('Error: No macro called ', data.macro);
			}
		}
	});
	return source;
};


// Display the entries listed in a given entry.
jqw.displayListedEntries = function(name) {
	var content = $('#'+jqw.entryID(name)).find('div.entry-content');
	jqw.findEntryLinks(content).each(function(index) {
		jqw.displayEntry($(this).text(), {position:'bottom'});
	});
};


// Find the Entry links in an element or string.
jqw.findEntryLinks = function(source) {
	return $(source).find('a.entryLink');
};


// Display an entry in the main content area.
jqw.displayEntry = function(name, options) {
	
	var defaults = {
		template: 'ViewTemplate',
		position: 'bottom'
	};
	var opt = $.extend({}, defaults, options);
	var entry = jqw.applyTemplate(name, opt.template);
	
	//add an id to the entry so that we can rapidly find it in the display.
	entry.attr({id: name});
		
	// display the entry in the appropriate place.
	if(opt.position == 'top') {
		$('#content').prepend(entry);		
	} else if(opt.position == 'bottom') {
		$('#content').append(entry);
	} else if(opt.position == 'replace') {
		var e = jqw.findDisplayedEntry(name);
		e.replaceWith(entry);
	}
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


//find an entry in the display by its title.
jqw.findDisplayedEntry = function(name) {
	return $('#' + name);
};


// generate an entry ID
jqw.entryID = function(name) {
	return "entry_" + name.replace(" ","_");
};


// generate entry natural name
jqw.entryName = function(id) {
	return id.substr(6).replace("_"," ");
};



// entry API.
jqw.api = {
	entry: 'div.hentry',
	title: '.entry-title',
	content : 'div.entry-content',
	meta : 'dl.meta',
	tags: 'ul.tags'
};




