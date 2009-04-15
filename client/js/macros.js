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
	
	clean = $.trim(content.replace(/\t/g,""));
	$(args.place).val(clean);
};

