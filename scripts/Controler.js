var controler = c = new Object();

var Event =  {	
			NAVIGATION_EVENT: "changeNavigationEvent",
			DESIGNER_INFO_LOADED:"designerInfoLoaded",
			DEVELOPER_INFO_LOADED: "developerInfoLoaded",
			GENERAL_INFO_LOADED: "generalInfoLoaded"		 // add custom event types here
		 } ; 

c.init = function(){

	$(document).bind( Event.NAVIGATION_EVENT, navigationHandler );
	$(document).bind( Event.DESIGNER_INFO_LOADED, DesignerInfoLoadedHandler );
	$(document).bind( Event.DEVELOPER_INFO_LOADED, DeveloperInfoLoadedHandler );
	$(document).bind( Event.GENERAL_INFO_LOADED, generalinfoLoadedHandler );
	
	
	if (!($.browser.msie)){
	
		$(window).bind('hashchange', function(){
			$(document).trigger(Event.NAVIGATION_EVENT);
		});
	}
	
	model.init(); //  start loading ; 
	
	
	$(document).bind("keydown", onKeyDownHandler ) ; 
	
	
	// track Event for Google Analytics
	_gaq.push(["_trackEvent", "Skin", currentVersion.name , "On Start"] ) ;
}








function goTo( value ){
	
	if ( isHashIsCommand( value ) ){
		
			window.location.hash =   "#/" + ( value ) ;
			
//TO DO IE DONT catch HashChange 

		if(navigator.userAgent.indexOf("Safari")!= -1 || $.browser.msie){
		
			$(document).trigger(Event.NAVIGATION_EVENT);	
		}
		
	}else{
		alert( "bad command! - " + value)
	}	
}


function getKeyCommand( value ){

	for(key in STATES){
	
		if (STATES[key].toLowerCase() == value.toLowerCase()){
			
			return STATES[key].toLowerCase()  ;  // state command
		}
	}
	
	return false
}


function isHashIsCommand(value){
	
	var hashValue =  getFirstHashWord(value) || getFirstHashWord();

	for(key in STATES){
	
		if (STATES[key] == hashValue){ // Model.STATES
			
			return true  ;  // state command
		}
	}
	
	return false
}


function getFirstHashWord(value){
	
	var hashValue = value || getAfterHashLocation();

	if (hashValue.indexOf("/") != -1){
	
		hashValue = hashValue.substr(0, hashValue.indexOf("/"));
	}
		
	return hashValue ; 
}

function getSecondHashWord(value){
	
	var hashValue = value || getAfterHashLocation();
	
	var st = getIndexOfSymbolFromHash("/", 1, hashValue) != -1 ? getIndexOfSymbolFromHash("/", 1, hashValue) + 1 : 0 ;
	var end = getIndexOfSymbolFromHash("/", 2, hashValue ) != -1 ? getIndexOfSymbolFromHash("/", 2, hashValue) : hashValue.length ;

	var countChar = end - st ; 

	return secondHashWord = hashValue.substr(st,countChar)

}

// if you want to search second symbol "/" for example - getIndexOfSymbolFromHash("/", 2)
function getIndexOfSymbolFromHash(symbol, index, value){
	
	var hashValue = value || getAfterHashLocation();
	var charAt = 0 ;
	
	index = index < 0 ? 0 : index ;  
	
	
	
	for ( var i = 0 ; i < index ; ++i ){
		
		var isSymbol = hashValue.indexOf ( symbol, charAt ) ;
		
		if ( isSymbol != -1 ){
		
			charAt = isSymbol + 1; 
		
		}else{
			
			return -1 ; 
		}
	}
	
	return isSymbol ; 
	
}


function getCommandFromHash(){
	var value = isHashIsCommand() ? getFirstHashWord() : "" ;

	for ( var key in STATES)
	{
		if ( STATES[key] == value ){
			value = key.toLowerCase() ; 
		}
	}
	return value ;
}

function getAfterHashLocation(){
	
	return window.location.hash.replace("#/","");
}


/*************************
		Handlers
**/

var isFirstTime ; 


