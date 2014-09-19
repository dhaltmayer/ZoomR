var cxid = chrome.contextMenus.create({"title": "Zoom Here", "contexts":["page", "selection"], "onclick": zoom});

function zoom(info, tab) {
	chrome.tabs.sendRequest(tab.id, "getWidth", function(data) {
		chrome.tabs.getZoom(function(zoomFactor){
			if (zoomFactor > 1){
				data.width = data.width / zoomFactor;
			}
			var zoomLevel = (1/(data.width/data.wWidth)) * .9;
			chrome.tabs.setZoom(zoomLevel);
			chrome.contextMenus.update(cxid,{"title": "Unzoom", "onclick": unzoom});
		});
	});
}

function unzoom(info, tab) {
	chrome.tabs.setZoom(1);
	chrome.contextMenus.update(cxid,{"title": "Zoom Here", "onclick": zoom});
}

chrome.tabs.onActivated.addListener(function(tab){
	chrome.tabs.getZoom(function(zoomFactor){
		if (zoomFactor > 1){
			chrome.contextMenus.update(cxid,{"title": "Unzoom", "onclick": unzoom});
		}
		else {
			chrome.contextMenus.update(cxid,{"title": "Zoom Here", "onclick": zoom});
		}
	});
});

