var view = new Object();
var v = view ;
v.init = function(){
	
	
	
	v[STATES.PROJECTS] 	 = new Object();
	v[STATES.PROJECT]	 = new Object();
	v[STATES.CONTACTS] 	 = new Object();
	v[STATES.ABOUT]		 = new Object(); 
	
	
	var fadeSpeed = !$.browser.msie ? 400 : 200; // fade във IE e mnogo зле затова по-добре да го няма 
	var slideSpeed = 400 ;
	
	v[STATES.PROJECTS].projectsView = function(){
		
		$("#projects").addClass("markMenu");
	}
	
	v[STATES.PROJECTS].contactsView = function() {
		
		$("#projectsAllSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ; 
		$("#aboutSt").stop ( true, true ) ; 
	
	
		$("#projects").removeClass("markMenu");
		$("#projects").addClass("unmarkMenu");
		
		$("#contacts").removeClass("unmarkMenu");
		$("#contacts").addClass("markMenu");
	
		$("#projectsAllSt").fadeOut( fadeSpeed , function(){
			$( "#aboutSt" ).fadeOut( 0 ) ; 
			$("#contactsSt").fadeIn(fadeSpeed) ; 
		}) ; 
	}
	
	v[STATES.PROJECTS].aboutView = function (){
		
		$("#projectsAllSt").stop ( true, true ) ;
		$("#aboutSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ;
		
		$("#projects").removeClass("markMenu");
		$("#projects").addClass("unmarkMenu");


		$("#about").removeClass("unmarkMenu");
		$("#about").addClass("markMenu");
		
		
		$( "#projectsAllSt" ).fadeOut( fadeSpeed , function( ){
			
			$( "#contactsSt" ).fadeOut( 0 ) ; 
			$( "#aboutSt" ).fadeIn( fadeSpeed ) ; 
		}) ;
	}
	
	v[STATES.PROJECTS].projectView = function(){
		
	
		
		$("#projectsAllSt").stop ( true, true ) ;
		$("#projectSt").stop ( true, true ) ;
		
		v.updateProject();
		
		$("#projectsAllSt").fadeOut( fadeSpeed , function(){
			$(".loader_holder").css("display", "none")
			$("#projectSt").fadeIn(fadeSpeed) ; 
		}) ;
	}
	

	
	v[STATES.CONTACTS].contactsView = function(){
		
	}
	
	v[STATES.CONTACTS].projectsView = function(){
		
		
		$("#contactsSt").stop ( true, true ) ;
		$("#projectsAllSt").stop ( true, true ) ;
		$("#aboutSt").stop ( true, true ) ;
	
		$("#contacts").removeClass("markMenu");
		$("#contacts").addClass("unmarkMenu");


		$("#projects").removeClass("unmarkMenu");
		$("#projects").addClass("markMenu");
		
		$("#aboutSt").css("display", "none") ;
		
		$("#contactsSt").fadeOut( fadeSpeed , function(){
		
			 
			$("#projectsAllSt").fadeIn(fadeSpeed) ; 
		});
	}
		
	v[STATES.CONTACTS].aboutView = function(){
	
		$("#contactsSt").stop ( true, true ) ;
		$("#aboutSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ;
		
		$("#contacts").removeClass("markMenu");
		$("#contacts").addClass("unmarkMenu");


		$("#about").removeClass("unmarkMenu");
		$("#about").addClass("markMenu");
		
		$("#contactsSt").fadeOut( fadeSpeed , function(){
		
			$("#contactsSt").fadeOut ( 0 ) ;
			$("#aboutSt").fadeIn(fadeSpeed) ; 
		});
	}
	
	
	
	v[STATES.ABOUT].aboutView = function(){
		// do nothing
	}
	
	v[STATES.ABOUT].projectsView = function(){
		
		$("#aboutSt").stop ( true, true ) ;
		$("#projectsAllSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ;
		
		$("#about").removeClass("markMenu");
		$("#about").addClass("unmarkMenu");


		$("#projects").removeClass("unmarkMenu");
		$("#projects").addClass("markMenu");
		
		$("#aboutSt").fadeOut( fadeSpeed , function(){
			
			$("#contactsSt").fadeOut( 0 ) ; 
			$("#projectsAllSt").css({"paddingTop": 0})	
			$("#projectsAllSt").fadeIn(fadeSpeed) ; 
		});			
	}
	
	v[STATES.ABOUT].contactsView = function (){
		
		$("#aboutSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ;
		$("#projectsStAll").stop ( true, true ) ;
		
		$("#about").removeClass("markMenu");
		$("#about").addClass("unmarkMenu");


		$("#contacts").removeClass("unmarkMenu");
		$("#contacts").addClass("markMenu");

		$("#aboutSt").fadeOut( fadeSpeed , function(){

			$("#projectsStAll").fadeOut( 0 ) ; 
			$("#contactsSt").fadeIn(fadeSpeed) ; 
		});
	}
	
	
	
	v[STATES.PROJECT].projectView = function(){
		v.updateProject();
		v.hideLoader() ; 
	}
	
	v[STATES.PROJECT].projectsView = function(){
		
		$("#projectSt").stop ( true, true ) ;
		$("#projectsAllSt").stop ( true, true ) ;	
		
		$("#projectSt").fadeOut( fadeSpeed , function(){
			$("#projectsAllSt").fadeIn(fadeSpeed) ; 
		});
	}	
	
	v[STATES.PROJECT].contactsView = function(){
		
		$("#projectSt").stop ( true, true ) ;
		$("#contactsSt").stop ( true, true ) ;
		
		$("#projects").removeClass("markMenu");
		$("#projects").addClass("unmarkMenu");


		$("#contacts").removeClass("unmarkMenu");
		$("#contacts").addClass("markMenu");
		
		$("#projectSt").fadeOut( fadeSpeed , function(){

			$("#contactsSt").fadeIn(fadeSpeed) ; 
		});
	}
	
	v[STATES.PROJECT].aboutView = function(){
		
		$("#projectSt").stop ( true, true ) ;
		$("#aboutSt").stop ( true, true ) ;
		
		$("#projects").removeClass("markMenu");
		$("#projects").addClass("unmarkMenu");


		$("#about").removeClass("unmarkMenu");
		$("#about").addClass("markMenu");
		
		$("#projectSt").fadeOut( fadeSpeed , function(){
			
			$("#aboutSt").fadeIn(fadeSpeed) ; 
		});
	}
	
	
	
	/***************************
			Movement - dramaturgy gestures
	**/
	v.showMain = function(){
		
		 $("#contactsSt").addClass("hide");
		 $("#aboutSt").addClass("hide");
		 $("#projectSt").addClass("hide");
		 
		v.updateProject() ;	
		
		$("#main").fadeIn(fadeSpeed)
		
	}
	
	
	/** Този "клас" - gestureDirector се оказа доста излишен и направо безмислен. Кратка дискусия има на акаунта ми (@websemiotic) в туитър на :  http://twitter.com/#!/gonzomir/status/5648276338511873
			gestureDirector.add( 
									{receiver:$("#about"), gest: $().fadeOut, properties:[{duration:1000}]},
									{receiver:$("#projectsAllSt"), gest: $().fadeOut, properties:[{duration:1000}]}
								);

			gestureDirector.add(
									{receiver : $("#main"), gest : $().animate, properties:[{opacity:.1},4000] });


			gestureDirector.execute();
	
		gestureDirector client can add effect from different objects ($(#div)) and execute consecutively or simultaneous
		 
			Example:  
		
				gestureDirector.add(
										{receiver : $("#main"), gest : $().fadeIn, properties:[1000] }); 

				gestureDirector.add( 
										{receiver:$("#about"), gest: $().fadeOut, properties:[{duration:1000}]},
										{receiver:$("#projectsAllSt"), gest: $().fadeOut, properties:[{duration:2000}]}
									);

				gestureDirector.add(
										{receiver : $("#main"), gest : $().animate, properties:[{opacity:.1},4000] });


				gestureDirector.execute();
				
	
			
	
	var gestureDirector = gd = {};
	
	gestureDirector.add = function(  ){
		
		if ( gd.children === undefined){
		
			gd. children = [];
		}
		
		var temp = [] ;
		
		
		for( var i = 0; i < arguments.length ; i ++){
		
			temp.push( arguments[i] ) ;	
			
		}
		
		gd.children.push(temp);
		
	}
	
	
	gestureDirector.clear = function(){
		
		gd.children = []  ;
	}
	
	
	
	gestureDirector.execute = function(endCallBack , endCallBackReceiver){
		
		var c = 0; 
		
		var callBack = function(){
			
		if ( c < gd.children.length){
			//	alert("start effect")
			var child = gd.children[c] ; 
			
			for ( var i = 0 ; i < child.length ; ++i){

				var gesture = child[i] ;
				
				if ( i == child.length - 1){
					gesture.properties.push(callBack);
					c++;
				}
				
				//$().clearQueue.apply( gesture.receiver, []) ;
				gesture.gest.apply( gesture.receiver, gesture.properties );
				//	alert("end effect")
			}
		
		
		}else{
			gd.children = [] ; 
			c = undefined;
			if ( endCallBack && endCallBackReceiver )
				endCallBack.call( endCallBackReceiver )
		}
	}
		//	alert("start gesture");
	callBack();	
	}
	
	
		
	gestureDirector.execute = function(endCallBack , endCallBackReceiver){
		var c = 0
		
		var callBack = function(){
			
		if ( c < gd.children.length){
			//	alert("start effect")
			var child = gd.children[c] ; 
			
			for ( var i = 0 ; i < child.length ; ++i){
				var gesture = child[i] ; 
				if ( i == child.length - 1){
					gesture.properties.push(callBack);
					c++;
				}
				gesture.gest.apply( gesture.receiver, gesture.properties );
				//	alert("end effect")
			}
		
		
		}else{
			gd.children = [] ; 
			c = undefined;
			endCallBack.call( endCallBackReceiver )
		}
	}
		//	alert("start gesture");
	callBack();	
	}
	*/
	
	
	/***************************
			Images Preloaders
		
	*/
	
	v.thumbsPreloader = function(callBack){
			
		var thumbs = [] ;
		
		for(var i = 0; i < m.getProjects().length ; i ++ ){
			var p = m.getProjects()[i];
			var t = {};
			t.src = p.tSrc  ;
			t.name = p.tName ; 
			thumbs.push(t)  
		}
	
		v.imagePreloader(thumbs, callBack, 10000); // if cannot load all thumbs for X second; go ahead.
	
	}
		
	v.imagePreloader = function (arrImg, callBack , timeOut){
		if(typeof arrImg != "object" )
			return ;
		if (arrImg.length<1) 
			return ;
		if (cacheImg == undefined)
		 	var cacheImg = [] ;
		
		var iLength = arrImg.length ; 
		var loadedCounter = 0 ;  // how many image are loaded ; for Example -  seconds in array may  be loaded first, when loadedCounter is equal to number of image -> all images are loaded

		var isLoaded = false ;
		var tOutFunc = function(){if(!isLoaded){callBack(); }}
		setTimeout( tOutFunc , timeOut)
		
		
			
		for( var i = iLength ; i--;){
			
			var _img = document.createElement("img");
		
			_img.onload = function(){

				loadedCounter++ ; 
				
				if (loadedCounter == iLength ){
					if ( typeof callBack == "function"){
						
						isLoaded = true;
						callBack() ; 
						
					}
				}
			}
			
			 typeof arrImg [ i ] == "object" ? _img.src = arrImg[i].src : _img.src = arrImg[i]
			
			cacheImg.push(_img) ; 
		}
	}
	
	
	/***************************
			Create Methods - create scene (set tags)
	**/

	v.createMainMenu = function(){
		//alert(titleText);
		//$("title"). html( titleText ) ;
		$("#logo").css("background-image", "url('"+metadata.headerImageUrl+"')" );
		
		document.title = metadata.titleText; //$("title"). html( titleText ) ; not working in IE 7 IE 8  - - - - checked
		
		$("#logo"). html( metadata.titleText ) ;
		$("#subTitle"). html( metadata.subTitle );
		
		
		$("#projects"). html( state.projects ) ;
		$("#contacts"). html( state.contacts ) ;
		$("#about"). html( state.about );
		
		$("#logo").click(function(){
			goTo(STATES.HOME); // Projects as home
			
	// TO SET CURRENT STATE
		});
		
		
		
		$("#contacts").click(function(){
			goTo(STATES.CONTACTS);
	// TO SET CURRENT STATE
		});
		
		$("#projects").click(function(){
			goTo(STATES.PROJECTS);
	// TO SET CURRENT STATE
		});	
		
		$("#about").click(function(){
			goTo(STATES.ABOUT) ;
	// TO SET CURRENT STATE
		});
	}
	
	v.createProjects = function( ){
		
		var p = m.getProjects();
	
		for(var i = 0 ; i < p.length ; i ++ ){
			
			$("#projectsAllSt").append(
			'<div class="project_feed_thumb" id="'+p[i].pId+'" onclick="javascript:goTo('+"'"+ STATES.PROJECT+"/"+p[i].pId+"'"+')" >'+
				'<div class="pr_wrapper">'+
					'<a id="a'+p[i].pId+'"  class="nohover" onfocus="this.blur()">'+
					
						'<div class="thumbsHolder">'+
						
							'<div class="hoverThumb">'+
								'<img class="thumbBorder thumbImgClass" src="'+p[i].tSrc+'" alt="'+p[i].tName+'" rel="" >'+
							'</div>'+
					
						'</div>'+
						
						'<div class="thumb_title">'+
							'<span class="text">'+p[i].pName+'</span>&nbsp;'+
						'</div>'+
						
						'<div class="loader_holder">'+
							'<img src="images/assets/loadingAnim.gif">'+
						'</div>'+
					'</a>'+
				'</div>'+
			'</div>');
			$("#"+p[i].pId).click(function(){
			
				$(".loader_holder").css("display", "none");
				
				$(this).find(".loader_holder").css("display","block");
			});
		}
		
		
		$(".nohover").hover(
			function(){
				$(this).find(".hoverThumb").stop();
				$(this).find(".hoverThumb").animate({opacity:.7},100);
				$(this).find(".thumbImgClass").removeClass("thumbBorder") ; 
				$(this).find(".thumbImgClass").addClass("thumbBorderHover") ;
				
			},
		
			function(){
			
				$(this).find(".hoverThumb").stop();
				$(this).find(".hoverThumb").animate({opacity:1},300);
				$(this).find(".thumbImgClass").removeClass("thumbBorderHover") ;
				$(this).find(".thumbImgClass").addClass("thumbBorder") ; 
				
			});
			
			
			
	
	
	}
	
	v.createContacts = function (){
			var p = m.getContacts();
	
		for(var i = 0 ; i < p.length ; i ++ ){
	
		$("#contactsSt").append(
			'<div class="contacts_view" onfocus="this.blur()">'+
				'<div class="contacts_text">'+
					'<span  class="text" >'+m.getContacts()[i].address+'</span>'+
				'</div>'+
			'</div>');
		}
		
	}
	
	v.createAbout = function(){
		
		$("#aboutSt").append(
			'<div class="about_view" onfocus="this.blur()">'+
				'<div class="bio_text ">'+
					'<span class="text">'+m.getBio()+'</span>&nbsp;'+
				'</div>'+
			'</div>');		
	}
	
	v.createProject = function(){
	
		$("#projectSt").append(
		
			
			'<div class="project_view">'+
				'<div class="projectMeta">'+
					'<span class="label"><img id="projectThumb" src="'+m.getCurrentProject().tSrc+'">&nbsp;</span>'+
					'<span  id="pInfoId" class="text">'+m.getCurrentProject().info+'</span><br>'+
					'<span class="text" id="pClientLabel">'+metadata.client+':&nbsp;</span><span  id="pClientId" class="text">'+m.getCurrentProject().client+'</span>'+
				'</div>'+
				
				'<div class="nextPrev">'+
					'<span id="numbers" ></span>'+
				'</div>'+
				'<div class="imageHolder">'+	
					'<img id="pImg" class="pImg" src="">'+
				'</div>'+
				
			'</div>');
				
			v.updateImageProject();
			
			$("#pImg").click(function(){
				if(m.hasNextImageIndex()){
					m.nextImageIndex();
					v.updateImageProject();
				}else{
					
					m.setCurrentImageIndex(0);
					m.getCurrentImageIndex();
					v.updateImageProject();
				}
			})
			
			$("#next").click(function(){
				m.nextImageIndex();
					v.updateImageProject();
				
			});
			
			$("#prev").click(function(){
				m.prevImageIndex()
				v.updateImageProject();
				
			});
				
		
	}
		
	v.updateImageProject = function(){
		
	
			for ( var i = 0 ; i < m.getCurrentProject().images.length ; i ++){
			
				if ( i <= m.getCurrentImageIndex()){
			
					$(("#number" + i).toString() ).addClass("numbersViewed");
					$(("#number" + i).toString() ).removeClass("numbersUnviewed");
				}
				else{
					$(("#number" + i).toString() ).removeClass("numbersViewed");
					$(("#number" + i).toString() ).addClass("numbersUnviewed");
				}
			}

		
	
	
		$("#pImg").fadeOut(0,function(){
			$("#pImg").attr("src",m.getCurrentProject().images [ m.getCurrentImageIndex() ].src);
		});
		$("#pImg").fadeIn(fadeSpeed);
		
		if ($("#pImg").queue().length > 1 ){
				
				$("#pImg").stop( false, true  ) ;
			}
		
	}
	
	v.updateProject = function(){
		
		
		$("#numbers").html("") ; 
				
		if( m.getCurrentProject().images.length > 1 ){
			$("#numbers").css("display","block")
		
		
			for ( var i = 0 ; i < 	m.getCurrentProject().images.length ; i ++ ){
				$("#numbers").append ( "<a id='number"+i+"'  onfocus='this.blur()' class='numbersUnviewed' href='javascript:m.setCurrentImageIndex("+i+") ; v.updateImageProject()'> " + (i + 1).toString() +  "</a>")
			}
		}
		
		
		$("#projectThumb").attr("src", m.getCurrentProject().tSrc)
		
		if(	m.getCurrentProject().pName != ""){
			$("#pNameId").html(m.getCurrentProject().pName) ;
			$("#pNameId").css("display","block") ;
			$("#pNameLabel").css("display","block") ;
		
		}else{
		
			$("#pNameLabel").css("display","none") ;
			$("#pNameLabel").css("display","none") ;
		}
		
		
		
		if( m.getCurrentProject().info != "" ){
			$("#pInfoId").html(m.getCurrentProject().info) ;
			$("#pInfoId").css("display","block") ;
			$("#pInfoLabel").css("display","block") ;
		}
		else{
			$("#pInfoId").css("display","none") ;
			$("#pInfoLabel").css("display","none") ;
			
		}
		
		
		if(	m.getCurrentProject().client != ""){
			
			$("#pClientId").html(m.getCurrentProject().client) ;
			$("#pClientId").css("display","block") ;
			$("#pClientLabel").css("display","block") ;

		}else{
			
			$("#pClientId").css("display","none") ;
			$("#pClientLabel").css("display","none") ;
			}
		
	
	

		m.setCurrentImageIndex(0);
		v.updateImageProject() ; 
	
	}
	
	v.hideLoader = function (){
		$(".loader_holder").css("display", "none");
	}

	v.destroyView = function ( ){
		
		v.setEmptyHtmlNode($("#header")) ; 
		
		v.destroyNodeChildOf($("#contactsSt"));
		v.destroyNodeChildOf($("#aboutSt"));
		v.destroyNodeChildOf($("#projectSt")); 
		v.destroyNodeChildOf($("#projectsAllSt"));
		
		$(".markMenu").removeClass("markMenu");
		$(".markMenu").removeClass("markMenu");
		$(".unmarkMenu").removeClass("unmarkMenu")
		$(".hide").removeClass("hide");

		$("#main").css("display", "none"); // важно като се сменя изгледа мейн да не се вижда 
		
		v = view = {};
	}
	
	v.destroyNodeChildOf = function(node){
		
		var children = node.children();
		
		for ( var i =  -- children.length ; i >= 0 ; i -- ){

			$(children[i]).remove() ; 
			
		}
		
	}
	
	v.setEmptyHtmlNode = function(node){

	
		if (node. children( ).length == 0 ){
			node.html('')
			return;
		}
		
		
				
		for ( var i =  -- node.children().length ; i >= 0 ; i --  ){
		
			if ( $( node. children( )[ i ] ). children(). length ){
	//			alert( node. children( )[ i ].tagName + "  children:" + $( node. children( )[ i ] ).children().length + " " + i )
				
				v. setEmptyHtmlNode( $( node. children( )[i] ) ) ;
				
				
			}else{
			
				$( node. children( )[ i ] ). html ("");
			}
				
		}
	}
	

	v.createMainMenu();
	v.createProjects();
	v.createContacts();
	v.createAbout();
	v.createProject();
	
	

	
}