
jqw.addEventHandlers = function() {

	$('#controls a').click(function(ev){
		var btn = $(ev.target);
		
		/*
			TODO handle the commands.
		*/
		
		return false;
	});
	
	
	$('#content').dblclick(function(ev) {	
		var $target = $(ev.target);
		if($target.is('div.hentry')) {
			jqw.displayEntry($target.find(jqw.api.title).text(), {position:'replace', template:'EditTemplate'});
		}
	});
	
};
