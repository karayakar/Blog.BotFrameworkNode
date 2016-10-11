var restify = require('restify');
var builder = require('botbuilder');
var config = require('./Helpers/ConfigurationHelper');
var botHelper = require("./Helpers/BotHelper");
var visionService = require("./Services/VisionService");

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
    console.log(session.message);

    var extractedUrl = botHelper.extractUrl(session.message);

    if (extractedUrl === "") {
        session.send("Please, send me an image or link");
    }

    visionService.describeImage(extractedUrl, function (error, response, body) {
        session.send(visionService.describeImage(body));
    })
});