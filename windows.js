var winShown;

function appOpen(application) {
	document.getElementById("panel_winStat_" + application).src = "images/panel_window_active.png"; // Turn the windows status icon to active
	document.getElementById("panel_app_" + application).onclick = function() { appToggle(application) }; // Change applications onclick event for minimization
	winCreate(application);
}

function appToggle(application) { // For minimizing and maximizing the window when clicking app icon on panel
	console.log("appToggle"); // Testing

	if (winShown == true) { // If window is visible, hide it. If window is hidden, show it.
		appMin(application);
	} else {
		console.log("appToggle winShow");
		winShow(application); // THIS IS NOT WORKING (Entire event isn't being triggered. Which means winShown isn't being read as false)
	}
}

function winCreate(application) { // Use to create the window when button is initially clicked, or clicked after app is closed
	console.log("winCreate"); // Testing
	winShown = true;
	winShow(application);
}

function appClose(application) { // For closing an app when the X button is clicked
	console.log("appClose"); // Testing
	winShown = false;
	winHide(application);
	document.getElementById("panel_winStat_" + application).src = "images/panel_window_inactive.png"; // Turn the windows status icon to inactive
	document.getElementById("panel_app_" + application).onclick = function() { appOpen(application) }; // Change applications onclick event for opening
}

function appMin(application) {
	console.log("appMin"); // Testing
	winShown = false;
	winHide(application);
}

function winHide(application) {
	document.getElementById("window_" + application).style.display = "none";
}

function winShow(application) {
	winShown = true;
	document.getElementById("window_" + application).style.display = "block";
}
