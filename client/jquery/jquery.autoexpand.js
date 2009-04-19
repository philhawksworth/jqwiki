// jQuery.autoExpand Textarea (1.0)
// Sebastian Geidies (geidies@gmail.com)
// 
// Use and distibution is allowed under the terms & conditions of the GPL (http://www.gnu.org/licenses/gpl.html).
// This script requires jQuery to work. Download jQuery at http://jquery.com

(function($){
  $.fn.autoExpand = function(minheight){
    var minheight = minheight && !isNaN(parseInt(minheight, 10)) ? minheight : 120;
    var self = $(this);
    self.each(function(){
      var i = $(".autoexpand_clone").length;
      var obj = $(this);
      var lineheight = $("<p/>").width(obj.width()).appendTo("body").attr("id", "autoexpand_clone_"+i.toString(10) ).addClass("autoexpand_clone")
      .css({"position":"absolute",
          "left": (-1*obj.width())+"px",
          "top": "0px",
          "line-height": obj.css("line-height"),
          "font-size": obj.css("font-size"),
          "font-family": obj.css("font-family"),
          "overflow":"visible" }).html("Ayg<br>").height() + 2;
       $("#autoexpand_clone_" + i.toString(10) ).css("line-height", lineheight + "px");
       var expand = function(){
         var h = $("#autoexpand_clone_" + i.toString(10) ).html( obj.val().replace(/\n/g,"<br/>") ).height() + lineheight;
         obj.animate( {"height": h > minheight ? h : minheight } ,80 );
      };
      expand();
      obj.keyup(function(){
        expand();
      });
    });
    return self;
  };
})(jQuery);