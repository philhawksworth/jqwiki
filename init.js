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
	var id = jqw.entryID(name);
	var template = $('#'+ id).find('div.entry-content pre').html();
	
	//find the pieces of the template. (CSS, PageTemplate, ViewTemplate, EditTemplate...)
	
	$('#wiki').empty().append($(template));
};


// Apply a template to build the UI.
jqw.applyTemplate = function(name) {


};


// Displauy the entries listed in a given entry.
jqw.displayListedEntries = function(name) {
	var content = $('#'+jqw.entryID(name)).find('div.entry-content');
	jqw.findEntryLinks(content).each(function(index) {
		jqw.displayEntry( $(this).text() );
	});;
};

// Find the Entry links in an element or string.
jqw.findEntryLinks = function(source) {
	return $(source).find('a.entryLink');
};


jqw.displayEntry = function(name, options) {

	// $('#content').append( $('#'+jqw.entryID(name)) );
	
	var defaults = {
		template: 'ViewTemplate'
	};
	var opt = $.extend({}, defaults, options);
	
	//get the template.
	var template = $($('#'+jqw.entryID(opt.template)).find('div.entry-content pre').clone().html());
	console.log('template', name, template);
		
	// get the source data.
	var source = $('#'+jqw.entryID(name));
	var content = source.find(jqw.api.content).html();
	// var title
	// var	meta
	// var tags

	// console.log('content', content);
	// console.log('target', template.find(jqw.api.content));
	
	
	//substitue the data from the entry.
	template.find(jqw.api.content).html(name);
	// console.log('template', name, template.html());
		
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




// generate entry ID
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
	content : 'div.entry-content',
	modifier: 'dl.meta'
};




