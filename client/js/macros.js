jqw.macros = {};

// View Macro.
// Finds content from the store and appends it into the element from where the macro was called.
jqw.macros.view = function(args) {
	var content = args.source.find(jqw.api[args.data]).html();
	$(args.place).append(content);
};

