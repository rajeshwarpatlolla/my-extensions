var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {

	$scope.reminders = [
	{id:1,message:'This is 1st message from RR', time:'9am'},
	{id:2,message:'This is 2nd message from RR', time:'10am'},
	{id:3,message:'This is 3rd message from RR', time:'11am'},
	{id:4,message:'This is 4th message from RR', time:'12pm'},
	{id:5,message:'This is 5th message from RR', time:'1pm'}
	];

	$scope.addNewReminderVal = false;
	$scope.addNewReminder = function(){
		$scope.addNewReminderVal = true;
	};
	
	$scope.submitNewReminder = function(newReminder){
		var highestId = 0;
		angular.forEach($scope.reminders, function(val, key){
			if(highestId < val.id){
				highestId = val.id;
			}
		});
		$scope.reminders.push({id:highestId+1,message:newReminder.description,time:newReminder.time});
		$scope.addNewReminderVal = false;
	};

	$scope.cancel = function(){
		$scope.addNewReminderVal = false;
	};

	$scope.editReminder = function(reminder){

	};

	$scope.removeReminder = function(reminder){
		var index = 0, count = 0;
		angular.forEach($scope.reminders, function(val, key){
			if(val.id === reminder.id){
				index = count;
			}
			count += 1;
		});

		$scope.reminders.splice(index,1);
	};

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