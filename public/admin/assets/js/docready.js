var ww = $(window).width();
var wh = $(window).height();
var prevhref = document.location.pathname;
var ssint = false;
var buildinglb = false;
var navigation;

var istouchdevice = false;
if (is_touch_device()){
	istouchdevice = true;
}



//CSS BREAKPOINTS
var breakpoint1 = 600;
var breakpoint2 = 768;
var breakpoint3 = 1024;
var breakpoint4 = 1440;
var breakpoint5 = 1760;

var navibreakpoint = breakpoint2;




function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 50, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){};
  
	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0];
		swipedir = 'none';
		dist = 0;
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime(); // record time when finger first makes contact with surface
		//e.preventDefault();
	}, false);
  
	touchsurface.addEventListener('touchmove', function(e){
		e.preventDefault(); // prevent scrolling when inside DIV
	}, false);
  
    touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime; // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for swipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
				swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
				swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
			} else {
				if (startX > (ww/2)){
					swipedir = 'left';
				} else {
					swipedir = 'right';
				}
			}
		}
		handleswipe(swipedir);
	}, false);
}





// NAVIGATION PLUGIN
;(function($,document,window) {
	(function(pluginName){
		var defaults = {
			speedExpand: 150,
			speedCollapse: 120,
			naviconiconclosed: "<i class='ss ss-navicon'></i>",
			naviconiconopen: "<i class='ss ss-times'></i>",
			coverContent: true,
			
			testFor: function(div) {
				return true;
			},
			selected: function(index, item) {

			} // callback for selected item
		};
		$.fn[pluginName] = function(options) {
			options = $.extend(true, {}, defaults, options);

			//this.each(function(i) {
				var select = this,
					header = $(select);

				if (options.testFor(select) && !header.hasClass(pluginName)) {

					//methods
					select = {
						logo: header.find(".logo"),
						navicon: header.find(".navicon"),
						mainnavi: header.find("#mainnavi"),
						
						expandNavi: function(){
							if (!select.mainnaviIsVisible()){
								setTimeout(function(){
									select.mainnavi.addClass("expanded");									
								}, 100);

								//mainnavi.velocity("slideDown", options.speedExpand);
								select.navicon.html(options.naviconiconopen);		
								if (options.coverContent){
									$("#overlay").addClass("visible");
								}
								
								//header.unbind( "touchend" );
								
							}
						},
						collapseNavi: function(){
							if (select.mainnaviIsVisible()){
								select.navicon.html(options.naviconiconclosed);
								setTimeout(function(){
									select.mainnavi.removeClass("expanded");
									$("#overlay").removeClass("visible");
								}, 300);
							}
						},
						toggleNavi: function(){
							if (select.mainnaviIsVisible()){
								select.collapseNavi();
							} else {
								select.expandNavi();
							}
						},
						mainnaviIsVisible: function(){
							return (select.mainnavi.hasClass("expanded")) ? true : false;
						}
						
					}

					


/*
					logo.on({
						click: function(e){
							e.preventDefault();
							toggleNavi();
						}
					});
*/



					swipedetect(header[0], function(swipedir){
						if (swipedir == 'up'){
							//alert("up");
							select.collapseNavi();
							e.preventDefault();
						}
					});


					

					header.on({
					    'mouseenter': function(){
							select.expandNavi();  
						},
						'touchend': function(){
							if (!select.mainnavi.hasClass("expanded")){
								console.log("touchend");
								select.expandNavi();
								e.preventDefault();
								e.stopPropagation();
							}
						},
						mouseleave: function(){
							select.collapseNavi();
						}
					});

					$(window).on({
						load: function(){
						
						},
						resize: function(){
 							select.collapseNavi();
						},
						keydown: function(e){
							//var keys = e.which;
							//if(keys == 48) {
							//}
						}
					});
				}
				
				return select;
				
			//});
		};
		$.fn[pluginName].defaults = defaults;
	})("navigation");
})(jQuery,document,window);






function indexRowHover(){

 	$(".notouch .indextable .row").mouseover( function(e) { 	
		var trow = $(this);
		var tthumb = trow.find(".thumb");
		var otherthumbs = $(".notouch .indextable .row .thumb").not(tthumb);		
		var mouseY = e.clientY + 15;
		var mouseX = e.clientX + 15;
		
		otherthumbs.velocity("stop").velocity("fadeOut",{duration: 80});
		
		if (!tthumb.is(":visible")) {
			tthumb.css({
	            top: mouseY,
	            left: mouseX
	        }).velocity("stop").velocity("fadeIn",{duration: 80, display: "block"});
		}				
						
	 	$(".notouch .indextable .row").on("mousemove", function(e) {
		 						 			 	
			var trow = $(this);
			var tthumb = trow.find(".thumb");				
			var mouseY = e.clientY + 15;
			var mouseX = e.clientX + 15;
													
			tthumb.css({
	            top: mouseY,
	            left: mouseX
	        });
		        	 	
	 	});					
						
 	});
 	
 	$(".notouch .indextable .row").mouseleave( function(e) {
	 	
		var trow = $(this);
		var tthumb = trow.find(".thumb");				 	
	 	
	 	if (tthumb.is(":visible")) {
	 		tthumb.velocity("stop").velocity("fadeOut",{duration: 80});
	 	}
		
 	});	 	

}	















//header
var didScroll;
var lastScrollTop = 0;
var delta = 10;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > $('header').outerHeight()){
        // Scroll Down
        $('header').removeClass('insight').addClass('outasight');
       // hideSubnavi();
    } else {
        // Scroll Up
	        $('header').removeClass('outasight').addClass('insight');

/*
        
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('outasight').addClass('insight');
        }
*/
    }
    
    lastScrollTop = st;
}

