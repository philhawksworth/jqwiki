jqw.controls = {};


jqw.controls.editEntry = function(name){
	$('#'+name).trigger('editEntry.jqwiki');
	jqw.displayEntry(name, {position:'replace', template:'EditTemplate'});
};


jqw.controls.cancelEditEntry = function(name) {
	$('#'+name).trigger('cancelEditEntry.jqwiki');	
	jqw.displayEntry(name, {position:'replace', template:'ViewTemplate'});
};


jqw.controls.closeEntry = function(name) {
	$('#'+name).trigger('closeEntry.jqwiki').slideUp(300, function(){
		$(this).remove();
	});
};


jqw.controls.saveEntry = function(name) {
	var entry = $('#'+name);
	var entryStore = $('#'+jqw.entryID(name));
	entry.trigger('saveEntry.jqwiki');	
	
	// save content to store.
	entryStore.find(jqw.api.content).html(entry.find(jqw.api.content).val());
		
	// save title to store.
	entryStore.find(jqw.api.title).html(entry.find(jqw.api.title).val());
		
	// if title changed, then update entry identifier and refresh display.
	
	// revert to the viewTemplate with the revised data.
	jqw.displayEntry(name, {position:'replace', template:'ViewTemplate'});
	
	// save the document.
};
