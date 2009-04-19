
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