function getDevice() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) {
		window.alert("We have detected you are using a mobile device. Please consider finding a computer as this site is not intended for use on mobile.");
	}
}

window.onload = getDevice;