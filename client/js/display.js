
// Apply a template to build the UI.
jqw.applyPageTemplate = function(name) {
	
	/*
		TODO find the pieces of the template. (CSS, PageTemplate, ViewTemplate, EditTemplate...)
	*/

	var pageTemplate = jqw.applyTemplate(name, name);
	$('#wiki').empty().append(pageTemplate);
	$(document).trigger('applyPageTemplate.jqwiki');
};


// Apply a template to an entry.
jqw.applyTemplate = function(name, templateName) {
	var template = $($('#'+jqw.entryID(templateName)).find('div.entry-content pre').html());
	templated =  jqw.expandMacros(template, name);
	return templated;
};


// find macros and execute them.
jqw.expandMacros = function(destination, sourceEntry) {
	var k, data;
	destination.each(function(index) {
		k = $(this);
		k.children().each(function(index) {
			jqw.expandMacros($(this), sourceEntry);
		});
		data = k.metadata();
		if(data && data.macro) {
			if(jqw.macros[data.macro]) {
				data['source'] = $('#'+jqw.entryID(sourceEntry));
				data['place'] = k;
				jqw.macros[data.macro](data);
			} else {
				console.log('Error: No macro called ', data.macro);
			}
		}
	});
	return destination;
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
		sourceElement: null,
		place: null
	};
	var opt = $.extend({}, defaults, options);
	
	console.log('display', opt);

	// the entry is aready displayed		
	if(jqw.findDisplayedEntry(name).length > 0) {
		// if we are doing a replace
		if(opt.position == 'replace') {
			var e = jqw.findDisplayedEntry(name);
			var entry = jqw.applyTemplate(name, opt.template);
			entry.attr({id: name});
			e.replaceWith(entry);
		} else {
			// Not a replace, just move the viewport to the entry.			
			var entry = jqw.findDisplayedEntry(name);
			entry.entryDisplayEffect({animSrc: opt.sourceElement});
			$('html,body').animate({scrollTop: entry.offset().top}, 500);
		}
				
	} else {
		// the entry needs to be dislayed. 		
		var entry = jqw.applyTemplate(name, opt.template);
		//add an id to the entry so that we can rapidly find it in the display.
		
		if(opt.place) {
			opt.place.html(entry);
			return;
		}
		
		entry.attr({id: name});
		
		// display the entry in the appropriate place.
		if(opt.position == 'top') {
			$('#content').prepend(entry);		
		} else if(opt.position == 'bottom') {
			$('#content').append(entry);
		} else if(opt.position == 'after') {
			opt.sourceEntry.after(entry);
		}
		entry.entryDisplayEffect({animSrc: opt.sourceElement});
	}	
		
};


jqw.refreshDisplay = function(){

	// store a reference to the Store for better performance.
	var store = $('#store');
	
	// Show links to missing entries as such.
	$('#wiki a.entryLink').each(function(index) {
		if($('#'+jqw.entryID($(this).text()), store).length == 0) {
			$(this).addClass('missing');			
		}
	});
	
};
