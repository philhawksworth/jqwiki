jqw.macros = {};

// View Macro.
// Finds content from the store and appends it into the element from where the macro was called.
jqw.macros.view = function(args) {
	var content = args.source.find(jqw.api[args.data]).html();
	$(args.place).append(content);
	
	console.log("View:", $(args.place), content);
	
};

// Edit Macro.
// Finds content from the store and use it to populate the input element from where the macro was called.
jqw.macros.edit = function(args) {

	var content = args.source.find(jqw.api[args.data]).html();	
	
	console.log('args.place', args.place);
	
	$(args.place).val($.trim(content.replace(/\t/g,"")));
 	// $(args.place).val("bar");
	
	// var place = $(args.place).prependTo('body');
	// console.log('boo', place, $('<p>foo</p>'));
	// place.val("boo");
	// console.log('place',place);

	// console.log("edit:", $(args.place), content);
	
};

// Entry Macro.
// Transcludes the content of an entry into the element from where the macro was called.
jqw.macros.entry = function(args) {
	
	var content = $('#'+jqw.entryID(args.entry)).find(jqw.api.content).html();
	$(args.place).append(content);
	console.log("Entry:", $(args.place), content);	
};




