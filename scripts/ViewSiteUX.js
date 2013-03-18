var view = new Object();
var v = view ;
v.init = function(){
	
	
	v.developer = 'HI THE DEVELOPER IS LIFE'
	v[STATES.PROJECTS] 	 = new Object();
	v[STATES.PROJECT]	 = new Object();
	v[STATES.CONTACTS] 	 = new Object();
	v[STATES.ABOUT]		 = new Object(); 
	
	
	var fadeSpeed = !$.browser.msie ? 300 : 10; // fade във IE e mnogo зле затова по-добре да го няма 
	var slideSpeed = 650 ;
	
	v[STATES.PROJECTS].projectsView = function(){
	
	}
	
	v[STATES.PROJECTS].contactsView = function() {

		goTo(STATES.ABOUT)


	}
	
	v[STATES.PROJECTS].aboutView = function (){
		$("#content").stop(false , true )
		$("#content").scrollTo("#aboutSt",slideSpeed, {margin:true} )
	
	}
	
	v[STATES.PROJECTS].projectView = function(){
		$("#content").stop(true , false )
		$("#content").scrollTo('#project_' + (m.getCurrentProject().pId).toString(), slideSpeed, { axis:'y', queue: true, easing:"easeinout" } )
	
	}
		
	v[STATES.CONTACTS].contactsView = function(){
		goTo(STATES.ABOUT)	
	}
	
	v[STATES.CONTACTS].projectsView = function(){
		
	}
	
	
	v[STATES.CONTACTS].aboutView = function(){
		$("#content").stop(false , true )
		$("#content").scrollTo("#aboutSt",slideSpeed, {margin:true} )
	}
	
	v[STATES.CONTACTS].projectView = function(){
		
	}
	
	
	v[STATES.ABOUT].aboutView = function(){
		$("#content").scrollTo("#aboutSt",slideSpeed )
		
	}
	
	v[STATES.ABOUT].projectsView = function(){
	}
	
	v[STATES.ABOUT].contactsView = function (){
	
		goTo(STATES.ABOUT) ; 
	}
		
	
	v[STATES.ABOUT].projectView = function(){
		$("#content").stop(false , true ) ; 
		
		$("#content").scrollTo('#project_' + (m.getCurrentProject().pId).toString(), slideSpeed, { axis:'y', queue: true, easing:"easeinout" } )
	}
	
	v[STATES.PROJECT].projectView = function(){
		$("#content").scrollTo('#project_' + (m.getCurrentProject().pId).toString(),slideSpeed )
	}
	
	v[STATES.PROJECT].projectsView = function(){
		$("#content").stop(false , true )
		$("#content").scrollTo('#project_' + (m.getCurrentProject().pId).toString(), slideSpeed, { axis:'y', queue: true, easing:"easeinout" } )
	
	}
		
	v[STATES.PROJECT].contactsView = function(){
		goTo(STATES.ABOUT) ;
	}
	
	v[STATES.PROJECT].aboutView = function(){
		$("#content").stop(false , true )
		$("#content").scrollTo("#aboutSt",slideSpeed )
		
	}
	
	
	
	/***************************
			Movement - dramaturgy gestures
	**/
	v.showMain = function(){
	    //$(".hide").removeClass('hide');
		 //$("#contactsSt").addClass("hide");
		// $("#aboutSt").addClass("hide");
		// $("#projectSt").addClass("hide");
	 	 $("#projectsAllSt").css("display","block") ; 
		 $("#aboutSt").css("display","block") ; 
	    
		 $("#main").fadeIn(fadeSpeed) ; 
		
		v.updateProject() ;
	}
	/***************************
			Create Methods - create scene (set tags)
	**/

	v.createMainMenu = function(){
		
	

		//alert(titleText);
		//$("title"). html( titleText ) ;
		document.title =  metadata.titleText; //$("title"). html( titleText ) ; not working in IE 7 IE 8  - - - - checked
		$("#logo"). html( metadata.titleText ) ;
		$("#logo").click ( function ( ){ currentState = STATES.PROJECTS; $("#content").stop(false,true); $("#content").scrollTo(0, slideSpeed)})
		$("#logo").css("background-image", "none" );
		
		$("#subTitle"). html( "" );
		
		
	//	$("#header").addClass("box-shadow")
	//	$("#logo").css("background-image", "none") ; 
		$("#projects").html(state.projects +'<br><br>')
		
		for( var i in m.getProjects()){
			
			$("#projects"). append( '<lo><a  id="subMenu_'+m.getProjects()[i].pId+'" class="subMenuItem" href="javascript:goTo('+"'"+ STATES.PROJECT+"/"+m.getProjects()[i].pId+"'"+')" onfocus="this.blur()" >'+m.getProjects()[i].pName+'</a></lo><br>')
			
		}
		
	
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
		//	goTo(STATES.PROJECTS);
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
					'<div id="project_'+p[i].pId+'" class="projectHolder">'+
						'<div class="projectMeta">'+
							'<span id="pNameId" class="text projectName"><h3>'+p[i].pName+'</h3></span><br>'+ 
							'<span class="infoAll"><span class="metadataLabel" id="pInfoLabel">'+metadata.info+': &nbsp;</span><span  id="pInfoId" class="text">'+p[i].info+'</span></span><br><br>'+
							'<span class="infoClient"><span class="metadataLabel" id="pClientLabel">'+metadata.client+':&nbsp;</span><span  id="pClientId" class="text">'+p[i].client+'</span></span><br><br>'+
						'</div>'+

						'<div class="imageHolder">'+
						'</div>'+
					'</div>');
					
			for( var img = 0 ; img < p [ i ].images. length  ; img ++ ){
				
				$( "#project_"+p[i].pId + "  .imageHolder").append("<img class='pImg' src='"+  p[i].images[img].src +"' > ");
				
			}
			
	
		}
		
		$("#content").scroll(function(){
		
			if ( $("#subTitleSt").position().top  > 300 * -1 /* някакъв падинг */ ){
					$(".subMenuItem").removeClass("currentSubMenuItem");
					 
					return; 
				}
			
			
			if ( $("#aboutSt"). position(). top < parseInt( $("#projectsAllSt .projectHolder").css("paddingBottom").replace("px","")) /* някакъв падинг*/ ){
			
				$(".subMenuItem").removeClass("currentSubMenuItem");
				$("#about").addClass("currentSubMenuItem");
				
				return;
			}
			else{
					$("#about").removeClass("currentSubMenuItem");
			}
			
			$(".projectHolder").each(function(){
		
				
				
				if (  $(this).position().top - $(this).outerHeight(true) < 0 &&  $(this).position().top < 250  ){
				 
					var pId = $(this).attr("id").replace("project_", "") ; 
					m.setCurrentProject( pId ) ;
					$(".subMenuItem").removeClass("currentSubMenuItem")
					$("#subMenu_"+pId).addClass("currentSubMenuItem");
					
		//			$(".subMenuItem").not("#subMenu_"+ pId ).css({"background-color":"#fff", "color":"#222"})
				}
				
				
				
			//	alert($(this).attr("id") + "  " +  $(this).position().top  + "  " + $(this).outerHeight(true))
			});
			
			
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
	
	v.createSubTitleSt = function(){
		$("#content").prepend("<div id='subTitleSt'><h2>"+metadata.subTitle+"</h2></div>")
	}
	
	v.createAbout = function(){
		
		$("#aboutSt").insertAfter("#projectsAllSt")
		
		$("#aboutSt").append(
			'<div class="aboutView" onfocus="this.blur()">'+
				'<div class="metadataLabel">' + metadata.bio + '</div><br>'+
				'<div class="bioText">'+
					'<span class="text">'+m.getBio()+'</span>&nbsp;'+
				'</div>'+
			'</div>');	
		
		
		$("#aboutSt").append(
			"<div id='contactsAndFriends'>"+
			
				"<div id='contactsField'>"+
					"<div class='metadataLabel'>"+metadata.contacts+"</div><br>"+
				"</div>"+
				
				"<div id='friendsField'>"+
					"<div class='metadataLabel' onfocus='this.blur()'>"+metadata.partnerList+"</div><br>"+
				"</div>"+
			"</div>");
								
		for(var i = 0 ; i < m.getContacts().length ; i ++ ){

			$("#contactsField").append(
				'<div class="contacts_view" onfocus="this.blur()">'+
					'<span class="contacts_text">'+
						'<span class="label" >'+m.getContacts()[i].network+':&nbsp;</span><span  class="text" >'+m.getContacts()[i].address+'</span>'+
					'</span>'+
				'</div>');
				}
		
		
		for (var i = 0 ; i < m.getFriends().length ; i ++){
			
			if (m.getFriends()[i].site){
			
				$("#friendsField").append(
					'<span class="friendsText">'+
						'<span class="name text">'+m.getFriends()[i].name+'</span>&nbsp'+
						'<span class="site text"><a href="'+m.getFriends()[i].site+'" target="_blank">'+(m.getFriends()[i].site).toString().replace("http://","")+'</a></span>'+				
					'</span><br>');	
			}
			else{
				$("#friendsField").append(
					'<span class="friendsText">'+
						'<span class="name text">'+m.getFriends()[i].name+'</span>&nbsp'+
					'</span><br>');
				
			}
		}
	}

	v.createProject = function(){	}
		
	v.updateImageProject = function(){}
	
	v.updateProject = function(){}


	v.hideLoader = function (){
		$(".loader_holder").css("display", "none");
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

	
	/****** 
		Destroy Methods
	
	*/
	
	v.destroyView = function ( ){
	
		v.setEmptyHtmlNode($("#header")) ; 
		
		v.destroyNodeChildOf($("#contactsSt"));
		v.destroyNodeChildOf($("#aboutSt"));
		v.destroyNodeChildOf($("#projectSt")); 
		v.destroyNodeChildOf($("#projectsAllSt"));
		v.destroyNodeChildOf($("#subTitleSt"));
		
		$(".hide").removeClass("hide");
		$("#aboutSt").insertBefore("#projectsAllSt")
		
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
	v.createSubTitleSt();
	v.createProjects();
	v.createContacts();
	v.createAbout();
	v.createProject();
		
}