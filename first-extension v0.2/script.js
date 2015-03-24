var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {

	function getNotification (type, msg, img) {
		chrome.notifications.create(type,{
			type: "basic",
			title: "Alert",
			message: msg,
			iconUrl: img
		},function(){});
	}

	var getterSetters = {
		getValue : function(key, callback){
			chrome.storage.sync.get(key,function(res){
				callback(res);
			});
		},
		setValue : function(obj, callback){
			chrome.storage.sync.set({value:obj.value},function(){
				callback();
			});
		},
		removeValue : function (key, callback) {
			chrome.storage.sync.remove(key,function(){
				callback()
			});
		},
		clearValue : function(key, callback){
			chrome.storage.sync.clear(key,function(){
				callback();
			});
		}
	};

	window.addEventListener("load", function () {
		getterSetters.getValue('value', function(res) {
			document.getElementById("input_box_1").value = res.value || '';	
		});	
	});

	document.getElementById("save-btn").addEventListener("click",storeTheData);
	document.getElementById("clear-btn").addEventListener("click",clearTheData);

	function clearTheData () {
		getterSetters.removeValue('value',function(){
			document.getElementById("input_box_1").value = '';
			getNotification('Success!', 'Data cleared successfully.', 'success_icon_64.png');
		});
	}

	function storeTheData() {
		var ipVal = document.getElementById("input_box_1").value;

		if (!ipVal) {
			getNotification('Warning!', 'Please enter some value.', 'warning_icon_64.png');
			return;
		}

		getterSetters.setValue({'value': ipVal}, function() {
			getNotification('Success!', 'Data saved successfully.', 'success_icon_64.png');
		});
	}

});