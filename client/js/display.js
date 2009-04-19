
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
jqw.applyTemplate = function(name, templateName) {
	var template = $($('#'+jqw.entryID(templateName)).find('div.entry-content pre').clone());
	templated =  jqw.expandMacros(template, name);
	return templated;
};


// find macros and execute them.
jqw.expandMacros = function(destination, sourceEntry) {
	
	// destination.each(function(index) {
	// 	console.log('this: ', $(this));
	// });
	
	
	
	destination.find('*').each(function(index) {
		data = $(this).metadata();
		if(data && data.macro !== undefined)
			if(jqw.macros[data.macro]) {
				data['source'] = $('#'+jqw.entryID(sourceEntry));
				data['place'] = $(this);
				jqw.macros[data.macro](data);
			} else {
				console.log('Error: No macro called ', data.macro);
			}
	});
	
	return $(destination.html());
};


// Display the entries listed in a given entry.
jqw.displayListedEntries = function(name) {
	var content = $('#'+jqw.entryID(name)).find('div.entry-content');
	jqw.findEntryLinks(content).each(function(index) {
		jqw.displayEntry($(this).text(), {position:'bottom'});
	});
};


//find an entry in the display by its title.
jqw.findDisplayedEntry = function(name) {
	return $('#' + name);
};


// Display an entry in the main content area.
jqw.displayEntry = function(name, options) {
	
	var defaults = {
		template: 'ViewTemplate',
		position: 'bottom',
		sourceEntry: null,
		sourceElement: null
	};
	var opt = $.extend({}, defaults, options);
	
	// don't open an entry more than once.
	if(jqw.findDisplayedEntry(name).length > 0 && opt.position != 'replace') {
		return;
	}
	
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
	} else if(opt.position == 'after') {
		opt.sourceEntry.after(entry);
	}
	
};