function hideSubnavi(){
	if (ww > 767){
		$("#mainnavi li ul").fadeOut(100);
		$("header").removeClass("subopen");
		$("header").velocity({height:45},120);
	}
}

function showSubnavi(){
	if (ww > 767){
		$("header").addClass("subopen");
		$("header").velocity({height:100},120);
	}
}




function filterDropdown(){
	$("body").on("vclick", ".filter li a", function(e) {
		e.preventDefault();
		e.stopPropagation();
		var tl = $(this);
		var li = tl.closest("li");
		var filter = li.closest(".filter");
		if (li.hasClass("selected")){
			if (ww < breakpoint2){
				if (filter.hasClass("expanded")){
					filter.find("li").not(li).velocity("slideUp",200);
					filter.removeClass("expanded");
				} else {
					filter.find("li").not(li).velocity("slideDown",200);
					filter.addClass("expanded");
				}
			}
		} else {
			filter.find("li").not(li).velocity("slideUp",200);
			var href = tl.attr("href");
			prepareLoadContent(href);
		}
	});
}

function resetFilter(){
	$(".filter").removeClass("expanded").find("li").removeAttr("style");
}



function prepareLoadContent(href){
	var currhref = window.location.pathname;//current url
	var currtitle = document.title;
	
	if (href!=currhref) {
		var currentscroll = $(document).scrollTop();
		history.replaceState({url: currhref, scroll: currentscroll}, currtitle, currhref);
		
		var state = {url: href, scroll: 0};
		history.pushState(state, currtitle, href);
		loadContent(href,0);		
	}	
}



function expandSection(){
	$("body").on("vclick", ".sectiontitle", function(e) {
		var title = $(this);
		var section = title.closest("section");
		section.toggleClass("expanded");
	});
}

function projectNavi(){
	$("body").on("vclick", ".projectnavi .sectiontitle", function(e) {
		var title = $(this);
		var othertitles = $(".projectnavi .sectiontitle").not(title);
		var sectionkey = title.data("section");
		var section = $(".project section.sec_"+sectionkey);
		var othersections = $(".project section").not(section);
		section.addClass("active");
		othersections.removeClass("active");
		title.addClass("selected");
		othertitles.removeClass("selected");
		setTimeout(function(){
			section.find('.slideshow').each(function(){
				var ss = $(this);
				resizeSlideshow(ss);
			});
		},50);
	});
}






/* !DOCUMENT READY -------------------------- */
$(document).ready(function() {


	if (istouchdevice){
		$("html").addClass("touch");
	} else {
		$("html").addClass("notouch");
	}


	resizeSite();
	positionSelected(true);
	positionNormalThumbs(true);
 	$(window).resize(function() {
	 	resizeSite();
	 	positionSelected(false);
		positionNormalThumbs(false);
	});
 	
 	if ($("#map_canvas").length){
 		showProjectPreview(prevhref);
 	}
 	
 	if ($(".indextable").length){
 		indexRowHover();
 	}
 	
 	
 	$("body").on("vclick", "a.logo", function(e) {
 		if (ww < 1024 && !$("#mainnavi").hasClass("expanded")){
			e.preventDefault();
			return;
		}

 		window.location = $(this).attr("href");
 		e.preventDefault();
		e.stopPropagation();
 	});
 	
 	
 	
 	// !ajax caller
    $("body").on("vclick", "a.local", function(e) {
		if (e.metaKey || e.ctrlKey) return;//ignore the click handler if ctrl-clicked/command-clicked
		
		var thislink = $(this);		
		
		if (ww < 1024 && thislink.closest("#mainnavi").length && !$("#mainnavi").hasClass("expanded")){
			e.preventDefault();
			return;
		}
		
		//$("#mainnavi").removeClass("expanded");
		
		e.preventDefault();
		e.stopPropagation();
		var href = thislink.attr("href");//link url
		prepareLoadContent(href);
	});

 	
 	

 	navigation = $("header").navigation();
	
	$("body").on("vclick", "#overlay", function(e) {
		navigation.collapseNavi();
		e.preventDefault();
		e.stopPropagation();
	});
	
	
/*
	window.addEventListener('popstate', function(e) {
		loadContent(e.state.url);
	});
*/
	
	window.addEventListener('popstate', function(e) {
		loadContent(e.state.url, e.state.scroll);
	});
	
	history.replaceState({url: document.location.pathname, scroll: 0}, document.title, document.location.pathname);
	
	
	

 	filterDropdown();
 	makeLocalLinks();
 	projectNavi();
 	
 	
 	$("video,audio").each(function(){
		var media = $(this);
		initMediaPlayer(media);	
	});
	
	$("body").on("vclick", ".mediacontrol", function(e) {
		e.preventDefault();
		var tl = $(this);
		var wrap = tl.closest(".playerwrap");
		var video = wrap.find("video, audio");
		if (tl.hasClass("play")){
		    if(video[0].paused) {
		        video[0].play();
		    } else {
		        video[0].pause();
		    }
		} else if (tl.hasClass("fullscreen")){
			video[0].webkitEnterFullscreen();
		} else if (tl.hasClass("mute")){
			if (video[0].muted){
				video[0].muted = false;
				tl.find("i").removeClass("ss-volume-off").addClass("ss-volume-up");
			} else {
				video[0].muted = true;
				tl.find("i").removeClass("ss-volume-up").addClass("ss-volume-off");
			}			
		}
	});
 	

	
		
	
	
	
	
 	
 	//FastClick.attach(document.body);
 	//makeSubscribeForm();
 	makeSearchForm();
 	tableSorting();
 	initSlideshows();
  	slideshowButtons();
 	startAutoSlideshow();
 	expandSection();
 	lightbox();
 	imgPopup();
 	refImages();
 	
});//END DOCREADY



/* !NAVIGATION ------------------------------------- */

