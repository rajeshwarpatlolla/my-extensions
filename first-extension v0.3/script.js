var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {

	$scope.reminders = [
		{name:'1', message:'msg 1', time:'9am'},
		{name:'2', message:'msg 2', time:'10am'},
		{name:'3', message:'msg 3', time:'11am'},
		{name:'4', message:'msg 4', time:'12pm'},
		{name:'5', message:'msg 5', time:'1pm'}
	];

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
			getNotification('Success!', 'Data cleared successfully.', 'images/accept-48.png');
		});
	}

	function storeTheData() {
		var ipVal = document.getElementById("input_box_1").value;

		if (!ipVal) {
			getNotification('Warning!', 'Please enter some value.', 'images/warning-48.png');
			return;
		}

		getterSetters.setValue({'value': ipVal}, function() {
			getNotification('Success!', 'Data saved successfully.', 'images/accept-48.png');
		});
	}

});