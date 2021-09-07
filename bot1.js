var token = "1916410180:AAHV6QnnnxFnCSy4Q4AFOX1xhrM6Xguh8s8";
var telegramUrl = "https://api.telegram.org/bot"+token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbwG52kyemggxcPWQTSh0sHDsvoqX0zneIXU0MENFd5l4FMOhrQ0g/exec";
var ssId = "196GxmWJT8cTsRrnSBohSx77YFKYCRtjDu7OCuDkg_JI";



function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook(){
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}


function sendText(id, text){
  var url = telegramUrl + "/sendMessage?chat_id=" + id +"&text="+text;
  var response = UrlFetchApp.fetch(url);
}

function doGet(e){
  return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e){
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name + " " + data.message.chat.last_name;
  var answer = "Салам " + name + "! Спасибо за обращение "+ text;
  sendText(id, answer);
  SpreadsheetApp.openById(ssId).getSheets()[0].appendRow([new Date(), id, name, answer]);
}