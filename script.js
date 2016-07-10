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
	
	//create the bubbles
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
						
						'top': 0,//Math.random() * 100 + '%',
						'left': 0,//Math.random() * 100 + '%',
						//translateZ fixes a flickering bug in some browsers
						//'transform': 'translateX(' + (Math.random() * 100) + 'vw) translateY(' + (Math.random() * 100) + 'vh) translateZ(0)',
						'transform': 'translate3d(' + (Math.random() * 100) + 'vw,' + (Math.random() * 100) + 'vh,0)',
						
						'filter'					: 'blur('+( ((-1*depth)/5) + 2 )+'px)',
						'-webkit-filter' 	: 'blur('+( ((-1*depth)/5) + 2 )+'px)',
					})
			$('#bubbles-back').append(bubble);
		}
		
		animateBubles(0,0); //animate them immediately 
	}
	
	animateBubles = function(offsetX, offsetY) {
		$('.bubble').each(function() {
			var height = $(window).height();
			var width = $(window).width();
			
			//console.time('parsing');
			var elmTop  = parseFloat( this.style.top );
			var elmLeft = parseFloat( this.style.left );
			var curPosX = parseFloat( $(this).css('transform').split(/[()]/)[1].split(',')[4] )*100 / width; //parseFloat( this.style.top  )
			var curPosY = parseFloat( $(this).css('transform').split(/[()]/)[1].split(',')[5] )*100 / height; //parseFloat( this.style.left )
			var velX 		= parseFloat( $(this).attr('velx') );
			var velY		= parseFloat( $(this).attr('vely') );
			var depth		= $(this).css('z-index');
			
			var plax		= 2/(-1*depth);
			
			//console.log((-1*depth/21) + " vX: " + velX + " vY: " + velY + " X: " + curPosX + " Y: " + curPosY);
			
			
			$(this).css({
				/*
				'top' : curPosX + (velX * 2/(-1*depth)) + '%', //* (-1*depth/21)
				'left': curPosY + (velY * 2/(-1*depth)) + '%',
				*/
				//'transform': 'translateX('+(curPosX + (velX * 2/(-1*depth)))+'vw) translateY('+(curPosY + (velY * 2/(-1*depth)))+'vh) translateZ(0)',
				'transform': 'translate3d(' + (curPosX + (velX * plax)) + 'vw,' + (curPosY + (velY * plax)) + 'vh,0)',
				'top' : (offsetY*plax) + 'vh', //elmTop+
				'left': (offsetX*plax) + 'vw', //elmLeft+
			});
			
			//TODO make this DRY
			//Switch directions if we get outside of the screen
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
			
			//if the bubble is out of view, move it
			/*
if(elmTop > 130) {
				$(this).css('top',-30);
			}
			if(elmTop < -30) {
				$(this).css('top',130);
			}
*/
			
			//console.timeEnd('parsing');

		});
	}
	//var prevScrollPos;
	$(window).scroll(function() {
	  var winScroll = $(window).scrollTop();
	  //var neg = (winScroll < prevScrollPos ? 1 : -1);
	  //prevScrollPos = winScroll;
	  console.log(winScroll);
	  animateBubles(0,winScroll/10);
	});
	
	createBubbles(15); //create bubbles run immediately 
	setInterval(function(){animateBubles(0,0)}, 2000); //keep them moving
	
});