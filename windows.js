var winShown;
var offX;
var offY;

// TIDY THIS SHIT UP!
// May want to switch to using event handlers instead of onclick events?
// Dragging method is thanks to user jnoreiga from stack overflow with a modification from FrancescoMM. And then modifications from me.

function addListeners() { // Add event listeners for actions (NEED TO PUT ID GAINING METHOD LATER)
	console.log("adding listeners");
	document.getElementById("window_title_space_test").addEventListener('mousedown', mouseDown, false);
	document.getElementById("window_title_text_test").addEventListener('mousedown', mouseDown, false);
	window.addEventListener("mouseup", mouseUp, false);
}

function mouseUp() { // Don't listen to the mouses cursor position after releasing
	window.removeEventListener('mousemove', dragMeBaby, true); // ^
}

function mouseDown(e) {
	var div = document.getElementById('window_test'); // Get window div (still need id gaining method)
	offY = e.clientY-parseInt(div.offsetTop); // Get a cursor offset to account for the position of where the drag starts
	offX = e.clientX-parseInt(div.offsetLeft); // ^
	window.addEventListener('mousemove', dragMeBaby, true); // Add listener for mouse cursor position
}

function dragMeBaby(e) {
	var div = document.getElementById('window_test');
	div.style.position = 'absolute';
	div.style.top = (e.clientY-offY) + 'px'; // Set windows position based on cursor coordinates with the offset
	div.style.left = (e.clientX-offX) + 'px'; // ^
}

function appOpen(application) {
	document.getElementById("panel_winStat_" + application).src = "images/panel_window_active.png"; // Turn the windows status icon to active
	document.getElementById("panel_app_" + application).onclick = function() { appToggle(application) }; // Change applications onclick event for minimization
	winCreate(application);
}

function appToggle(application) { // For minimizing and maximizing the window when clicking app icon on panel
	console.log("appToggle " + application); // Testing

	if (winShown == true) { // If window is visible, hide it. If window is hidden, show it.
		appMin(application);
	} else {
		console.log("appToggle winShow");
		winShow(application); // THIS IS NOT WORKING (Entire event isn't being triggered. Which means winShown isn't being read as false)
	}
}

function winCreate(application) { // Use to create the window when button is initially clicked, or clicked after app is closed
	console.log("winCreate " + application); // Testing
	winShown = true;
	winShow(application);
}

function appClose(application) { // For closing an app when the X button is clicked
	console.log("appClose " + application); // Testing
	appMin(application);
	document.getElementById("panel_winStat_" + application).src = "images/panel_window_inactive.png"; // Turn the windows status icon to inactive
	document.getElementById("panel_app_" + application).onclick = function() { appOpen(application) }; // Change applications onclick event for opening
}

function appMin(application) { // Always call this when minimizing
	console.log("appMin " + application); // Testing
	winShown = false;
	document.getElementById("window_" + application).style.display = "none";
}

function winShow(application) {
	winShown = true;
	document.getElementById("window_" + application).style.display = "block";
}