function makeLocalLinks(){
	var siteURL = "http://" + top.location.host.toString();
 	var internallinks = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']")
 						.not(".lb, .download, .filter li a, .langswitch, .sort, .logo");
 	internallinks.addClass("local");
}



/*
function initNaviButtons(){
	$("body").on("click", ".open-menu", function(e) {
		e.preventDefault();
		toggleNavi();
	});
	$("body").on("click", ".logo", function(e) {
		e.preventDefault();
		toggleNavi();
	});




}
*/













/* !GET PAGE / LOAD CONTENT ------------------------------------- */


function explodeUrl(url){
	if (url[0] != "/") {
		url = "/"+url;
	}
	var l =  url.split("/");
	if (typeof l[2] == 'undefined'){l[2]="";}
	if (typeof l[3] == 'undefined'){l[3]="";}
	if (typeof l[4] == 'undefined'){l[4]="";}
	if (typeof l[5] == 'undefined'){l[5]="";}
	return l;
}


function loadContent(href,scroll) {
		
	var l =  explodeUrl(href);
	var pl =  explodeUrl(prevhref);
	
	if (l[2] == ""){
		$("body").addClass("homeboy");
	} else {
		$("body").removeClass("homeboy");
	}
	
	
	resetSearchForm();	
	navigation.collapseNavi();
	$('.include').contents().fadeOut(300);
	
	$.ajax({
		cache: false,
	    type: "GET",
	    url: "/php/getpage.php",
	    dataType: 'json',
		data: "ajax=1&href="+href+"&prevhref="+prevhref,
		success: function(resultdata) {
			if (resultdata.result == 1){
				$("#mainnavi").html(resultdata.navi);
				
				$('.include').html(resultdata.markup).velocity({opacity: 1}, { duration: 300 });
				document.title = resultdata.pagetitle;
				if ($("#map_canvas").length) {
					initialize();
					showProjectPreview(href);
				}
				resizeSite();
				
				positionSelected(true);
				positionNormalThumbs(true);
				
				makeLocalLinks();
				refImages();
				makeSearchForm();
				initSlideshows();
				if ($(".indextable").length){
			 		indexRowHover();
			 	}
				$(document).scrollTop(scroll);
				$("video,audio").each(function(){
					var media = $(this);
					initMediaPlayer(media);	
				});
			}
		},
	   	error: function(resultdata) {		   	
	   		$("body").removeClass().addClass("error");
		   	$(".include").velocity({opacity: 0}, {
			   	duration: 240,
			   	complete: function() {	
				   	$('.include').html("<div class='paa'>404</p>"+JSON.stringify(resultdata)).stop().velocity({opacity: 1}, 240);
				}
			});
		}
	});
    	
	prevhref = document.location.pathname;

}





/* !GOOGLE ANALYTICS FUNCTIONS ------------------------------------- */

function GaTrackURL(title,url){
	if (GA_TRACKING_ID){
		gtag('config', GA_TRACKING_ID, {
		  'page_title' : title,
		  'page_path': url
		});
	}
}


function GaTrackEvent(action,category,label,value){
	if (GA_TRACKING_ID){
		gtag('event', action, {
			'event_category': category,
			'event_label': label,
			'value': value
		});
	}
}






/* !VIDEO MEDIA PLAYER ------------------------------------- */

function initMediaPlayer(video,autoplay){

	if (video.hasClass("initialized")){
		return;
	}

	video.addClass("initialized");
	var wrap = video.closest(".playerwrap");
	var playbtn = wrap.find(".play").not(".onvideo");
	var playbtnonvid = wrap.find(".play.onvideo");
	var fsbtn = wrap.find(".fullscreen");
	
	var progressbar = wrap.find('.progressbar');
	var timebar = progressbar.find('.timebar');
	var bufferbar = progressbar.find('.bufferbar');
	
	var controls = wrap.find('.controls');
	var tottime = controls.find('.duration');
	var elapsedtime = controls.find('.elapsedtime')
	
	var c;
	
	if (autoplay){
		video[0].play();      
	}
		
    //get HTML5 video time duration
	video.on('loadedmetadata', function() {	    
	    tottime.text(convertTime(video[0].duration));
	});
	 
	//update HTML5 video current play time
	video.on('timeupdate', function() {
	    var currentPos = video[0].currentTime; //Get currenttime
	    var maxduration = video[0].duration; //Get video duration
	    var percentage = 100 * currentPos / maxduration; //in %
	    elapsedtime.text(convertTime(currentPos));
	    timebar.css('width', percentage+'%');
	});


	var convertTime = function(time) {
		var minutes = Math.floor(time / 60);
		time = time-(minutes*60);
		var seconds = pad(Math.floor(time),2);
		return minutes+":"+seconds;
	};


	var timeDrag = false;   /* Drag status */
	progressbar.bind("touchstart mousedown",function(e) {
	    timeDrag = true;			    
	    if (typeof e.pageX == "undefined"){
		    var xPos = e.originalEvent.touches[0].pageX;
	    } else {
		    var xPos = e.pageX;
	    }
	    updatebar(xPos);
	});
	$(document).bind("touchend mouseup", function(e) {
	    if(timeDrag) {
	        timeDrag = false;
		    if (typeof e.pageX == "undefined"){
			    var xPos = e.originalEvent.changedTouches[0].pageX;
		    } else {
			    var xPos = e.pageX;
		    }
	        updatebar(xPos);
	    }
	});
	$(document).bind("touchmove mousemove", function(e) {
	    if(timeDrag) {
		    if (typeof e.pageX == "undefined"){
			    var xPos = e.originalEvent.touches[0].pageX;
		    } else {
			    var xPos = e.pageX;
		    }
	        updatebar(xPos);
	    }
	});

	//update Progress Bar control
	var updatebar = function(x) {
	    var maxduration = video[0].duration; //Video duraiton
	    var position = x - progressbar.offset().left; //Click pos
	    var percentage = 100 * position / progressbar.width();
	 
	    //Check within range
	    if(percentage > 100) {
	        percentage = 100;
	    }
	    if(percentage < 0) {
	        percentage = 0;
	    }
	 
	    //Update progress bar and video currenttime
	    timebar.css('width', percentage+'%');
	    video[0].currentTime = maxduration * percentage / 100;
	};
	
	
	var startBuffer = function() {
	    var maxduration = video[0].duration;
	    var currentBuffer = video[0].buffered.end(0);
	    var percentage = 100 * currentBuffer / maxduration;
	    bufferbar.css('width', percentage+'%');
	 
	    if(currentBuffer < maxduration) {
	        setTimeout(startBuffer, 500);
	    }
	};
	
	
	
	
	var startControlsHiding = function(){
	    $(document).on('mousemove',function() {        
	       controls.velocity("stop").velocity({opacity:1},200);
	       progressbar.velocity("stop").velocity({opacity:1},200);
	       clearTimeout(c);
	       c = setTimeout(function(){
	           controls.velocity("stop").velocity({opacity:0},600);
	           progressbar.velocity("stop").velocity({opacity:0},600);
	       }, 2600);
	    });		
	};
	
	var stopControlsHiding = function(){
		clearTimeout(c);
		controls.velocity("stop").velocity({opacity:1},200);
	    progressbar.velocity("stop").velocity({opacity:1},200);
	};
	
	
	
	video.on('play', function() {
		tottime.text(convertTime(video[0].duration));
		playbtn.find(".ss").removeClass("ss-play").addClass("ss-pause");
		playbtnonvid.velocity("stop").velocity({opacity:0},400);
		if (!istouchdevice){
			startControlsHiding();
		}
		setTimeout(startBuffer, 500);
	});
	
	video.on('pause', function() {
		playbtn.find(".ss").removeClass("ss-pause").addClass("ss-play");
		playbtnonvid.velocity("stop").velocity({opacity:1},400);
		stopControlsHiding();
	});
	
	
	video.on('ended', function() {
		playbtn.find(".ss").removeClass("ss-pause").addClass("ss-play");
		video[0].load();
		timebar.css('width', '0%');
		elapsedtime.text("00:00");
	});
	

	video[0].addEventListener('webkitendfullscreen', function(){
		StatusBar.overlaysWebView(true);
		setTimeout(function(){
			StatusBar.overlaysWebView(false);
		}, 1);				
	}, false);

}






