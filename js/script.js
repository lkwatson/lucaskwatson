$(document).ready(function()
{
  $('img').bind('contextmenu', function(f){
      return false;
  }); 
  $('img').mousedown(function (f) {
	  if(f.button == 2) { 
	    return false; 
	  }
	});
});