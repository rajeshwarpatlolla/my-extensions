function getNotification (type, msg, img) {
	chrome.notifications.create(type,{
		type: "basic",
		title: "Alert",
		message: msg,
		iconUrl: img
	},function(){});
}

window.addEventListener("load", function () {
	chrome.storage.sync.get('value',function(result){
		document.getElementById("input_box_1").value = result.value || '';
	});
});

document.getElementById("save-btn").addEventListener("click",storeTheData);
document.getElementById("clear-btn").addEventListener("click",clearTheData);

function clearTheData () {
	chrome.storage.sync.remove('value',function(){
		document.getElementById("input_box_1").value = '';
	});
}

function storeTheData() {
	var ipVal = document.getElementById("input_box_1").value;

	if (!ipVal) {
		getNotification('Warning!', 'Please enter some value.', 'warning_icon_64.png');
		return;
	}

	chrome.storage.sync.set({'value': ipVal}, function() {
		getNotification('Success!', 'Data saved successfully.', 'success_icon_64.png');
	});
}