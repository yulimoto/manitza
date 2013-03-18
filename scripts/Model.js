var model = m  = new Object() ; 



	var STATES = { 
					HOME	: "",
					PROJECTS : "projects",
					PROJECT : "project",
					CONTACTS : "contacts",
					ABOUT  : "about"	
				}
	
	var currentState = STATES.PROJECTS;
	

	
	var VERSION = {
					 DESIGNER : { name:"Designer" , keyType:"designer", localisationPackage:"localDesigner", contentPackage : "contentDesigner" , skin :{css:"css/style.css" , javascript: "scripts/ViewSite.js"} },
					 DEVELOPER : { name:"Developer" , keyType:"developer", localisationPackage:"localDesigner", contentPackage : "contentDesigner" , skin :{css:"css/styleDeveloper.css" , javascript: "scripts/ViewSiteDeveloper.js"} },
					 PRINTUX : { name:"PrintUX" , keyType:"printux", localisationPackage:"localPrintUx", contentPackage : "contentDeveloper" , skin :{css:"css/styleUX.css" , javascript: "scripts/ViewSiteUX.js"} }
				}
	
	var currentVersion = VERSION.DEVELOPER ; 
	
	var currentLocalisationPackage  = ("local").toString() ; 
	

m.init = function (){
	
		/*********************************
					Properties
		**/
		m.setBrowserLanguage = function(l){
			m.browserLanguage = l ;
		}
		
		m.getBrowserLanguage = function(){
			if (m.browserLanguage == undefined) m.browserLanguage = "en" ;// by default
			return m.browserLanguage ; 
		}
		
		m.setContentLanguage = function(l){
			m.contentLanguage = l ; 
		}
		m.getContentLanguage = function(){
			if (m.contentLanguage == undefined) m.contentLanguage = "en" ;// by default
			return m.contentLanguage ;
		}
		
		m.getProjects = function(){
			return m.projects ; 
		}
		
		m.getFriends = function(){
			return m.friends ; 
		}
		
		m.getContacts = function(){
			return m.contacts ;
		}
		
		m.getBio = function(){
			return m.bio;
		}
		
		// Project Iteterator
		m.getCurrentProject = function(){
			if ( ! m.currentProject )
				m.currentProject = m.getProjects()[0].pId ;
			
			var cp = getProject( m.currentProject ) ; 
			if ( cp != -1 )
				
				return cp ; 
			
			alert(getProject(m.currentProject) + "   " + m.currentProject)	
			alert('WRONG Way - MODEL') ; 
		}
		
		m.setCurrentProject = function(pId){
			
			var p = getProject(pId) ; 
			
			if ( p.pId == pId ){
				
				m.currentProject = pId ; 
				return true ; 
			}
			return false ;		
		}
		
		m.hasNextProject = function(){
	
			if  (  m.getCurrentProjectIndex() + 1 < m.getProjects().length && typeof m.getCurrentProjectIndex() == "number"){
				return true ; 
			}
	
			return false ; 
		}
		
		m.hasPrevProject = function(){
		
			if ( m.getCurrentProjectIndex() > 0 && typeof m.getCurrentProjectIndex() == "number"){
				return true ; 
			}
			
			return false ; 
		}
		
		// мести курсора и връща обекта value object
		m.nextProject = function(){
			
			if ( m. hasNextProject()  ){
			
				m.setCurrentProject( m.getProjects() [ parseInt(m.getCurrentProjectIndex(),10) + 1 ].pId) ; 
				return m.getCurrentProject() ; 
			}
			return false;
		}
		
		// мести курсора и връща обекта value object
		m.prevProject = function(){
			if ( m. hasPrevProject() ){
				
				m.setCurrentProject( m.getProjects() [ parseInt(m.getCurrentProjectIndex(),10) - 1].pId);
				return m.getCurrentProject()
			}
			
			return false ; 
		}
		
		// връща идента без да мести 
		m.getNextProjectId = function(){
			if (m. hasNextProject() ){
				
				return m.getProjects() [ parseInt( m.getCurrentProjectIndex(), 10) + 1].pId  ; 
			}
			return false ;
		
		}
		// връща идента без да мести 
		m.getPrevProjectId = function(){
			if (m. hasPrevProject() ){
				
				return m.getProjects() [ parseInt( m.getCurrentProjectIndex(), 10) - 1 ].pId ; 
			}
			return false ;
		}
		
		m.getCurrentProjectIndex = function(){
			
			for ( var i = 0 ; i < m.getProjects().length ; i ++){
				
				if ( m.getCurrentProject() === m.getProjects()[i] )
				{
					return i  ; 
				}
			}
			
			return "getCurrentProjectIndex cannot find getCurrentProject in Projects" ; // 'wtf from model' ;
		}
		
		function getProject( pId ){
			
			for (var i = 0; i < m.getProjects().length ; i ++){
				
				if ( pId == m.getProjects()[i].pId){
					
					return m.getProjects()[i];
				}
			}
			
			return -1 ;
		}
		
		
		
		/** 
			Image Iterator
		
		**/
		
		
		m.getCurrentImageIndex = function(){
			
			if ( m.currentImageIndex == undefined )
				
				m.currentImageIndex = 0 ;
				
			if ( m.getCurrentProject().images[m.currentImageIndex]){
				
				return m.currentImageIndex ; 
			}
			
			throw "m.getCurrentImageIndex is not range";
		}
		
		m.setCurrentImageIndex = function(index){
			
			if (  index  > -1 &&  index  < m.getCurrentProject().images.length ){
			
				m.currentImageIndex = index ; 
				return true ; 
			}
			return false ;
			
		}
		
		m.hasNextImageIndex = function(){
			if ( m.getCurrentImageIndex() + 1 < m.getCurrentProject().images.length )
				return true  ;
			return false ; 
		}
		m.hasPrevImageIndex = function(){
			if ( m.getCurrentImageIndex()  > 0 )
			 	return true ; 
			return false; 
		}
		
		m.hasImageIndexAt  = function( index ){
			if ( index < m.getCurrentProject().images.length && index >= 0 )
				return true  ;
			return false ;
		}
		
		m.nextImageIndex = function(){
			
			if ( m.hasNextImageIndex()){
			
				m.setCurrentImageIndex (  m.getCurrentImageIndex() + 1 ) ;
				return true ;
			}
			
			return false ; 
		}
		
		m.prevImageIndex = function(){
			if (m.hasPrevImageIndex()){
				
				m.setCurrentImageIndex ( m.getCurrentImageIndex() - 1 ) ; 
				return true ; 
			}
			
			return false ;
		}
		
		/*********************************
					Requests
		**/
		m.sendLocalizeRequest = function(isLoadWithContent){
			
			$.get("scripts/getBrowserLanguage.php?"+ new Date().getTime(), 
			
				function( data ){
				
					var acceptLanguage = data.split(",").length > 1 ? data.split(",")[0].toString() : $.localise.defaultLanguage ;
					acceptLanguage = acceptLanguage.split("-")[0]
					acceptLanguage = acceptLanguage.split("_")[0]
					
				
					m.setBrowserLanguage(acceptLanguage)

					$.localise( currentVersion.localisationPackage , { path : "localization/", language : m.getBrowserLanguage(), loadBase:true, timeout:5500 } );
					
					if( isLoadWithContent ) m.sendContentRequest(); // Load Content
			});
		}
		
		m.sendContentRequest = function(){
			
			$.each(contentPackages,
				function(index,value){
		
					if (value == m.getBrowserLanguage())
					{
						m.setContentLanguage( value ) ;
						return;
					}
			});
			
			var p = 'data/' + m.getContentLanguage() + "/"; 
			$.ajax({ type: "GET", url: p + currentVersion.contentPackage+".xml", success : m.parseXML , dataType : "xml"});
		}
		
		
		/*********************************
					Parsers
		**/
		m.parseXML = function( data ){
		
			xml = $( data ) ;
			
			var p = []; // projects
			
			xml.find("project").each( function(){
			
				var vo = {}; // project
				
				vo.pId = $(this).attr("id") ;
				vo.pName = $(this).attr("name")
				vo.tName = $(this).children("thumb").attr("name") ; 
				vo.tSrc = $(this).children("thumb").attr("src");
				vo.info = $(this).children("info").text();
				vo.client = $(this).children("client").text()
				
				vo.images = [];
				
				$(this).children().find("image").each(function(){
					var im = {};
					im.name = $(this).attr("name");
					im.src =  $(this).attr("src");
					
					vo.images.push(im);
					
				});
				
				p.push(vo); // add projects to []
				
			});
			
			var b = xml.find("bio").text() ;   // bio

			var f = [];
		
			xml.find("friends").children().each(function(){
				var vo = {};
				vo.site = $(this).attr("site") ; 
				vo.name = $(this).text() ;
				vo.srcImage = $(this).attr("image") ;
				f.push(vo)
			});
			
			
			var c = [] ; // add contacts
			
			xml.find("contacts").children().each(function(){
				var vo = {}
				vo.network = $(this).attr("network");
				vo.address = $(this).text();
				c.push(vo)
				
			});
			
			m.projects = p ;
			m.bio = b ; 
			m.friends = f ; 
			m.contacts = c ;
		
			$(document).trigger(Event.GENERAL_INFO_LOADED);
		
		}
		
		
		
			
		
		// load Localize with Content
		m.sendLocalizeRequest(true);
}

var contentPackages = ["en","bg" , "fr" , "de"];