/* !SLIDESHOW ------------------------------------- */



function initSlideshows(){
	$(".slideshow").not(".initialized").each(function(){
		var ss = $(this);
		ss.addClass("initialized");
		slideshowMobileControls(ss);
	});
}





function slideshowButtons(){
	$("body").on("vclick",".ssnavi",function(e){		
		e.stopPropagation();
		e.preventDefault();
		var tl = $(this);
		var key = false;
		var ss = tl.closest(".slideshow");
		if (ss.hasClass("running")){
			clearInterval(ssint);
			ss.removeClass("running");
		}
		var direction = "next";
		if ($(this).hasClass('prev')){
			direction = "prev";
		} else if ($(this).hasClass('key')){
			direction = "key";
			key = $(this).classData("i");
		}
		slideshowMove(ss,direction,key);
	});
	
	$(document).keydown(function(e) {
		if (e.which == 37 && !e.metaKey) {
			e.preventDefault();
			$(".slideshow").find(".ssnavi.prev").click();
		} else if (e.which == 39 && !e.metaKey){
			e.preventDefault();
			$(".slideshow").find(".ssnavi.next").click();
		}
	});
}



function slideshowMobileControls(ss) {	
	var el = ss[0];
	swipedetect(el, function(swipedir){
		var moveslideshow = false;
		var direction;
		if (swipedir =='left' || swipedir == 'up'){
			direction = "next";
			moveslideshow = true;
		} else if (swipedir == 'right'){
			direction = "prev";
			moveslideshow = true;
		}	
		if (moveslideshow){
			ss.find(".ssnavi."+direction).click();
		}
	});
}	


function slideshowMove(ss,direction,key) {

	var slidespeed = 350;
	var easing = "easeInOutCirc";
	var slides = ss.find('.slide');
	var ic = ss.find('.ic');
	var domove = true;

	var effect = ss.data("effect");
	if (!effect){
		effect = "slide";
	}
	
	var slidespeed = ss.data("speed");
	if (!slidespeed){
		slidespeed = 400;
	}
	
	
	
	var slides = ss.find('.slide');
	var ic = ss.find('.ic');
	var sw = ss.width();
	var ssi = ss.find(".inner");
	var ssiw = ssi.width();

	slide = ss.find(".activeslide");	
	caption = ss.find(".captiontext");
	
	
	var domove = true;	
		
		
	if (direction == 'key') {
		nextslide = slides.eq(key);
		if (!nextslide.length) {
			nextslide = slide;
		}
		direction = "next";
	} else {
		if (direction == 'prev') {
			if (ss.closest(".content").hasClass("showingrelated")){
				ss.closest(".content").removeClass("showingrelated")
				domove = false;
			}
			
			nextslide = slide.prev(".slide");
			if (!nextslide.length) {
				nextslide = slides.last();
			}
		} else {
			nextslide = slide.next(".slide");
			if (!nextslide.length) {
				if (ww > 1024 && $(".afterslideshow").length){
					ss.closest(".content").addClass("showingrelated");
					domove = false;
				} else {
					nextslide = slides.first();
				}
			}
		}
	}	
	
	
	
	if (domove){
		
		slide.removeClass("activeslide");
		
		
		//TRANSITION
	
		if (effect == "slide"){
		
			if (direction == "next"){
				slide.addClass("slide-out-to-left").removeClass("activeslide slide-in-from-left slide-in-from-right");
				nextslide.addClass("activeslide slide-in-from-right").removeClass("slide-out-to-left slide-out-to-right");	
			} else if (direction == "prev"){
				slide.addClass("slide-out-to-right").removeClass("activeslide slide-in-from-left slide-in-from-right");
				nextslide.addClass("activeslide slide-in-from-left").removeClass("slide-out-to-left slide-out-to-right");
			}
		
		} else if (effect == "fade"){
			
			slide.addClass("slide-fade-out").removeClass("activeslide slide-fade-in");
			nextslide.addClass("slide-fade-in activeslide").removeClass("slide-fade-out");
			
		}
			
		
	
		
		var nextcaption = nextslide.find('.hiddencap').html();
	
		//stop all videos	
		slide.find("video").each(function(){
			var vid = $(this);
			vid[0].pause();
			
		});
		
		caption.html(nextcaption);
	
		var ai = nextslide.index() + 1;
		ic.text(ai);
		//ic.text(pad(ai,2));
	}
}


