var view = v = new Object();

v.init = function(){
	
	
	v[STATES.PROJECTS] 	 = new Object();
	v[STATES.PROJECT]	 = new Object();
	v[STATES.CONTACTS] 	 = new Object();
	v[STATES.ABOUT]		 = new Object(); 
	
	
	var fadeSpeed = !$.browser.msie ? 300 : 10; // fade във IE e mnogo зле затова по-добре да го няма 
	var slideSpeed = 400 ;
	
	v[STATES.PROJECTS].projectsView = function(){
	
	}
	
	v[STATES.PROJECTS].contactsView = function() {

		goTo(STATES.ABOUT)
	/*
		$("#contactsSt").stop ( true, true ) ; // Спира еффектите .Ако примерно за кратко време има няколко команди, еффектите 
		$("#projectsAllSt").stop ( true, true ) ; //биха се  добавили в .queue() и изпълняват последователно
	 										// , нo  stop() спира настоящия ефект а параметъра true  ги изтрива от там. 
											// След това започваме изпълнението на новите ефекти 
			
	
		var top = $("#contactsSt").outerHeight(true) ; 
		
	
		$("#projectsAllSt").animate({paddingTop:top},slideSpeed,function(){
			
			$("#contactsSt").fadeIn(fadeSpeed)
		}) ;
	
							
	*/

	}
	
	v[STATES.PROJECTS].aboutView = function (){
	
		$("#projectsAllSt").stop ( true, true ) ; 
		$("aboutSt").stop ( true, true  ) ;
	
		var top = $("#aboutSt").outerHeight() //+ parseInt($("#projectsAllSt").css("paddingTop").replace("px",""),10) ;
		
		$("#projectsAllSt").animate({paddingTop:top},slideSpeed,function(){
		
			
			if( $.browser.msie ){ $("#projectsAllSt").animate({paddingTop:0},slideSpeed) } ; 
			
			$("#aboutSt").fadeIn(fadeSpeed) ; 
		}) ;
		
	
	}
	
	v[STATES.PROJECTS].projectView = function(){
		
	
		$("#projectsAllSt").stop ( true, true ) ; 
		
		v.updateProject() ; 
		v.hideLoader() ;		

		var top = $("#projectSt").outerHeight(true)  ; 

		$("#projectsAllSt").animate({paddingTop:top},slideSpeed,function(){
		
			$("#projectsAllSt").css("padding-top",0) ;
		
			$("#projectSt").fadeIn(fadeSpeed) ; 
		}) ; 
		
	
	}
	
	
	v[STATES.CONTACTS].contactsView = function(){
		goTo(STATES.ABOUT)	
	/*	$("#contactsSt").stop ( true, true ) ;  
		
		var top = $("#contactsSt").outerHeight(true)  ; 

		$("#projectsAllSt").animate({paddingTop:top},slideSpeed,function(){});
	*/	
	}
	
	v[STATES.CONTACTS].projectsView = function(){
		
		$("#contactsSt").stop ( true, true ) ;  
		$("#projectsAllSt").stop ( true, true ) ; 
		
		 $("#contactsSt").fadeOut(fadeSpeed, function(){
			
			$("#projectsAllSt"). animate( {paddingTop : 0 }, slideSpeed) ; 
		});
	}
	
	
	v[STATES.CONTACTS].aboutView = function(){
			
			$("#contactsSt").stop ( true, true ) ; 
			$("#projectsAllSt").stop ( true, true ) ; 
			$("aboutSt").stop ( true, true  ) ;
			
			
			var top = $("#aboutSt").outerHeight(true);
			
			$("#contactsSt").fadeOut(fadeSpeed, function(){
				
				$("#aboutSt").fadeIn( fadeSpeed ) ; 
				$("#projectsAllSt").animate({paddingTop:top}, slideSpeed );
			});
	}
	
	v[STATES.CONTACTS].projectView = function(){
		
		$("#contactsSt").stop ( true, true ) ;  
		$("#projectsAllSt").stop ( true, true ) ; 
		$("#projectSt").stop ( true, true ) ;  
		
		
		v.updateProject() ; 
		v.hideLoader() ;

		var top = $("#projectSt").outerHeight(true);

		$("#contactsSt"). fadeOut ( fadeSpeed, function(){

			$("#projectsAllSt").animate({paddingTop:top}, slideSpeed, function(){
	
			$("#projectsAllSt").animate({paddingTop:0}, 0 );
	
				$("#projectSt").fadeIn ( fadeSpeed ) ; 
			}) ;
		}) ;
	}
	
	
	v[STATES.ABOUT].aboutView = function(){
		
		$("aboutSt").stop ( true, true  ) ;
		
		var top  = $("#aboutSt").outerHeight ( true ) ; 
		
		if( $.browser.msie ) top = 0 ; 
		
		$("#projectsAllSt"). animate ( {paddingTop : top}, slideSpeed ) ;	
	}
	
	v[STATES.ABOUT].projectsView = function(){
		
		$("#projectsAllSt").stop ( true, true ) ; 
		$("aboutSt").stop ( true, true  ) ;
		
		var top  = $("#aboutSt").outerHeight ( true ) ;
		
		$("#aboutSt"). fadeOut( fadeSpeed , function(){
			
			if( $.browser.msie ){ $("#projectsAllSt").css({"paddingTop":top}) } ; 
			
			$("#projectsAllSt").animate({paddingTop:0}, slideSpeed ) ; 
		}); 
	}
	
	v[STATES.ABOUT].contactsView = function (){
	
		goTo(STATES.ABOUT)
	
	/*	$("aboutSt").stop ( true, true  ) ;
		$("#contactsSt").stop ( true , true ) ;
		$("#projectsAllSt").stop ( true ,  true ) ; 
		
		
		var top = $("#contactsSt").outerHeight(true) ;
		
		$("#aboutSt"). fadeOut( fadeSpeed , function( ){
			
			$("#projectsAllSt"). animate( {paddingTop: top} , slideSpeed ) ;
			$("#contactsSt"). fadeIn ( fadeSpeed ) ; 
		});
	*/
	}
	
	
	v[STATES.ABOUT].projectView = function(){

		v.updateProject();
		v.hideLoader() ; 

		var top = $("#projectSt").outerHeight(true) ;
		
		$("#aboutSt"). fadeOut ( fadeSpeed , function(){
			
			$("#projectsAllSt"). animate ( {paddingTop: top}, slideSpeed , function(){
				
				$("#projectsAllSt").animate({paddingTop:0}, 0 );
				$("#projectSt"). fadeIn ( fadeSpeed ) ; 
			});
		});
	}
	
	v[STATES.PROJECT].projectView = function(){
		v.updateProject();
		v.hideLoader() ; 
	
	}
	
	v[STATES.PROJECT].projectsView = function(){
			
		var top =  $("#projectSt").outerHeight(true);
		
		$("#projectSt"). fadeOut ( fadeSpeed , function(){
			
			$("#projectsAllSt"). css(  "paddingTop", top ) ; 
			
			$("#projectsAllSt").animate({paddingTop:0}, slideSpeed  );
		});
	}
		
	v[STATES.PROJECT].contactsView = function(){
		goTo(STATES.ABOUT)
	/*	
		var topSt = $("#projectSt").outerHeight(true) ;
		var topEnd = $("#contactsSt").outerHeight(true) ;
		
		
		$("#projectSt"). fadeOut ( fadeSpeed, function() {
			
			$("#projectsAllSt"). css(  "paddingTop", topSt ) ;
			
			$("#projectsAllSt"). animate ( {paddingTop: topEnd }, slideSpeed, function(){
				
				$("#contactsSt"). fadeIn ( fadeSpeed ) ; 
			});
		}); 
	*/
		
	}
	
	v[STATES.PROJECT].aboutView = function(){
			
		var topSt = $("#projectSt").outerHeight(true) ;
		var topEnd = $("#aboutSt").outerHeight(true) ;

		$("#projectSt"). fadeOut ( fadeSpeed, function() {
			
			$("#projectsAllSt"). css(  "paddingTop", topSt ) ;

			$("#projectsAllSt"). animate ( {paddingTop: topEnd }, slideSpeed, function(){

				$("#aboutSt"). fadeIn ( fadeSpeed ) ; 
			});
		});
		
	}
	
	
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
			Movement - dramaturgy gestures
	**/
	v.showMain = function(){
		
		 $("#contactsSt").addClass("hide");
		 $("#aboutSt").addClass("hide");
		 $("#projectSt").addClass("hide");
		 $("#projectsAllSt").fadeIn(fadeSpeed) ; 
	
		 $("#main").fadeIn(fadeSpeed) ; 
		
		v.updateProject() ;
	}
	/***************************
			Create Methods - create scene (set tags)
	**/

	v.createMainMenu = function(){
		
		

		//alert(titleText);
		//$("title"). html( titleText ) ;
		document.title = metadata.titleText; //$("title"). html( titleText ) ; not working in IE 7 IE 8  - - - - checked
		
		$("#logo"). html( metadata.titleText ) ;
		
		$("h1").css ("background-image" , 'url("'+metadata.headerImageUrl+'")');
		
		$("#subTitle"). html( "" );
		
		$("#projects"). html( state.projects ) ;
		$("#contacts"). html( "" ) ;
		$("#about"). html( state.about );
		
	
	 	$("h1").click(function(){
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
			'<div class="project_feed_thumb" id="'+p[i].pId+'" >'+
				'<div class="projectWrapper">'+
					'<a onclick="javascript:goTo('+"'"+ STATES.PROJECT+"/"+p[i].pId+"'"+')" class="nohover" onfocus="this.blur()">'+
					
						'<div class="thumbsHolder">'+
						
							'<div class="hoverThumb thumbImgClass thumbBorder" >'+
								'<img src="'+p[i].tSrc+'" alt="'+p[i].tName+'" rel="" border="0">'+
							'</div>'+
					
						'</div>'+
						
						'<div class="loader_holder">'+
							'<img src="images/assets/loadingAnim.gif">'+
						'</div>'+
						
						'<div class="thumb_title">'+
							'<span class="text">'+p[i].pName+'</span>&nbsp;'+
						'</div>'+
					'</a>'+
				'</div>'+
			'</div>');
			$(".nohover").click(function(){
				$(".loader_holder").css("display", "none");
				if(m.getCurrentProject().pId != $(this).parent().parent().attr("id"))
				$(this).children(".loader_holder").css("display","block");
			});
		}
		
		
		$(".nohover").hover(
			function(){
			
				$(this).find(".hoverThumb").stop();
				$(this).find(".hoverThumb img").animate({opacity:.3},150);
				$(this).find(".thumb_title").fadeIn(100);
				$(this).find(".thumbImgClass").removeClass("thumbBorder") ; 
				$(this).find(".thumbImgClass").addClass("thumbBorderHover") ;
				
			
			},
		
			function(){
			
				$(this).find(".hoverThumb").stop();
				$(this).find(".hoverThumb img").animate({opacity:1},150);
				$(this).find(".thumb_title").fadeOut(100);
				$(this).find(".thumbImgClass").removeClass("thumbBorderHover") ; 
				$(this).find(".thumbImgClass").addClass("thumbBorder") ;
				
				
			});
			
			
			
	
	
	}
	
	v.createContacts = function (){
	/*		var p = m.getContacts();
	
		for(var i = 0 ; i < p.length ; i ++ ){
	
		$("#contactsSt").append(
			'<div class="contacts_view" onfocus="this.blur()">'+
				'<div class="contacts_text">'+
					'<span class="label" >'+m.getContacts()[i].network+':&nbsp;</span><span  class="text" >'+m.getContacts()[i].address+'</span>'+
				'</div>'+
			'</div>');
		}
	*/	
	}
	
	v.createAbout = function(){
		
		$("#aboutSt").append(
			'<div class="aboutView" onfocus="this.blur()">'+
				
				'<div class="bioText">'+
					'<span class="text">'+m.getBio()+'</span>&nbsp;'+
				'</div>'+
				'<div id="contactsAndFriends"></div>'+
			'</div>');	
		
		
		$("#contactsAndFriends").append(
		
				
				"<div id='contactsField'>"+
					"<div class='metadataLabel'>"+metadata.contacts+"</div><br/>"+
				"</div>"+
				
				"<div id='friendsField' >"+
					"<div class='metadataLabel' onfocus='this.blur()'>"+metadata.partnerList+"</div><br/>"+
				"</div>");
								
		for(var i = 0 ; i < m.getContacts().length ; i ++ ){

			$("#contactsField").append(
				'<div class="contacts_view" onfocus="this.blur()">'+
					'<span class="contacts_text">'+
						'<span  class="text" >'+m.getContacts()[i].address+'</span>'+
					'</span>'+
				'</div>');
				}
		
		
		for (var i = 0 ; i < m.getFriends().length ; i ++){
			
			if (m.getFriends()[i].site){
			
				$("#friendsField").append(
					'<span class="friendsText">'+
						'<span class="site text"><a href="'+m.getFriends()[i].site+'" target="_blank">'+m.getFriends()[i].name+'</a></span>&nbsp'+		
					'</span><br/>');	
			}
			else{
				$("#friendsField").append(
					'<span class="friendsText">'+
						'<span class="name text">'+m.getFriends()[i].name+'</span>&nbsp'+
					'</span><br/>');
				
			}
		}
	}

	v.createProject = function(){
		
		$("#projectSt").append(
			'<div class="project_view">'+
				'<div class="projectMeta">'+
		<!--//		'<span class="label" id="pNameLabel">'+metadata.projectName+':&nbsp;</span><span id="pNameId" class="text">'+m.getCurrentProject().pName+'</span><br>'+ -->
					'<span  id="pInfoId" class="text">'+m.getCurrentProject().info+'</span><br>'+
					'<span class="metadataLabel" id="pClientLabel">'+metadata.client+':&nbsp;</span><span  id="pClientId" class="text">'+m.getCurrentProject().client+'</span>'+
				'</div>'+
				
				'<div class="imageHolder">'+
				
					'<span class="nextPrev">'+
						'<span id="numbers" ></span>'+
					'</span>'+
					
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
				
				$(("#number" + i).toString() ).removeClass("numbersUnviewed");
				$(("#number" + i).toString() ).addClass("numbersViewed");
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
			$("#numbers").css("display","block") ; 
	
		
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
		
	
		//var pos = $("#projectSt").offset();
		//var top = pos.top > 10 ? pos.top - 10 : 10 ;  
		$("body").scrollTo( 0  )
		
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
	
		
		$("#main").css("display", "none");
		
		v = view = {}
	}
	
	v.destroyNodeChildOf = function(node){
		
		var children = node.children();
		
		for ( var i =  -- children.length ; i >= 0 ; i -- ){

			$(children[i]).remove() ; 
			
		}
		
	}
	
	v.setEmptyHtmlNode = function(node){	

	
		if (node. children( ).length == 0 ){
			node.html("")
			return;
		}
		
		
				
		for ( var i =  -- node.children().length ; i >= 0 ; i --  ){
		
			if ( $( node. children( )[ i ] ). children(). length ){
	//			alert( node. children( )[ i ].tagName + "  children:" + $( node. children( )[ i ] ).children().length + " " + i )
				
				v. setEmptyHtmlNode( $( node. children( )[ i ] ) ) ;
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