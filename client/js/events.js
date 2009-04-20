
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
			
			// save button
			else if($target.attr('title') == 'save') {
				jqw.controls.saveEntry(name);
			}
			
			// close button
			else if($target.attr('title') == 'close') {
				jqw.controls.closeEntry(name);
			}
	
			return false;
		}
		
		// tag UI
		// show UI.
		if($target.is('a.addTag')) {
			var ui = $("<div class='tagUI'><input type='text'><a href='#' class='doAddTag default' title='add a tag'>tag it!</a><a href='#' class='cancel' title='cancel'>cancel</a></div>");
			$target.hide().after(ui);
			ui.find('input').focus();			
			return false;
		}
		
		// cancel tag.
		if($target.is('div.tagUI a.cancel')) {
			$target.parents('div.tagUI').hide().prev().show();
			return false;
		}
		
		// add tag.
		if($target.is('div.tagUI a.doAddTag')) {
			
			var entry = $target.parents(jqw.api.entry);	
			var newtag = $target.parents('div.tagUI').find('input').val();
			var stored = jqw.findStoredEntry(entry);
			var name = entry.find(jqw.api.title).text();
			
			// add the tag elements to the stored entry.
			stored.find(jqw.api.tags).append("<li><a href='#"+ jqw.entryID(newtag) +"' rel='tag'>"+ newtag +"</a></li>");

			// refresh the entry in the display to bring in the new data.
			jqw.displayEntry(name, {position: 'replace', template: 'ViewTemplate'});

			// focus ion the add tag button for easily adding another tag.
			jqw.findDisplayedEntry(name).find('a.addTag').focus();

			return false;
		}
		
		// remove a tag.
		if($target.is('a.delTag')) {
			
			var entry = $target.parents(jqw.api.entry);	
			var tag = $target.parent().attr('href');
			var stored = jqw.findStoredEntry(entry);
			var name = entry.find(jqw.api.title).text();
			
			// remove the tag elements from the stored entry.
			stored.find(jqw.api.tags).find('a[href="'+ tag +'"]').parents('li').remove();

			// refresh the entry in the display to update the tags.
			jqw.displayEntry(name, {position: 'replace', template: 'ViewTemplate'});

			return false;
		}
		
		
	});
	
	// footer event handlers.
	$('#footer a.entryLink').click(function(ev) {
		var $target = $(ev.target);
		$target.trigger('entryLinkClick.jqwiki');
		var name = jqw.entryName($target.attr('href'));
		jqw.displayEntry(name, {position: 'bottom', sourceElement: $target});
		$target.blur();	
		return false;
	});
		
	$(document).trigger('addEventHandlers.jqwiki');	
};