function startAutoSlideshow(){
	clearInterval(ssint);
	$(".slideshow.auto").each(function(){
		var ss = $(this);
		if (!ss.hasClass("running")){
			var interval = ss.data("autointerval");
			ss.addClass("running");	
			ssint = setInterval(function(){
				slideshowMove(ss,"next");
			}, interval);
		}
	});
}


function resizeSlideshow(ss){
	//SLIDESHOW

	var imgofft = 0;
	var imgoffb = 0;
	var imgoffs = 0;
	var captionheight = 0;

	var ssi = ss.find(".inner");
	var slides = ssi.find(".slide");

	var ssw = ss.width();
	
	if (ww < 1024 || !ss.hasClass("proj")){
		var ssr = ssi.data("ratio");
		var ssh = ssw/ssr;
	} else {
		var ssh = wh - 60 - 28;
		ssr = ssw/ssh;
		var captionheight = 28;
	}
	
	
	
	
	if (ssh > wh-captionheight){
		ssh = wh-captionheight;
	}
	ssi.css({height:ssh});

	slides.each(function(){
		var slide = $(this);
		var ir = slide.data("ratio");
		
		var sh = ssh;
		var sw = sh * ir;
		
		if (ss.hasClass("fullbleed")){
			if (sw < ssw){
				sw = ssw;
				sh = sw/ir;
			}
		} else if (sw > ssw){
			sw = ssw;
			sh = sw/ir;
		}

		var l = (ssw-sw)/2;
		var t = (ssh-sh)/2;
		slide.css({width:sw+"px",height:sh+"px",top:t+"px",left:l+"px"});
		
	});
	
	
	videoslides = ssi.find(".slide.video");
	videoslides.each(function(){
		var slide = $(this);
		
		var pw = slide.find(".playerwrap");
		
		if (ww < 1024){
			pw.removeAttr("style");
			
		} else {
			var pwr = pw.data("ratio");
			var npww = ssw * 0.8;
			var npwh = npww / pwr;
			
			
			if (npwh > (ssh-30)){
				npwh = ssh - 30;
				npww = npwh * pwr;
			}
			
			npwh = npwh + 30;			
			pw.css({width:npww+"px", height:npwh+"px"});
		}
	});
	
	

}




function refImages(){
	$(".notouch body").on("mouseover",".reflink",function(e){
		e.preventDefault();
		var tl = $(this);
		refImagesAction(tl,"show");
	});
	$(".notouch body").on("mouseout",".reflink",function(e){
		e.preventDefault();
		var tl = $(this);
		refImagesAction(tl,"hide");
	});
	
	$(".touch body").on("vclick",".reflink",function(e){
		e.preventDefault();
		var tl = $(this);
		refImagesAction(tl,"show");
	});
}




function refImagesAction(tl,type="show"){
		
	var section = tl.closest("section");
	var refid = tl.data("id");
	
	if (ww < 768){
		var refimg = section.find(".reference.ref_"+refid+" img");
		var imgsrc = refimg.attr("src");
		var imgr = refimg.data("ratio");
		var caption = "";
		
		lbConstructor(imgsrc,imgr,caption);
		
	} else {
		if (type == "show"){
			var refimg = section.find(".reference.ref_"+refid);
		} else {
			var refimg = section.find(".reference").first();
		}
		
		var otherrefs = section.find(".reference").not(refimg);
		refimg.fadeIn(300);
		otherrefs.fadeOut(300);
	}
}




function lbConstructor(imgsrc,imgr,caption){
	
	if (buildinglb) return
	
	buildinglb = true;
	
	var lb  = "<div class='dn pntr' id='lightbox'>";
		lb += "<div class='content'>";
		if (typeof(imgsrc) != "undefined"){
			lb += "<img data-ratio='"+imgr+"' src='"+imgsrc+"' />";	
		}
		if (typeof(caption) != "undefined"){
			lb += "<div class='caption'>"+caption+"</div>";
		}
		lb += "</div>";
		lb += "</div>";

	$('body').css("overflow","hidden");

	$(lb).appendTo("body").velocity("fadeIn",{duration:500, complete: function(){	
		var closer = $("#lightbox");
		closer.click(function(e){
			e.preventDefault();
			var tl = $(this);
				$("#lightbox").velocity("fadeOut",500,function(){
					$(this).remove();
					buildinglb = false;
					$('body').css("overflow","auto");
				});
			});			
		}
	});

	setTimeout(function(){
		//initSlideshows();
		resizeSite();			
	},150);
	
	
}






function imgPopup(){
	$(".touch body").on("vclick",".imgpopup",function(e){
		e.preventDefault();
		var tl = $(this);
		imgPopupAction(tl)
	});
	
	$(".notouch body").on("mouseover",".imgpopup",function(e){
		e.preventDefault();
		var tl = $(this);
		imgPopupAction(tl);
	});
}


