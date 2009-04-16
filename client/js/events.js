
jqw.addEventHandlers = function() {

	$('#controls a').click(function(ev){
		var btn = $(ev.target);
		
		/*
			TODO handle the global commands.
		*/
		
		return false;
	});
	
	
	$('#content').click(function(ev) {
		var $target = $(ev.target);
		
		// entry control buttons
		if($target.is('div.hentry div.controls a')) {
			var entry = $target.parents(jqw.api.entry);
			var name = entry.attr('id');
			
			// edit button
			if($target.attr('title') == 'edit') {
				jqw.controls.editEntry(name);
			}
			
			// cancel button
			else if($target.attr('title') == 'cancel') {
				jqw.controls.cancelEditEntry(name);
			}
			
			// close button
			else if($target.attr('title') == 'close') {
				jqw.controls.closeEntry(name);
			}
			
			return false;
		}
	});
	
};
