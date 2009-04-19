// Define the animation effect for the tiddler display.
jQuery.fn.tiddlerDisplayAnim = function(options) {
	var defaults = {
		animSrc: null
	};
	var opts = $.extend(defaults, options);
	var ghost = $('<div id=\'ghost\'></div>');
	if(!opts.animSrc) {
		return;
	}
	$('body').append(ghost);
	ghost.css({opacity: '0.3', width: opts.animSrc.width(), height: opts.animSrc.height(), top: opts.animSrc.offset().top, left: opts.animSrc.offset().left} );
	ghost.animate({width: this.width(), height: this.height(), top: this.offset().top, left: this.offset().left} , 500, function() { ghost.remove(); });
};