function imgPopupAction(tl){
	var imgsrc = tl.data("imgsrc");
	var imgr = tl.data("ratio");
	var caption = tl.nextAll(".pressinfo").first().html();
	var pressimg = $(".pressimg");
	
	if (ww < 768){
		lbConstructor(imgsrc,imgr,caption);
	} else {
		if (imgsrc){
			var lb = "<img data-ratio='"+imgr+"' src='"+imgsrc+"' />";
			lb += caption;
		} else if (caption){
			lb = caption;
		} else {
			var lb = "";
		}
		pressimg.html(lb);
		
	}
}






function lightbox() {
	$("body").on("vclick",".lb",function(e){
		e.preventDefault();
		var tl = $(this);

		var tkey = tl.data("ssi") - 1;
		var tkey = 1;
	
		$('body').css("overflow","hidden");
		var images = $("a.lb");
		var imgnum = images.length;
		var pntr = (imgnum < 2) ? " pntr" : "";
		var ssclass = (tl.data("ssclass")) ? tl.data("ssclass") : "librarylb";
		var lightboxcontent = "<div class='dn"+pntr+"' id='lightbox'><div class='slideshow librarylb' data-speedin='120' data-speedout='120' data-effect='fade'><div class='inner'>";
		var as, firstcaption, firstpullquote;
		var ask = 1;
		var i = 0;
		var flip = "";
		var capleft = "";
		images.each(function(){
			var thislink = $(this);
			//var thisslide = thislink.closest(".slide");
			var k = thislink.data("key");
			var img = thislink.find("img");
			var img1 = img.first();
			var img2 = img.eq(1);
			if (img2.length){
				var imgpair = true;	
			} else {
				var imgpair = false;	
			}
			
			var bigimg1 = img1.data("bigimg");
			var imgr1 = img1.data("ratio");
			var imgr = imgr1;
			
			if (imgpair){
				var bigimg2 = img2.data("bigimg");
				var imgr2 = img2.data("ratio");
				imgr = imgr1 + imgr2;
			}
			
			
			
			var position = thislink.data("position");
			var caption = $(".hiddencap.cap_"+k).html();
			var pullquote = $(".hiddenquote.qot_"+k).html();
			
			if (thislink.is(tl)){
				as = " activeslide";
				firstcaption = $(".hiddencap.cap_"+k).html();
				firstpullquote = $(".hiddenquote.qot_"+k).html();
				capleft = (position == 2) ? " left" : "";
				ask = k;
			} else {
				as = "";
			}
			
			
			//var slideclass = thislink.data("slideclass");
			var ic = i+1;
			
			flip = (position == 2) ? " flip" : "";
			
			lightboxcontent += "<div class='slide"+as+flip+"' data-ratio='"+imgr+"'>";
			
			if (imgpair){
				if (position == 2){
					lightboxcontent += "<img data-ratio='"+imgr2+"' src='"+bigimg2+"' />";
					lightboxcontent += "<img data-ratio='"+imgr1+"' src='"+bigimg1+"' />";
				} else {
					lightboxcontent += "<img data-ratio='"+imgr1+"' src='"+bigimg1+"' />";
					lightboxcontent += "<img data-ratio='"+imgr2+"' src='"+bigimg2+"' />";
				}
				
			} else {
				lightboxcontent += "<img data-ratio='"+imgr1+"' src='"+bigimg1+"' />";	
			}
			lightboxcontent += "<div class='hiddencap'>"+caption+"</div>";
			lightboxcontent += "<div class='hiddenquote'>"+pullquote+"</div>";
			lightboxcontent += "</div>";
			++i;
		});
		
		lightboxcontent += "</div>";
		
		
		var abovecap = (firstcaption == "") ? "" : " abovecap";
		lightboxcontent += "<div class='pullquote"+abovecap+capleft+"'>";
		lightboxcontent += " <span class='quotetext'>"+firstpullquote+"</span>";
		lightboxcontent += "</div>";

		
		lightboxcontent += "<div class='caption"+capleft+"'>";
		lightboxcontent += " <span class='captiontext'>"+firstcaption+"</span>";
		lightboxcontent += "</div>";
		
		
		
		if (imgnum > 1){
			lightboxcontent += "<button class='ssnavi sbtn prev'></button><button class='ssnavi sbtn next'></button>";
			
		}
		
		
		//mobile counter and close
		lightboxcontent += "<div class='lbnavi'>";
		lightboxcontent += "<span class='counter'><span class='ic'>1</span>&thinsp;/&thinsp;"+imgnum+"</span>";
		lightboxcontent += "<button class='close'>Close</button>";
		lightboxcontent += "</div>";
		
		//desktop counter and close 
		lightboxcontent += "<div class='lbnavidesk"+capleft+"'>";
		if (imgnum > 1){
			var i = 0;
			images.each(function(){
				var thislink = $(this);
				var ic = i+1;
				var k = thislink.data("key");
				var selected = (ask == k) ? " selected" : "";
				lightboxcontent += "<button data-i='"+k+"' class='ssnavi key"+selected+"'>"+k+"</button>";
				++i;
			});
			lightboxcontent += "<button class='close'>Close</button>";
		}
		lightboxcontent += "</div>";
		
		
		lightboxcontent += "<button class='showcaption'>Caption</button>";
		
		
		lightboxcontent += "</div>";
		lightboxcontent += "</div>";
		
		$(lightboxcontent).appendTo("body").velocity("fadeIn",{duration:500, complete: function(){
			if (imgnum > 1){
				var closer = $("#lightbox .close");
			} else {
				var closer = $("#lightbox");
			}
			closer.click(function(e){
				e.preventDefault();
				var tl = $(this);
				$("#lightbox").velocity("fadeOut",500,function(){
					$(this).remove();
					destroyCursor();
					$('body').css("overflow","auto");
				});
			});
			
			
		}
		});
		setTimeout(function(){
			initSlideshows();
			resizeSite();			
		},150);


	});
}




