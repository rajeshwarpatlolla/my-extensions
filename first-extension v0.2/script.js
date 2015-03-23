document.getElementById("button1").addEventListener("click",clickHandler);

function clickHandler () {
	console.log('clickHandler 2 ');
	chrome.notifications.create('hi',{
		type: "basic",
		title: "Alert",
		message: "You have clicked on my extension.",
		iconUrl: "icon128.png"
	},function(){});
}