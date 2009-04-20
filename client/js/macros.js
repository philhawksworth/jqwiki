jqw.macros = {};

// View Macro.
// Finds content from the store and appends it into the element from where the macro was called.
jqw.macros.view = function(args) {
	var content = args.source.find(jqw.api[args.data]).html();
	$(args.place).append(content);
};


// Edit Macro.
// Finds content from the store and use it to populate the input element from where the macro was called.
jqw.macros.edit = function(args) {
	var content = args.source.find(jqw.api[args.data]).html();		
	$(args.place).val($.trim(content.replace(/\t/g,"")));
};


// Entry Macro.
// Transcludes the content of an entry into the element from where the macro was called.
jqw.macros.entry = function(args) {
	
	var content = $('#'+jqw.entryID(args.entry)).find(jqw.api.content).html();
	$(args.place).append(content);
};


// Tags Macro.
// Render a tags list with the UI to add more tags.
jqw.macros.tags = function(args) {

	// var addBtn = "<a href='#' class='addTag' title='add a tag'>add tag</a>";
	// var delBtn = "<a href='#' class='delTag' title='remove this tag'>x</a>";	
	var tags = $(args.source.find(jqw.api.tags)).clone().find('li');
	tags.each(function(index) {
		$(this).find('a').append("<a href='#' class='delTag' title='remove this tag'>x</a>");
	});
	$(args.place).append(tags);	
	tags.parents('ul.tags').after("<a href='#' class='addTag' title='add a tag'>add tag</a>");
};