/* !TABLE SORTING------------------------------------- */

function tableSorting(){
	$("body").on("vclick", "a.sort", function(e) {
		e.preventDefault();
		var	thislink = $(this);
		sortTable(thislink);
	});
	
/*
	$("body").on("change", "select.projsort", function(e) {
		e.preventDefault();
		var	thislink = $(this).find("option:selected");
		sortTable(thislink);
	});
*/
	
}


function sortTable(thislink){
	var sb = thislink.data("sortby");
	var desc = thislink.data("sortdir");

	
	var theselinks = $(".sort[data-sortby='"+sb+"']")
	var othersort = $(".sort").not(theselinks);
	
	var newdesc = (desc == "DESC") ? "ASC" : "DESC";
	thislink.data("sortdir",newdesc).addClass(newdesc).removeClass(desc);

	var indexdiv = $(".indextable");
	indexdiv.removeClass().addClass("indextable by"+sb);
	

	$.ajax({
		cache: false,
	    type: "GET",
	    url: "/php/projorder.php",
	    dataType: 'json',
		data: "sortby="+sb+"&desc="+desc,
		success: function(resultdata) {
			if (resultdata.result == 1){
				if (!$(".indextable").length){
					location.reload();
				}
			} else {
				
			}
		},
	   	error: function(resultdata) {
		   	
		}
	});


	theselinks.addClass("selected");
	othersort.removeClass("selected");



	$(".indextable .row").not('.nosort').sortElements( function(a, b) {
		if (desc == "DESC") {
			return $(a).data(sb) < $(b).data(sb) ? 1 : -1;
		} else {
			return $(a).data(sb) > $(b).data(sb) ? 1 : -1;
		}
	});
}








/* !MAP ------------------------------------- */

function showProjectPreview(href){
	var previewbox = $("#projectpreview");
	//var row = find(href, sites);
	
	if (href[0] != "/") {
		href = "/"+href;
	}
	var l =  href.split("/");
	
	if (l[3] == "map" && typeof l[4] != 'undefined' && l[4] != ""){
/*
		previewbox.html(sites[row][4]);
		previewbox.velocity({right: 0},250);
		for (m in markersArray) {
			if (markersArray[m].hash == href){
				markersArray[m].setIcon(pin);
			} else {
				markersArray[m].setIcon(pin_inactive);
			}
	    }
*/			
		$("#map_canvas").addClass("previewopen");
	}
}

function hidePreviewBox(){
	var previewbox = $("#projectpreview");
	previewbox.velocity({right: -320},250,function(){
		previewbox.empty();
	});
/*
	for (m in markersArray) {
		markersArray[m].setIcon(pin);
    }
*/
	$("#map_canvas").removeClass("previewopen");
}

















/* !UTILITIES ------------------------------------- */

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function dotDotDot(el){
	var dots = 0;
	el.html('&nbsp;');
	var dotinterval = setInterval(function(){
		if(dots < 3) {
	        el.append('&bull;');
	        dots++;
	    } else {
	        el.html('&nbsp;');
	        dots = 0;
	    }
		
		},150);
	return dotinterval;
}

function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

function scrollToTop(speed){
	$("html:not(:animated),body:not(:animated)").velocity("scroll", {
		duration: speed,
		easing: 'easeOutCubic'
	});
}

function scrollToEl(el,adj) {
	var current = $(document).scrollTop();
	var newpos = el.offset().top + adj;
	if (newpos > current){
		//going down
	} else {
	}
	

	$("html:not(:animated),body:not(:animated)").velocity("scroll", {
		offset: (el.offset().top + adj),
		duration: 450,
		easing: 'easeOutCubic',
		complete: function(){
			setTimeout(function(){
				updateScroll = true;
				gettingpage = false;
			}, 300);
		}
	});
}

function scrollToY(y) {
	$("html:not(:animated),body:not(:animated)").velocity("scroll", {
		offset: y,
		duration: 340,
		easing: 'easeOutCubic',
		complete: function(){
			setTimeout(function(){
				updateScroll = true;
			}, 300);
		}
	});
}

function makeSubscribeForm(){
	$("body").on('submit','.subscribeform', function(e) {
		e.preventDefault();
		var thisform = $(this);
		var thisemail = thisform.find("input[name='email']").val();
		var msgel = thisform.find(".msg");	
		if (validateEmail(thisemail)){
			$.ajax({
				url: "/php/subscribe.php",
				data: "email="+thisemail+"&ajax=1",
				dataType: 'html',
				success: function(resultdata) {
					errorMsg(msgel,resultdata);
					$("#email").val("");
				}
			});
		} else {
			errorMsg(msgel,"<span class='red'>Enter a valid email</span>");
		}
	});
}

