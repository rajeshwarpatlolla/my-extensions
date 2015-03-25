var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {

	$scope.reminders = [];

	$scope.addNewReminderVal = false;

	var getterSetters = {
		getValue : function(key, callback){
			chrome.storage.sync.get(key,function(res){
				callback(res);
			});
		},
		setValue : function(obj, callback){
			chrome.storage.sync.set({reminders:obj.reminders},function(){
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

	getterSetters.getValue('reminders', function(res) {
		console.log(res);
		$scope.$apply(function(){
			$scope.reminders = res.reminders;	
		})
	});	

	$scope.addNewReminder = function(){
		$scope.addNewReminderVal = true;
	};
	
	$scope.submitNewReminder = function(newReminder){
		var highestId = 10;
		angular.forEach($scope.reminders, function(val, key){
			if(highestId < val.id){
				highestId = val.id;
			}
		});

		$scope.reminders.push({id:highestId+1,message:newReminder.description,time:newReminder.time});
		getterSetters.setValue({'reminders': $scope.reminders}, function() {
			getNotification('Success!', 'Reminder added successfully.', 'images/accept-48.png');
			$scope.addNewReminderVal = false;
		});
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
		getterSetters.setValue({'reminders': $scope.reminders}, function() {
			getNotification('Success!', 'Reminder removed successfully.', 'images/accept-48.png');
			$scope.addNewReminderVal = false;
		});
	};

	function getNotification (type, msg, img) {
		chrome.notifications.create(type,{
			type: "basic",
			title: "Alert",
			message: msg,
			iconUrl: img
		},function(){});
	}

	function clearTheData () {
		getterSetters.removeValue('reminders',function(){
			document.getElementById("input_box_1").value = '';
			getNotification('Success!', 'Data cleared successfully.', 'images/accept-48.png');
		});
	}

});