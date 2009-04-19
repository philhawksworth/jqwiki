$(document).ready(function() {
	
	
	
	// report firing of for jQwiki events.
	
	$(document).bind('editEntry.jqwiki', function(event) {
		console.log('editEntry: ', $(event.target), event.timeStamp);
	});
	$(document).bind('cancelEditEntry.jqwiki', function(event) {
		console.log('cancelEditEntry: ', $(event.target), event.timeStamp);
	});
	$(document).bind('closeEntry.jqwiki', function(event) {
		console.log('closeEntry: ', $(event.target), event.timeStamp);
	});
	
	$(document).bind('entryLinkClick.jqwiki', function(event) {
		console.log('entryLinkClick: ', $(event.target), event.timeStamp);
	});
	



	$(document).bind('init.jqwiki', function(event) {
		console.log('init ', $(event.target), event.timeStamp);
	});
	$(document).bind('hideStore.jqwiki', function(event) {
		console.log('hideStore ', $(event.target), event.timeStamp);
	});
	$(document).bind('applyPageTemplate.jqwiki', function(event) {
		console.log('applyPageTemplate: ', $(event.target), event.timeStamp);
	});
	$(document).bind('displayDefaultEntries.jqwiki', function(event) {
		console.log('displayDefaultEntries: ', $(event.target), event.timeStamp);
	});


});
