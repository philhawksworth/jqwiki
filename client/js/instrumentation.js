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

});
