var enableAlert = true;
var enableConsole = true;


function Ajax(){
	intance = this;
	this.method = "POST";
	this.async = true;
	this.logMaxDetail = true;		
	console.log("");
	console.log("*** GLOBAL PROPERTIES ***");		
	console.log("Ajax:                          Ajax instance created.");
	console.log("Ajax.enableAlert:              "+enableAlert);
	console.log("Ajax.enableConsole:            "+enableConsole);
	console.log("Ajax.logMaxDetail:             "+this.logMaxDetail);
	console.log("*** GLOBAL PROPERTIES ***");	
} 	


Ajax.prototype.XMLHttpRequest = function() {
	console.log("");
	console.log("Ajax.XMLHttpRequest:           Method invoked.");
	var newObjXMLHttpRequest;			
	if (window.XMLHttpRequest){
		console.log("Ajax.XMLHttpRequest:           Type[IE7+, Firefox, Chrome, Opera, Safari].");
		newObjXMLHttpRequest=new XMLHttpRequest();
	} else {
		console.log("Ajax.XMLHttpRequest:           Type[IE6, IE5].");
		newObjXMLHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
	}
	console.log("Ajax.XMLHttpRequest.return:    "+newObjXMLHttpRequest);
	return newObjXMLHttpRequest;
}; 


Ajax.prototype.sendXMLHttpReq = function(method, url, async, values, func) {
	console.log("");
	console.log("Ajax.sendXMLHttpReq:           Method invoked.");
	console.log("Ajax.sendXMLHttpReq.method:    "+method);
	console.log("Ajax.sendXMLHttpReq.url:       "+url);
	console.log("Ajax.sendXMLHttpReq.async:     "+async);						
	
	var newObjXMLHttpRequest = this.XMLHttpRequest();			

	/*    
	   1. 0 = uninitialized
	   2. 1 = loading
	   3. 2 = loaded
	   4. 3 = interactive
	   5. 4 = complete
	*/			
	newObjXMLHttpRequest.onreadystatechange = function() {  
		console.log(">>>>>>>>>>>"+this.logMaxDetail);
		if(this.logMaxDetail){
			console.log(newObjXMLHttpRequest);			
		}
		if (newObjXMLHttpRequest.readyState == 4 && newObjXMLHttpRequest.status==200) {
			//document.getElementById("preloader").innerHTML="";
			toggle_visibility("preloader");
			if(this.logMaxDetail){
				console.log(newObjXMLHttpRequest.responseText);
			}
			// Respuesta
			func(newObjXMLHttpRequest.responseText);
		}
	}	
				
	if(method == "GET"){
		newObjXMLHttpRequest.open(method,url,async);				
		newObjXMLHttpRequest.send();
	} else if(method == "POST"){
		console.log("Ajax.sendXMLHttpReq.values:    "+values);			
		newObjXMLHttpRequest.open(method,url,async);			
		newObjXMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		newObjXMLHttpRequest.send(values);
	} else {
		console.log("Ajax.sendXMLHttpReq.exception: The method must be [GET, POST]");
		return false;
	}
}; 		


Ajax.prototype.sendXMLHttpPostReq = function(url, values) {
	//document.getElementById("preloader").innerHTML="Cargando...";
	toggle_visibility("preloader");
	console.log("Ajax:                          sendXMLHttpPostReq method invoked.");
	newObjXMLHttpRequest = this.sendXMLHttpReq("POST", url, this.async, values, func);
	//delay(2000);
}; 		


Ajax.prototype.sendXMLHttpGetReq = function(url, func) {
	//document.getElementById("preloader").innerHTML="Cargando...";
	toggle_visibility("preloader");
	console.log("Ajax:                          sendXMLHttpGetReq method invoked.");
	newObjXMLHttpRequest = this.sendXMLHttpReq("GET", url, this.async, "", func);	
	//delay(2000);
};
	

function delay(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
}

function alertDismissedAjax(){
	
}

function ajaxStatus(){
	navigator.notification.alert("Ajax Online...", alertDismissedAjax, "Warning",'Close');
}