function generalinfoLoadedHandler(){
		
	$.ajax({async: true, dataType: 'script' ,url: currentVersion.skin.javascript,
	
	error:function (e, ajaxOptions, thrownError){
	                    alert("ERROR: "+e.status);
	                    alert(thrownError)},
	success:function(){
	
		view.init(); 
	
		v.thumbsPreloader(function(){
						
			if ( metadata.headerImageUrl != undefined ){	
			
				v.imagePreloader(  metadata.headerImageUrl , function(){
					// първо се показва шоу за да покаже началното положение - свързано е с projects стейта 
					// ако дефолтния стейт се промени и showMain трябва да се промени според положенията в него 
				
					$("head").append("<link>") ; 
					
					var css = $("head").children(":last");
					css.attr({rel:  "stylesheet", type: "text/css", href: "css/reset.css" });
					
					$("head").append("<link>") ; 
					
					var css = $("head").children(":last");
					css.attr({rel:  "stylesheet", type: "text/css", href: currentVersion.skin.css });
					
					//loadFile( currentVersion.skin.css , "css");
					setTimeout( function(){

						v.showMain(); // set start state position
						$(document).trigger(Event.NAVIGATION_EVENT);	
						
						
					} , 500) /* start navigation events*/	

				 },10000);
			}
			else{
				
					$("head").append("<link>") ; 

					var css = $("head").children(":last");
					css.attr({rel:  "stylesheet", type: "text/css", href: currentVersion.skin.css });
				
					//alert(' load ' + currentVersion.skin.css)
				
					setTimeout( function(){
						
						v.showMain(); // set start state position
						$(document).trigger(Event.NAVIGATION_EVENT);	
					
						
					} , 500)
			}
			
		});
	
			
		
	}});
	
}

function DesignerInfoLoadedHandler( event ){
		
	

	$.ajax({async: true, dataType: 'script',timeout: 500 ,url: "scripts/ViewSite.js?"+new Date().getTime(),success:function(){
		
		view.init();
		
		v.thumbsPreloader(function(){
			v.imagePreloader( [ headerImageUrl ], function(){
				// първо се показва шоу за да покаже началното положение - свързано е с projects стейта 
				// ако дефолтния стейт се промени и showMain трябва да се промени според положенията в него 
				replaceFile("css/styleUX.css" , "css/style.css", "css");

				v.showMain(); // set start state position
				$(document).trigger(Event.NAVIGATION_EVENT); /* start navigation events*/	
				
			 },10000)

		});	
		
	}});
	
	

	
	
}

function DeveloperInfoLoadedHandler( event ){
	
	
	$.ajax({async: true, dataType: 'script',timeout: 500 ,url: "scripts/ViewSiteUX.js?"+new Date().getTime(),success: function(){
		
		replaceFile("css/style.css" , "css/styleUX.css", "css");
		v.init();
		
		v.thumbsPreloader(function(){
		
		// първо се показва шоу за да покаже началното положение - свързано е с projects стейта 
		// ако дефолтния стейт се промени и showMain трябва да се промени според положенията в него 
		// затова при промяна версията на view то се рестартира на STATES.PROJECTS
		
				v.showMain(); // set start state position
			});
		}});
	
	 
		$(document).trigger(Event.NAVIGATION_EVENT); /* start navigation events*/		
	
	
}

function navigationHandler(event){

	if (isHashIsCommand()) {
	
			var commandRaw = getCommandFromHash();
			eval(commandRaw + "Command()");
	
	}
	else{
		//MUST BE GOHOME
		window.location.hash = "#/"
	}
}





function projectsCommand(){
	
	v[currentState].projectsView();
	currentState = STATES.PROJECTS ; 
	// track Event for Google Analytics
	_gaq.push(["_trackEvent", "Navigation", STATES.PROJECTS , currentVersion.name] ) ;

}

function aboutCommand(){
	
	v[currentState].aboutView();
	currentState = STATES.ABOUT ;
	// track Event for Google Analytics
	_gaq.push(["_trackEvent", "Navigation", STATES.ABOUT , currentVersion.name] ) ;
}


function contactsCommand(){

	v[currentState].contactsView();
	currentState = STATES.CONTACTS ;
	// track Event for Google Analytics
	_gaq.push(["_trackEvent", "Navigation", STATES.CONTACTS , currentVersion.name] ) ;
}

