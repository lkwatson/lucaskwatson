$(document).ready(function() {
	
	$(".feature-hova-cola").hover(
		//the ID of the hovered element is conveniently the same name as the class we want to add to bubbles
	  function() {
		  var classToTog = $(this).attr('id'); 
	    $('.bubble').addClass(classToTog);
	  }, function() {
		  var classToTog = $(this).attr('id'); 
	    $('.bubble').removeClass(classToTog);
	  }
	);
	
	//create the bubblges
	createBubbles = function(n) {
		for(var i = 0; i < n; i++) {
			var bubbleSize = (Math.random() * 20) + 5;
			var depth = -1*(Math.random() * 20) - 1;
			var bubble = 
				$("<div></div>")
					.addClass('bubble')
					.attr({
						'velx': ((Math.random() * 10) + 4) * (Math.random() < 0.5 ? -1 : 1), //random number between -10 and -4, or 4 and 10
						'vely': ((Math.random() * 10) + 4) * (Math.random() < 0.5 ? -1 : 1)
					})
					.css({
						'height': bubbleSize + 'em',
						'width': bubbleSize + 'em',
						
						'z-index': Math.floor(depth),
						'opacity': ( 0.15 ), //varying opacity: ((-1*depth)/150) + .02
											
						'border-radius': bubbleSize + 'em',
						'border-width': (bubbleSize/2 + 1) + 'em',
						
						//'top': Math.random() * 100 + '%',
						//'left': Math.random() * 100 + '%',
						'transform': 'translateX(' + (Math.random() * 100) + 'vw) translateY(' + Math.floor(Math.random() * 100) + 'vh)',
						
						'filter'					: 'blur('+( ((-1*depth)/5) + 2 )+'px)',
						'-webkit-filter' 	: 'blur('+( ((-1*depth)/5) + 2 )+'px)',
					})
			$('#bubbles-back').append(bubble);
		}
		
		animateBubles(); //animate them immediately 
	}
	
	function animateBubles() {
		$('.bubble').each(function() {
			var height = $(window).height();
			var width = $(window).width();
			
			var curPosX = parseFloat($(this).css('transform').split(/[()]/)[1].split(',')[4])*100 / width; //parseFloat( this.style.top  )
			var curPosY = parseFloat($(this).css('transform').split(/[()]/)[1].split(',')[5])*100 / height; //parseFloat( this.style.left )
			var velX 		= parseFloat( $(this).attr('velx') );
			var velY		= parseFloat( $(this).attr('vely') );
			var depth		= $(this).css('z-index');
			
			//console.log((-1*depth/21) + " vX: " + velX + " vY: " + velY + " X: " + curPosX + " Y: " + curPosY);
			
			$(this).css({
				/*
				'top' : curPosX + (velX * 2/(-1*depth)) + '%', //* (-1*depth/21)
				'left': curPosY + (velY * 2/(-1*depth)) + '%',
				*/
				'transform': 'translateX('+(curPosX + (velX * 2/(-1*depth)))+'vw) translateY('+(curPosY + (velY * 2/(-1*depth)))+'vh)',
			});
			
			if(curPosX > 110) {
				$(this).attr('velx',-1*Math.abs(velX));
			}else if(curPosX < -10) {
				$(this).attr('velx',Math.abs(velX));
			}
			
			if(curPosY > 110) {
				$(this).attr('vely',-1*Math.abs(velY));
			}else if(curPosY < -10) {
				$(this).attr('vely',Math.abs(velY));
			}

		});
	}
	
	createBubbles(10); //create bubbles run immediately 
	setInterval(function(){animateBubles()}, 2000); //keep them moving
	
});