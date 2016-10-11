var request = require("request");
var config = require("./../Helpers/ConfigurationHelper");

exports.describeImage = function _describeImage(url, callback) {

    var options = {
        method: 'POST',
        url: config.CONFIGURATIONS.COMPUTER_VISION_SERVICE.API_URL + "describe/",
        headers: {
            'ocp-apim-subscription-key': config.CONFIGURATIONS.COMPUTER_VISION_SERVICE.API_KEY,
            'content-type': 'application/json'
        },
        body: {url: url},
        json: true
    };

    request(options, callback);

};

exports.extractCaption = function _extractCaption(bodyMessage) {

    if (typeof bodyMessage.description === "undefined") return "";

    var desc = bodyMessage.description;

    if (typeof desc.captions !== "undefined" &&
        desc.captions.length > 0) {
        return desc.captions[0].text;
    }

    return "Oops, I can't recognize it :( !";
};
