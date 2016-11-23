$(document).ready(function() {

	$('.email-spam-hide').text(function(i,t){
		return t.replace("[at]","@");
	});
	$('.email-spam-hide').attr("href", function(i,t){
    return 'mailto:'+this.text; 
  });
	
	
	
});