chrome.alarms.onAlarm.addListener(function () {
  chrome.notifications.create('', {
    type: 'basic',
    title: 'Remind Me',
    message: 'my  life',
    iconUrl: "icon-48.png"
  }, function () {
  });
});

var setAlarm = function (x, callback) {
  callback(123);
};

var getAlarm = function (x, callback) {
};

var removeAlarm = function (x, callback) {
};

// Creates an alarm
// chrome.alarms.create({when: Date.now()+5000});

var count = '4';
//To set the title of the extension
chrome.browserAction.setTitle({title: 'Remind Me'});

//To set the badge for the extension
chrome.browserAction.setBadgeText({text: count});

//To set the color of the
chrome.browserAction.setBadgeBackgroundColor({color: [100, 100, 150, 255]});

// ============================================================================
// script to bg page communication method 1
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "startFunc") {
      func();
    }
  }
);

var func = function () {
  var mode = 'normal';
  console.log(chrome.tab);
  /*if (chrome.tab.incognito) {
   mode = 'in cognito'
   }*/
  chrome.notifications.create('', {
    type: "basic",
    title: "PriceRadar",
    message: mode,
    iconUrl: "icon-48.png"
  }, function () {
  });
};
// script to bg page communication method 1

// script to bg page communication method 2
function test(func) {
  func.apply(this, ['foo', 'bar']);
}
// script to bg page communication method 2


// window.addEventListener("load", clickHandler);

/*setTimeout(function(){
 chrome.notifications.create('',{
 type: "basic",
 title: "PriceRadar",
 message: "Item added successfully bg",
 iconUrl: "icon-48.png"
 },function(){});
 },2000);*/

// chrome.alarms.create({when: Date.now()+5000});
// chrome.alarms.clear('', function(){})
