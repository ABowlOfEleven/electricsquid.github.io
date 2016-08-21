// ---TODO---
// Stop using a prompt. Make something pretty that shows up at the middle of the window (Maybe a modal box)
// Switch to using a case statement (or switch statement, whatever it's called in JS) 

var siteUrl, vidId;

function embedSite() {
	siteUrl = prompt("Please enter a URL\nSome websites may not work!\nOFFICIAL WORKING SITES: Youtube Videos", "https://www.youtube.com/embed/dQw4w9WgXcQ"); // Ask user for a URL
	console.log("Original URL: " + siteUrl);

	// YOUTUBE VIDEO SUPPORT
	if (siteUrl.includes("youtube.com/watch")) { // If normal URL, set to embed
		vidId = siteUrl.replace("https://www.youtube.com/watch?v=", ""); // Obtain video ID
		siteUrl = "https://www.youtube.com/embed/" + vidId;
		console.log("New URL: " + siteUrl); // Set new embed URL
	} else if (siteUrl.includes("youtu.be")) { // If shorthand link, set to embed
		vidId = siteUrl.replace("https://youtu.be/", ""); // Obtain video ID
		siteUrl = "https://www.youtube.com/embed/" + vidId; // Set new embed URL
		console.log("New URL: " + siteUrl);
	}

	document.getElementById("iframe").src = siteUrl; // Set iframe source to said URL
}
