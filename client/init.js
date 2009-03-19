// Let's not pollute the global namespace.
var jqw = {};


// DOM ready. Let's boogie.
$(document).ready(function() {
	
	// Hide the store.
	$('#store').hide();
	
	// apply page template.
	jqw.applyPageTemplate('Default Theme');
	
	// display default entries.
	jqw.displayListedEntries('DefaultEntries');
	
	// execute any script entries.
	jqw.execute({tag: 'script'});
	
	jqw.addEventHandlers();
	
});


jqw.addEventHandlers = function() {

	$('#controls a').click(function(ev){
		var btn = $(ev.target);
		
		/*
			TODO handle the commands.
		*/
		
		return false;
	});
	
};


// Apply a template to build the UI.
jqw.applyPageTemplate = function(name) {
	
	/*
		TODO find the pieces of the template. (CSS, PageTemplate, ViewTemplate, EditTemplate...)
	*/
	
	var id = jqw.entryID(name);
	var template = $('#'+ id).find('div.entry-content pre').html();
	$('#wiki').empty().append($(template));

};


// Apply a template to build the UI.
jqw.applyTemplate = function(name) {


};


// Displauy the entries listed in a given entry.
jqw.displayListedEntries = function(name) {
	var content = $('#'+jqw.entryID(name)).find('div.entry-content');
	jqw.findEntryLinks(content).each(function(index) {
		jqw.displayEntry($(this).text(), {position:'bottom'});
	});;
};


// Find the Entry links in an element or string.
jqw.findEntryLinks = function(source) {
	return $(source).find('a.entryLink');
};


// Display an entry in the main content area.
jqw.displayEntry = function(name, options) {
	
	var defaults = {
		template: 'ViewTemplate',
		position: 'top'
	};
	var opt = $.extend({}, defaults, options);
	
	//get the template.
	var template = $($('#'+jqw.entryID(opt.template)).find('div.entry-content pre').clone().html());
		
	// get the source data.
	var source = $('#'+jqw.entryID(name));
	var content = source.find(jqw.api.content).html();
	var title = source.find(jqw.api.title).html();
	var meta = source.find(jqw.api.meta).html();
	var tags = source.find(jqw.api.tags).html();
		
	//substitue the data from the entry.
	template.find(jqw.api.content).html(content);
	template.find(jqw.api.title).html(title);
	template.find(jqw.api.meta).html(meta);
	template.find(jqw.api.tags).html(tags);
		
	//add the result to the display.
	$('#content').append(template);
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
	title: 'h2.entry-title',
	content : 'div.entry-content',
	meta : 'dl.meta',
	tags: 'ul.tags'
};




