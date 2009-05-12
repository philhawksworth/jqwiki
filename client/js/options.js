jqw.gatherOptions = function(){

	$('div.options:not(#store div) input').each(function() {
		var opt = $(this).attr('id');
		jqw.options[opt] = $(this).val();
	});

	
};