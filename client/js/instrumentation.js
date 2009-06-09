$(document).ready(function() {
	
	
	
	// report firing of for jQwiki events.
	
	$(document).bind('editEntry.jqwiki', function(event) {
		jqw.log('editEntry: ', $(event.target), event.timeStamp);
	});
	$(document).bind('cancelEditEntry.jqwiki', function(event) {
		jqw.log('cancelEditEntry: ', $(event.target), event.timeStamp);
	});
	$(document).bind('closeEntry.jqwiki', function(event) {
		jqw.log('closeEntry: ', $(event.target), event.timeStamp);
	});
	
	$(document).bind('entryLinkClick.jqwiki', function(event) {
		jqw.log('entryLinkClick: ', $(event.target), event.timeStamp);
	});
	



	$(document).bind('init.jqwiki', function(event) {
		jqw.log('init ', $(event.target), event.timeStamp);
	});
	$(document).bind('hideStore.jqwiki', function(event) {
		jqw.log('hideStore ', $(event.target), event.timeStamp);
	});
	$(document).bind('applyPageTemplate.jqwiki', function(event) {
		jqw.log('applyPageTemplate: ', $(event.target), event.timeStamp);
	});
	$(document).bind('displayDefaultEntries.jqwiki', function(event) {
		jqw.log('displayDefaultEntries: ', $(event.target), event.timeStamp);
	});


});
