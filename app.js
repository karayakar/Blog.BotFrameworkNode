var restify = require('restify');
var builder = require('botbuilder');
var config = require('./Helpers/ConfigurationHelper');
var visionService= require("./Helpers/VisionServiceHelper");

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: config.CONFIGURATIONS.CHAT_CONNECTOR.APP_ID,
    appPassword: config.CONFIGURATIONS.CHAT_CONNECTOR.APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    visionService.describeImage("http://www.w3schools.com/css/img_fjords.jpg", function(error, response, body){
        session.send(response);
    });
});