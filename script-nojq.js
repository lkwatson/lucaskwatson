/*

if (document.readyState != 'loading'){
  onPageLoad();
} else {
  document.addEventListener('DOMContentLoaded', onPageLoad());
}
*/


$(window).load(function() {
	
	$('.email-spam-hide').text(function(i,t){
		return t.replace("[at]","@");
	});
	$('.email-spam-hide').attr("href", function(i,t){
    return 'mailto:'+this.text; 
  });
	
	$('#skills-content-list').scrollspy({
    target: '#sidebar-nav-skills',
    offset: 100
	});
	
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
		var bubblesBack = document.getElementById('bubbles-back');

		for(var i = 0; i < n; i++) {
			var bubbleSize = (Math.random() * 20) + 5;
			var depth = -1*(Math.random() * 20) - 1;
			var bubble = document.createElement('div');
			//READ ME: YES I KNOW THIS LOOKS BAD. ITS ACTUALLY MORE PERFORMANT THAN USING A FUNCTION/JQUERY.
			bubble.className = 'bubble';
			bubble.setAttribute('velx', ((Math.random() * 10) + 4) * (Math.random() < 0.5 ? -1 : 1) ); //random number between -10 and -4, or 4 and 10
			bubble.setAttribute('vely', ((Math.random() * 10) + 4) * (Math.random() < 0.5 ? -1 : 1) );
			bubble.style.height  = bubbleSize + 'em';
			bubble.style.width 	 = bubbleSize + 'em';
			bubble.style.zIndex  = Math.floor(depth);
			bubble.style.opacity = ( 0.15 );
			bubble.style.borderRadius = bubbleSize + 'em';
			bubble.style.borderWidth  = (bubbleSize/2 + 1) + 'em';
			bubble.style.top  = 0;
			bubble.style.left = 0;
			
			bubble.style.transform = 'translate3d(' + (Math.random() * 100) + 'vw,' + (Math.random() * 100) + 'vh,0)';

			bubble.style.filter = 'blur('+( ((-1*depth)/5) + 2 )+'px)';
			bubble.style["-webkit-filter"] = 'blur('+( ((-1*depth)/5) + 2 )+'px)';
			
			bubblesBack.appendChild(bubble);
		}
		
		animateBubles(0,0); //animate them immediately 
	}
	
	animateBubles = function(offsetX, offsetY) {
		var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		
		var elements = document.querySelectorAll('.bubble');
		Array.prototype.forEach.call(elements, function(el, i){
			
			var curPosX = parseFloat( el.style.transform.split(/[(,)]/)[1] );
			var curPosY = parseFloat( el.style.transform.split(/[(,)]/)[2] );
			var velX 		= parseFloat( el.getAttribute('velx') );
			var velY		= parseFloat( el.getAttribute('vely') );
			var depth		= el.style.zIndex;
			
			var plax		= 2/(-1*depth);
			
			//console.log((-1*depth/21) + " vX: " + velX + " vY: " + velY + " X: " + curPosX + " Y: " + curPosY);
			
			el.style.transform = 'translate3d(' + (curPosX + (velX * plax)) + 'vw,' + (curPosY + (velY * plax)) + 'vh,0)';
			
			//TODO make this DRY
			//Switch directions if we get outside of the screen
			if(curPosX > 110) {
				el.setAttribute('velx',-1*Math.abs(velX));
			}else if(curPosX < -10) {
				el.setAttribute('velx',Math.abs(velX));
			}
			
			if(curPosY > 130) {
				el.setAttribute('vely',-1*Math.abs(velY));
			}else if(curPosY < -10) {
				el.setAttribute('vely',Math.abs(velY));
			}

		});
	}
	
	topOffsetBubbles = function(offsetY) {
		var elements = document.querySelectorAll('.bubble');
		Array.prototype.forEach.call(elements, function(el, i){
			var depth		= el.style.zIndex;
			var plax		= 2/(-1*depth);
			
			el.style.top = (offsetY*plax) + 'vh';
		});
	}
/*
	
	//var prevScrollPos;
	$(window).scroll(function() {
	  var winScroll = $(window).scrollTop();
	  //var neg = (winScroll < prevScrollPos ? 1 : -1);
	  //prevScrollPos = winScroll;
	  console.log(winScroll);
	  topOffsetBubbles(winScroll/10);
	});
*/
	
	createBubbles(12); //create bubbles run immediately 
	setInterval(function(){animateBubles(0,0)}, 2000); //keep them moving
	
	setInterval(function(){
	  var winScroll = window.pageYOffset;
	  topOffsetBubbles(winScroll/-5);

	  if(winScroll > 100) {
	  	var nav = document.getElementById('main-navbar');
	  	nav.style.backgroundColor = 'rgba(255,255,255,0.8)';
	  }
	}, 100);
	
});