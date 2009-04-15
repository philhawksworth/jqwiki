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
	console.log('Entry: ', args);
	
	var source = $('#'+jqw.entryID(args.entry));
	
	var content = source.find(jqw.api.content).html();
	$(args.place).append(content);
};




