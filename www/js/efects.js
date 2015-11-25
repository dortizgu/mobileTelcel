function swing(id) {
	var e = document.getElementById(id);
	if("swing" == e.className){
		e.className = 'swing2';
	} else {
		e.className = 'swing';
	}
}

function toggle_visibility(id) {
	var e = document.getElementById(id);
	if(e.className == 'visible'){
	  e.className = 'hidden';			  
	} else {
	  e.className = 'visible';
	}			  
}