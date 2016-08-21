// ---TODO---
// Stop using a prompt. Make something pretty that shows up at the middle of the window (Maybe a modal box)

function embedSite() {
	var siteUrl = prompt("Please enter a URL\nSome websites may not work!"); // Ask user for a URL
	document.getElementById("iframe").src = siteUrl; // Set iframe source to said URL
}