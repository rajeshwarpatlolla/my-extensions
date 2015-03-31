var app = angular.module('myExtension', []);

app.controller('MainController', function($scope) {

// script to bg page communication method 1 START
chrome.extension.sendMessage({ msg: "startFunc" });
// script to bg page communication method 1 END

// script to bg page communication method 2 START
/*var bkg = chrome.extension.getBackgroundPage();
bkg.test(function(result) {
	chrome.notifications.create('',{
		type: "basic",
		title: "PriceRadar",
		message: result,
		iconUrl: "icon-48.png"
	},function(){});
});*/
// script to bg page communication method 2 END

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

	$scope.reminders.push({id:+(new Date()) + highestId,message:newReminder.description,time:newReminder.time});
	getterSetters.setValue('reminders',{'reminders': $scope.reminders}, function() {
		getNotification('Success!', 'Reminder added successfully.', 'images/accept-48.png');
		$scope.addNewReminderVal = false;			
		getterSetters.setValue('count', {'count':1}, function(res) {});
	});
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