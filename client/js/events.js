
jqw.addEventHandlers = function() {

	$('#controls a').click(function(ev){
		var $btn = $(ev.target);
		
		/*
			TODO handle the global commands.
		*/
		if($btn.hasClass('newEntry')){
			
			jqw.log('create a new entry');
			
		}

		if($btn.hasClass('options')){
			
			if($('#jqwikiOptions').length > 0){
				var panel = $('#jqwikiOptions');
			} else {
				var h ='<div id="jqwikiOptions"></div>';
				var panel = $(h).hide().prependTo('body');				
			}
			if(panel.hasClass('open')){

				jqw.gatherOptions();
				// $('div.options:not(#store div) input').each(function() {
				// 	var opt = $(this).attr('id');
				// 	jqw.options[opt] = $(this).val();
				// });
			} else {
				// populate the div from an entry
				var options = {
					template: 'SimpleTemplate',
					place: panel
				};
				jqw.displayEntry('GlobalOptions', options);
			}
			// toggle the panel open or closed.
			panel.slideToggle().toggleClass('open');
		}
		
		$btn.blur();
		return false;
	});
	
	
	$('#content').click(function(ev) {
		var $btn = $(ev.target);
		var entry = $btn.parents(jqw.api.entry);	
		
		// entry links
		if($btn.is('a.entryLink')) {
			$btn.trigger('entryLinkClick.jqwiki');
			var name = jqw.entryName($btn.attr('href'));
			jqw.displayEntry(name, {position: 'after', sourceEntry: entry, sourceElement: $btn});
			$btn.blur();	
			return false;
		}
		
		// entry control buttons
		if($btn.is('div.hentry div.controls a')) {

			var name = entry.attr('id');
			
			// edit button
			if($btn.attr('title') == 'edit') {
				jqw.controls.editEntry(name);
			}
			
			// cancel button
			else if($btn.attr('title') == 'cancel') {
				jqw.controls.cancelEditEntry(name);
			}
			
			// save button
			else if($btn.attr('title') == 'save') {
				jqw.controls.saveEntry(name);
			}
			
			// close button
			else if($btn.attr('title') == 'close') {
				jqw.controls.closeEntry(name);
			}
	
			return false;
		}
		
		// tag UI
		// show UI.
		if($btn.is('a.addTag')) {
			var ui = $("<div class='tagUI'><input type='text'><a href='#' class='doAddTag default' title='add a tag'>tag it!</a><a href='#' class='cancel' title='cancel'>cancel</a></div>");
			$btn.hide().after(ui);
			ui.find('input').focus();			
			return false;
		}
		
		// cancel tag.
		if($btn.is('div.tagUI a.cancel')) {
			$btn.parents('div.tagUI').hide().prev().show();
			return false;
		}
		
		// add tag.
		if($btn.is('div.tagUI a.doAddTag')) {
			
			var entry = $btn.parents(jqw.api.entry);	
			var newtag = $btn.parents('div.tagUI').find('input').val();
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
		if($btn.is('a.delTag')) {
			
			var entry = $btn.parents(jqw.api.entry);	
			var tag = $btn.parent().attr('href');
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
		var $btn = $(ev.target);
		$btn.trigger('entryLinkClick.jqwiki');
		var name = jqw.entryName($btn.attr('href'));
		jqw.displayEntry(name, {position: 'bottom', sourceElement: $btn});
		$btn.blur();	
		return false;
	});
		
	$(document).trigger('addEventHandlers.jqwiki');	
};
