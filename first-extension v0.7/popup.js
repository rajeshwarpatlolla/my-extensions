var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {
	
	$scope.reminders = [];

	$scope.addNewReminderVal = false;
	$scope.count = 0;

	var getterSetters = {
		getValue : function(key, callback){
			chrome.storage.sync.get(key,function(res){
				callback(res);
			});
		},
		setValue : function(key, obj, callback){
			if(key === 'reminders'){
				chrome.storage.sync.set({reminders:obj.reminders},function(){
					callback();
				});
			}else if(key === 'count'){
				chrome.storage.sync.set({count:obj.count},function(){
					callback();
				});
			}
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

	document.getElementById('get-all-reminders-btn').addEventListener('click',function(){
		getterSetters.getValue('reminders', function(res) {
			console.log(res.reminders);
		});
	});

	var bgPage = chrome.extension.getBackgroundPage();

	bgPage.setAlarm(2, function(res){
		console.log(res);
	});
	bgPage.getAlarm(2, function(){

	});
	bgPage.removeAlarm(2, function(){
		
	});

	getterSetters.getValue('count', function(res) {
		if(typeof res.count === 'undefined'){
			getterSetters.setValue('count', {'count':0}, function() {});
		}else if(typeof res.count === "number"){
			$scope.count = res.count;
		}

		if($scope.count > 0){
			getterSetters.getValue('reminders', function(res) {
				$scope.$apply(function(){
					$scope.reminders = res.reminders;	
				})
			});
		}
	});

	$scope.addNewReminder = function(){
		$scope.addNewReminderVal = true;
	};

	$scope.cancel = function(){
		$scope.addNewReminderVal = false;
	};

	$scope.submitNewReminder = function(newReminder){
		var highestId = 10;
		if($scope.count === 0){
			$scope.reminders = [];
		}

		angular.forEach($scope.reminders, function(val, key){
			if(highestId < val.id){
				highestId = val.id;
			}
		});

		var reminderTimeEpoch = new Date();

		var timeArray = newReminder.time.split(/[\s:]+/);
		timeArray[0] = Number(timeArray[0]);
		timeArray[1] = Number(timeArray[1]);
		timeArray[2] = timeArray[2].toUpperCase();

		if( timeArray[0] === 12 && timeArray[2] === 'AM'){
			reminderTimeEpoch.setHours(0);
		}else if( timeArray[0] !== 12 && timeArray[2] === 'AM'){
			reminderTimeEpoch.setHours(timeArray[0]);
		}else if( timeArray[0] === 12 && timeArray[2] === 'PM'){
			reminderTimeEpoch.setHours(timeArray[0]);
		}else if( timeArray[0] !== 12 && timeArray[2] === 'PM'){
			reminderTimeEpoch.setHours(timeArray[0] + 12);
		}
		
		reminderTimeEpoch.setMinutes(timeArray[1]);

		var diff = (+reminderTimeEpoch) - (+new Date());

		var newReminderObj = {
			id : (+(new Date()) + highestId),
			message : newReminder.description,
			reminderTime : newReminder.time,
			reminderTimeInEpoch : +reminderTimeEpoch,
			currentTimeInEpoch : (+new Date()),
			timeDifference : diff
		};

		console.log('newReminderObj',newReminderObj);

		if( newReminderObj.timeDifference < 0 ) {
			showMessage('error','Time has already passed');
		}else{
			$scope.reminders.push(newReminderObj);
			getterSetters.setValue('reminders',{'reminders': $scope.reminders}, function() {
				showMessage('success','Reminder added successfully');
				getterSetters.setValue('count', {'count':1}, function(res) {});
			});

			$scope.newReminder = {};
			$scope.addNewReminderVal = false;
		}
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
		getterSetters.setValue('reminders', {reminders: $scope.reminders}, function() {
			showMessage('success','Reminder removed successfully');
			$scope.addNewReminderVal = false;
			$scope.newReminder = {};
		});
	};

	function showMessage(type, msg){
		console.log('in showMessage',type, msg)
		$scope.messageClass = type + 'Msg';
		$scope.errorMessage = msg;
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
			getNotification('Success!', 'Data cleared successfully.', 'images/accept-32.png');
		});
	}










// script to bg page communication method 1 START
// chrome.extension.sendMessage({ msg: "startFunc" });
// script to bg page communication method 1 END

// script to bg page communication method 2 START
// chrome.runtime.getBackgroundPage(function(bkg){
// 	bkg.test(function(result) {
// 		chrome.notifications.create('',{
// 			type: "basic",
// 			title: "PriceRadar",
// 			message: result,
// 			iconUrl: "icon-32.png"
// 		},function(){});
// 	});	
// });
// script to bg page communication method 2 END

});


