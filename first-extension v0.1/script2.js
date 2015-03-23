document.getElementById("button1").addEventListener("click",clickHandler);

function clickHandler () {
	console.log('clickHandler 2 ');
	chrome.notifications.create('hi',{
		type: "basic",
		title: "PriceRadar",
		message: "Item added successfully 2",
		iconUrl: "icon.png"
	},function(){});
}