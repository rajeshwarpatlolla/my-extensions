function getNotification (type, msg, img) {
	chrome.notifications.create(type,{
		type: "basic",
		title: "Alert",
		message: msg,
		iconUrl: img
	},function(){});
}

window.addEventListener("load", function () {
	// chrome.storage.get('value',function(val){
		if(localStorage["input_val"]){
			document.getElementById("input_box_1").value = localStorage["input_val"];
		}
	// });
});

document.getElementById("save-btn").addEventListener("click",storeTheData);
document.getElementById("clear-btn").addEventListener("click",clearTheData);

function clearTheData () {
	localStorage["input_val"] = "";
	document.getElementById("input_box_1").value = localStorage["input_val"];
}

function storeTheData() {
	var ipVal = document.getElementById("input_box_1").value;

	if (!ipVal) {
		getNotification('Warning!', 'Please enter some value.', 'warning_icon_64.png');
		return;
	}
	// Save it using the Chrome extension storage API.
	localStorage["input_val"] = ipVal;

	// chrome.storage.sync.set({'value': ipVal}, function() {
		getNotification('Success!', 'Data saved successfully.', 'success_icon_64.png');
	// });
}