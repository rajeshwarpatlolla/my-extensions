window.addEventListener("load", clickHandler);

function clickHandler () {
	chrome.notifications.create('',{
		type: "basic",
		title: "PriceRadar",
		message: "Item added successfully bg",
		iconUrl: "icon-48.png"
	},function(){});
}