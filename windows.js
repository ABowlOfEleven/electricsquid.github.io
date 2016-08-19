var winShown, offX, offY, appName;
var winMax = false;

// DRAGGING DOESN'T WORK ON TOUCH DECVICES
// Maybe consider doing something on window resize
// When restoring size via dragging, Place window where cursor is after minimized (Do later. Other stuff is more important)
// Allow user to resize window

function addListeners() { // Add event listeners for actions (NEED TO PUT ID GAINING METHOD LATER)
	console.log("Adding Listeners");
	var title = document.getElementsByClassName("window_title_text"); // Get an array of title bars (dynamic method)
	console.log(title);
	for (var i = 0; i < title.length; i++) {
		title[i].addEventListener('mousedown', mouseDown, false); // For every element under the specified class, add event listener
	}
	window.addEventListener("mouseup", mouseUp, false);
}

function mouseUp() { // Don't listen to the mouses cursor position after releasing
	window.removeEventListener('mousemove', dragMeBaby, true);
}

function mouseDown(e) { // Loads of stuff
	console.log("mouseDown");
	appName = (this.id).replace('window_title_text_',''); // '(this.id)' grabs the elements id that called the function. '.replace()' replaces the specific text in the string and removes it to get the application name

	if (winMax == true) { // If window is already maximized, restore old size before moving
		appMax(appName);
	}

	var div = document.getElementById('window_test'); // Get window div (still need id gaining method)
	offY = e.clientY-parseInt(div.offsetTop); // Get a cursor offset to account for the position of where the drag starts
	offX = e.clientX-parseInt(div.offsetLeft); // ^
	window.addEventListener('mousemove', dragMeBaby, true); // Add listener for mouse cursor position
}

function dragMeBaby(e) { // Set div position (Need to adjust method of gaining div name)
	console.log("dragMeBaby: " + appName);
	var div = document.getElementById('window_' + appName);
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
	console.log("appToggle: " + application); // Testing

	if (winShown == true) { // If window is visible, hide it. If window is hidden, show it.
		appMin(application);
	} else {
		console.log("appToggle winShow");
		winShow(application);
	}
}

function winCreate(application) { // Use to create the window when button is initially clicked, or clicked after app is closed
	console.log("winCreate: " + application); // Testing
	winShown = true;
	winShow(application);
}

function appClose(application) { // For closing an app when the X button is clicked
	console.log("appClose: " + application); // Testing
	appMin(application);
	document.getElementById("panel_winStat_" + application).src = "images/panel_window_inactive.png"; // Turn the windows status icon to inactive
	document.getElementById("panel_app_" + application).onclick = function() { appOpen(application) }; // Change applications onclick event for opening
}

function appMin(application) { // Always call this when minimizing
	console.log("appMin: " + application); // Testing
	winShown = false;
	document.getElementById("window_" + application).style.display = "none";
}

function appMax(application) { // Change div size
	if (winMax == true) {
		// Restore old size
		console.log("Restore: " + application);
		winMax = false;
		document.getElementById("window_" + application).style.top = winTop; // Restore old size from maximizing
		document.getElementById("window_" + application).style.left = winLeft;
		document.getElementById("window_" + application).style.width = winWid; // Set divs width from offset
		document.getElementById("window_" + application).offsetHeight = winHei; // Set divs heigh from offset

		document.getElementById("window_" + application).style.width = ""; // Empty width property
		document.getElementById("window_" + application).style.bottom = ""; // Empty bottom property
	} else {
		// Maximize
		console.log("Maximizing: " + application);
		var winTop = document.getElementById("window_" + application).style.top; // Grab old dimensions before maximizing
		var winLeft = document.getElementById("window_" + application).style.left;
		var winWid = document.getElementById("window_" + application).offsetWidth;
		var winHei = document.getElementById("window_" + application).offsetHeight;
		winMax = true;
		document.getElementById("window_" + application).style.top = "0";
		document.getElementById("window_" + application).style.left = "0";
		document.getElementById("window_" + application).style.bottom = "84px"; // HEIGHT OF PANEL
		document.getElementById("window_" + application).style.width = "100%";
	}
}

function winShow(application) {
	winShown = true;
	document.getElementById("window_" + application).style.display = "block";
}

function winResize() {
	// Stuff for dragging window to resize
}

function divSize() { // Set the size of the windows default size (Possibly rename and have this scale lots of elements based off of resolution) (Use this instead of setting CSS width and height percentages because when the window initially shows it isn't the right size)
	var screenX = window.innerWidth; // Get browsers resolution
	var screenY = window.innerHeight; // ^
	var sizeX = screenX*0.40; // Get 40% of resolution
	var sizeY = screenY*0.40; // ^
	console.log("Size: " + sizeX + "x" + sizeY);

	var winDiv = document.getElementsByClassName("window");
	console.log("divSize: " + winDiv);

	for (var i = 0; i < winDiv.length; i++) { // For every ID under "window" class, set width and height
		winDiv[i].style.width = sizeX + "px";
		winDiv[i].style.height = sizeY + "px";
	}
}
