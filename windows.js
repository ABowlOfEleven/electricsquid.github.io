var winShown, offX, offY, appName, winWidth, winHeight, screenX, screenY, sizeX, sizeY;
var winMax = false;

// DRAGGING DOESN'T WORK ON TOUCH DECVICES
// Maybe consider doing something on window resize

// ---BUGS--- (FIX BEFORE ADDING FEATURES)
// Stop window from leaving edges? Maybe?

// ---FEATURES---
// When restoring size via dragging, Place window where cursor is after minimized (Do later. Other stuff is more important) (Not sure how to do this yet)
// Allow user to resize window (not sure how to trigger this event, See function for how to carry out event)

function addListeners() { // Add event listeners for actions (NEED TO PUT ID GAINING METHOD LATER)
	console.log("Adding Listeners");
	var title = document.getElementsByClassName("window_title_text"); // Get an array of title bars (dynamic method)
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

	var div = document.getElementById("window_" + appName); // Get window div
	offY = e.clientY-parseInt(div.offsetTop); // Get a cursor offset to account for the position of where the drag starts
	offX = e.clientX-parseInt(div.offsetLeft); // ^
	window.addEventListener('mousemove', dragMeBaby, true); // Add listener for mouse cursor position

	focus(appName);
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

	if (application == "embed") { // If the app being opened is the 'embed' app, launch embed script
		embedSite();
	}
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

	if (application == 'embed') { // If embed app is being closed, remove current video/link
		siteUrl = "";
		document.getElementById("iframe").src = siteUrl;
	}
}

function appMin(application) { // Always call this when minimizing
	console.log("appMin: " + application); // Testing
	winShown = false;
	document.getElementById("window_" + application).style.display = "none";
}

function appMax(application) { // Change div size
	var divMax = document.getElementById("window_" + application);
	if (winMax == true) {
		// Restore old size
		console.log("Restore: " + application);
		winMax = false;

		divMax.style.width = winWidth + "px";
		divMax.style.height = winHeight + "px";
		divMax.style.top = ""; // Clear these
		divMax.style.left = ""; // ^
	} else {
		// Maximize
		console.log("Maximizing: " + application);
		winWidth = divMax.offsetWidth;
		winHeight = divMax.offsetHeight;

		winMax = true;
		divMax.style.top = "0";
		divMax.style.left = "0";
		divMax.style.height = screenY-84 + "px"; // SUBTRACT HEIGHT OF PANEL
		divMax.style.width = "100%";
	}
}

function winShow(application) {
	winShown = true;
	document.getElementById("window_" + application).style.display = "block";
}

function winResize() {
	// Stuff for dragging window to resize
	// Just change the size of the div
	// Table will fill div
	// Adjust using .style.width and .style.height

	// Either apply listener to border of table or to div? (Maybe place on div, then make table only take up 99% so edge can still be read)

	// Maybe get mouse position then see if it is the same as the edge of the div (maybe get by div.offsetWidth - div.offsetTop?)
}

function divSize() { // Set the size of the windows default size (Possibly rename and have this scale lots of elements based off of resolution) (Use this instead of setting CSS width and height percentages because when the window initially shows it isn't the right size)
	screenX = window.innerWidth; // Get browsers resolution
	screenY = window.innerHeight; // ^
	sizeX = screenX*0.50; // Get 40% of resolution
	sizeY = screenY*0.50; // ^
	console.log("Size: " + sizeX + "x" + sizeY);
	var winDiv = document.getElementsByClassName("window");
	for (var i = 0; i < winDiv.length; i++) { // For every ID under "window" class, set width and height
		winDiv[i].style.width = sizeX + "px";
		winDiv[i].style.height = sizeY + "px";
	}
}

function resize(application,x,y) {
	var div = document.getElementById("window_" + application);
	div.style.width = x + "px";
	div.style.height = y + "px";
}

function focus(application) {
	var focDiv = document.getElementsByClassName("window"); 
	for (var i = 0; i < focDiv.length; i++) { // For every ID under "window" class, reset z-index
		focDiv[i].style.zIndex = "0";
	}
	document.getElementById("window_" + application).style.zIndex = "1"; // Bring a window to focus using z-index value
}