function errorMsg(el,string){
	el.css({opacity:0}).html(string).velocity({opacity:1},240).delay(4000).velocity({opacity:0},240);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function makeSearchForm() {
	$("#searchform input[name='q']").on("focus", function(e) {
		var input = $(this);
		$("#mainnavi").addClass("searching");
		$("main.include").velocity({opacity:0},{duration: 300, complete: function(){
				$("main.include").css({display: "none"});
			}
		});
	});
	

	$("#searchform input[name='q']").on("blur", function(e) {
		var input = $(this);
		$("#mainnavi").removeClass("searching");
		$("main.include").css({display: "block"}).velocity({opacity:1},{duration: 300});
	});
	
	
	$("#searchform input[name='q']").on("keyup", function(e) {
		if (e.keyCode != 37 && e.keyCode != 38  && e.keyCode != 39  && e.keyCode != 40 && e.keyCode != 13) {
			var input = $(this);
			var form = input.closest("form");
			var searchresults = $("#searchresults");
			delay(function(){	
				var value = encodeURIComponent(input.val());
				var lang = form.find("input[name='l']").val();
				if (value.length > 2) {
					if (!searchresults.is(":visible")){
						searchresults.html("<h2 class='dotdotdot'></h2>").slideDown(160);
						var dotinterval = dotDotDot(searchresults.find(".dotdotdot"));
					}
					$.ajax({
						type: "GET",
						url: "/inc/search.php",
						dataType: 'json',
						data: "q="+value+"&l="+lang+"&ajax=1",
						success: function(resultdata) {
							//alert(resultdata);
							clearInterval(dotinterval);
							searchresults.html(resultdata.markup);
							makeLocalLinks();
						},
						error: function(resultdata){
							//alert(resultdata);
						}
					});
				} else {
					searchresults.slideUp(160,function(){
						clearInterval(dotinterval);
						$(this).empty();
					});
				}
			},300);
		}
	});
}
function resetSearchForm(){
	$("#searchform input[name='q']").val("").blur();
	$("#searchresults").slideUp(160,function(){
		$(this).empty();
	});
}

var delay = (function(){
var timer = 0;
return function(callback, ms){
	clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();


/* !RESIZE SITE ------------------------------------- */

function resizeSite() {
	ww = $(window).width();
	wh = $(window).height();
	
	$('.slideshow').each(function(){
		var ss = $(this);
		resizeSlideshow(ss);
	});
	
	
	resizeHomeImg();
	
	
	resetFilter();
}





function resizeHomeImg(){
	var section = $("section.home");
	var imgdiv = section.find(".img");
	var introtext = section.find(".txt");
	
	var img = imgdiv.find("img");
	var video = imgdiv.find(".playerwrap");
	if (video.length){
		img = video;	
	}
	
	var r = img.data("ratio");
	img.removeAttr("style");
	
	
	if (ww >= 768){
		var ih = imgdiv.height();
		var th = introtext.height();
		
		if (wh < (ih + th + 100)){
			if (video.length){
				ih = wh - th - 100;
				iw = ih * r;
				video.width(iw).height(ih);
			} else {
				ih = wh - th - 100;
				iw = ih * r;
				img.width(iw).height(ih);
			}
		}
	}
}




function positionNormalThumbs(fade){
	var wrap = $(".projects .thumbswrap.normal");
	var thumbs = wrap.find(".thumb");
	if (ww < 768){
		thumbs.removeAttr("style");
	} else {
		thumbs.each(function(i){
			var thumb = $(this);
			var img = thumb.find("img");
			var txt = thumb.find(".txt");
			var imgw = img.width();
			txt.width(imgw);
	
			
		});
		
		
		
/*
		var timeout = 10;
		if (fade){
			timeout = 300;
			thumbs.velocity("stop").velocity({opacity:0},0);
		}
		setTimeout(function(){
			thumbs.each(function(i){
				var thumb = $(this);
				var img = thumb.find("img");
				
				
				
				
				var w = img.width();
				var l = thumb.position().left;
				thumb.css({float: "left"});
				thumb.css({width:w});
				if (l == 0 && i > 1){
					thumbs.eq(i-1).css({float: "right"});
				}
				if (fade){
					thumb.velocity("stop").velocity({opacity:1},300);
				}
			});
		}, timeout);
*/
	}
	
	
}




function positionSelected(fade){
	
	var wrap = $(".projects .thumbswrap.deluxe");
	var thumbs = wrap.find(".thumb");
	var coords = [];
	var lr = "r";
	var wrapw = wrap.width();
	
	if (ww < 768){
		thumbs.removeAttr("style");
	} else {

		var timeout = 10;
		if (fade){
			timeout = 300;
			thumbs.velocity("stop").velocity({opacity:0},0);
		}
		setTimeout(function(){
		
			thumbs.each(function(i){
				var thumb = $(this);
				var l,t,r,b,w,h,wp;
				
				
				if (thumb.hasClass("size_1")){
					if (thumb.hasClass("portrait")){
						wp = 0.25;
					} else {
						wp = 0.333333;
					}
				} else if (thumb.hasClass("size_2")){
					if (thumb.hasClass("portrait")){
						wp = 0.3333333;
					} else {
						wp = 0.4166666;
					}
				} else if (thumb.hasClass("size_3")){
					if (thumb.hasClass("portrait")){
						wp = 0.4166666;
					} else {
						wp = 0.5;
					}
				} else if (thumb.hasClass("portrait")){
					wp = 0.3333333;
				} else {
					wp = 0.4166666;
				}
				
				w = wrapw * wp;
				h = w / thumb.data("ratio");
				
/*
				w = thumb.width();
				h = thumb.height();
*/
				
				
				if (lr == "r"){
					l = wrapw - w;
					lr = "l";
				} else {
					l = 0;
					lr = "r";
				}
				
				if (i == 0){
					t = 0;	
				} else {
					t = coords[i-1].t + (coords[i-1].h / 2);
				}
				
				//check if no conflict with previous
				if (i > 1 && t < (coords[i-2].b + 120)){
					t = coords[i-1].t + (coords[i-1].h * 0.75);
				}
				if (i > 1 && t < (coords[i-2].b + 120)){
					t = coords[i-1].b;
				}
				if (i > 1 && t < (coords[i-2].b + 120)){
					t = coords[i-2].b + 120;
				}
				
				r = l + w;
				b = t + h;
			
				coords[i] = {t:t,l:l,r:r,b:b,w:w,h:h};
				
				thumb.velocity("stop").velocity({top:t,left:l},{duration: 0, complete: function(){
						if (fade){
							thumb.velocity("stop").velocity({opacity:1},300);
						}
					}
				});
				wrap.css({height:b+100});
			});
			
		}, timeout);
	}
	
	
}




