setTimeout(function(){
	getNotification('Success!', 'Reminder added successfully.', 'images/accept-48.png');
},2000)


window.addEventListener("load", clickHandler);

function clickHandler () {
	console.log('clickHandler 1 ');
	chrome.notifications.create('',{
		type: "basic",
		title: "PriceRadar",
		message: "Item added successfully bg",
		iconUrl: "icon.png"
	},function(){});
}