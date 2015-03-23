window.addEventListener("load", function () {
	// chrome.storage.get('value',function(val){
		if(localStorage["input_val"]){
			document.getElementById("input_box_1").value = localStorage["input_val"];
		}
	// });
	// document.getElementById("input_box_1").value = ;
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
		chrome.notifications.create('Warning!',{
			type: "basic",
			title: "Alert",
			message: "Please enter some value.",
			iconUrl: "warning_icon_64.png"
		},function(){});
		return;
	}
	// Save it using the Chrome extension storage API.
	localStorage["input_val"] = ipVal;

	// chrome.storage.sync.set({'value': ipVal}, function() {

		chrome.notifications.create('Success!',{
			type: "basic",
			title: "Alert",
			message: "Data saved successfully.",
			iconUrl: "success_icon_64.png"
		},function(){});
	// });
}