function projectCommand(){
	
	var prId = getSecondHashWord();
	
	if ( prId == "")
		goTo(STATES.PROJECTS); 
	
	var images ; 

	
	if ( m.getCurrentProject().pId == prId && currentState == STATES.PROJECT)
		return ;

	if (m.setCurrentProject(prId)){
		
		images = m.getCurrentProject().images ;
	
	}else
	{
		goTo(STATES.PROJECTS)
		
	}
	
	var callBack = function(){
		
		v[currentState].projectView();
		currentState = STATES.PROJECT ;
		
		// track Event for Google Analytics
		_gaq.push(["_trackEvent", "Navigation", STATES.PROJECT , currentVersion.name] ) ;
		// track Event for Google Analytics
		_gaq.push(["_trackEvent", "Project", m.getCurrentProject().pId , currentVersion.name] ) ;
	}
	v.imagePreloader( images, callBack, 5000) ;
	
}

function homeCommand(){
		// set home as projects
			v[currentState].projectsView();
		//	alert(currentState)
			currentState = STATES.PROJECTS ;
		
		// track Event for Google Analytics
		_gaq.push(["_trackEvent", "Navigation", "HOME" , currentVersion.name] ) ;
			
}



function changeViewMode ( mode ){
	
	for( var p  in VERSION){
	
		if ( VERSION [ p ].keyType.toLowerCase() ==  mode.toLowerCase() ){
			goTo(STATES.PROJECTS) ; 
			v.destroyView();
		
		//	replaceFile( "css/reset.css" , currentVersion.skin.css, "css");
		//	unloadFile(currentVersion.skin.javascript, "js")
			$("link[href='css/reset.css']").remove();
			$("link[href="+currentVersion.skin.css+"]").remove();
			
			
		
			currentVersion = VERSION [ p ] ; 
			m.init ( ) ;
			
			// track Event for Google Analytics
			_gaq.push(["_trackEvent", "Skin", currentVersion.name , "On Running"] ) ;
		}
	} 
	
}



function onKeyDownHandler ( e  ){
	
	checkMode( e )
	
	var ch = String.fromCharCode(e.keyCode).toLowerCase() ; 
	
	if ( ch == "j"){
		
		if ( currentState == STATES.PROJECT) {
				
			if ( m.hasNextProject() ){
				
				goTo(STATES.PROJECT+"/"+m.getNextProjectId());
				
			}
			else{
			 
				goTo(STATES.PROJECT+"/"+ m.getProjects()[0].pId);
				
			}
		}
		else{
			
			goTo(STATES.PROJECT+"/"+m.getCurrentProject().pId);
		}
	}
	
	
	if ( ch == "k"){
		
		if ( currentState == STATES.PROJECT) {
			
			if ( m.hasPrevProject() ){
				goTo(STATES.PROJECT+"/"+m.getPrevProjectId());
			}
			else{
			
				goTo(STATES.PROJECT+"/"+ m.getProjects()[m.getProjects().length-1].pId);
				
				}
			}
			else{
				goTo(STATES.PROJECT+"/"+m.getCurrentProject().pId);
			}
		
	}
	
	
	if ( ch == "h"){
		
		goTo(STATES.HOME)
	}
	
	
}


function checkMode( e ){

	if ( c.charArr === undefined){
	
		c.charArr = new Array( ) ;
	}

	c.charArr.push( String.fromCharCode( e.keyCode ).toLowerCase() );

	
	for ( var ver in VERSION ){
		
		var count = 0 ;
		var countArr = [] ; 
		var keyMode = VERSION[ ver ].keyType.toLowerCase() ; 
	
		for ( var i = 0 ; i < keyMode.length ; i ++ ){
	
			if ( keyMode.charAt( (keyMode.length - 1) - i ) != c.charArr[ (c.charArr.length - 1 ) - i ]){
				break;
			}
			
			countArr.push ( c.charArr [ ( c.charArr.length - 1) - i ] ) ;
			count ++ ; 
		
		
			if ( count == keyMode.length ){
				
				changeViewMode(countArr.reverse().join(""))
				
				countArr = [];
			}
		}
	}	
}





