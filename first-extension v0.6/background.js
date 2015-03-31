
// window.addEventListener("load", clickHandler);

/*setTimeout(function(){
	clickHandler()
},2000);



function clickHandler () {
	chrome.notifications.create('',{
		type: "basic",
		title: "PriceRadar",
		message: "Item added successfully bg",
		iconUrl: "icon-48.png"
	},function(){});
}
*/

chrome.browserAction.setTitle({title:'Remind Me'});
chrome.browserAction.setBadgeText({text:'1'});
chrome.browserAction.setBadgeBackgroundColor({color:[100, 100, 150, 255]});

// script to bg page communication method 1
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "startFunc") {
        	func();
        }
    }
);

var func = function(){
	var mode = 'normal';
	/*if (tab.incognito) {
		mode = 'in cognito'
	}*/
    chrome.notifications.create('',{
		type: "basic",
		title: "PriceRadar",
		message: mode,
		iconUrl: "icon-48.png"
	},function(){});
};
// script to bg page communication method 1

// script to bg page communication method 2
function test(func) {
	func.apply(this, ['foo','bar']);
}
// script to bg page communication method 2