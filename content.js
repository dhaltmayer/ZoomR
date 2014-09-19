var clickedEl = null;
var theWidth = null;
var windowWidth = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
		theWidth = clickedEl.offsetWidth;
		windowWidth = window.innerWidth;
    }
}, true);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request == "getWidth") {
		sendResponse({"width": theWidth, "wWidth": windowWidth});
    }
});