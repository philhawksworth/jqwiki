
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
		var entry = $target.parents(jqw.api.entry);	
		
		// entry links
		if($target.is('a.entryLink')) {
			$target.trigger('entryLinkClick.jqwiki');
			var name = jqw.entryName($target.attr('href'));
			jqw.displayEntry(name, {position: 'after', sourceEntry: entry, sourceElement: $target});
			$target.blur();	
			return false;
		}
		
		// entry control buttons
		if($target.is('div.hentry div.controls a')) {

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
	
	// footer event handlers.
	$('#footer a.entryLink').click(function(ev) {
		var $target = $(ev.target);
		$target.trigger('entryLinkClick.jqwiki');
		var name = jqw.entryName($target.attr('href'));
		
		console.log('click: ', name, $target);
		
		jqw.displayEntry(name, {position: 'bottom', sourceElement: $target});
		$target.blur();	
		return false;
	});
		
	$(document).trigger('addEventHandlers.jqwiki');	
};
