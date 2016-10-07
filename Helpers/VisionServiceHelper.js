var request = require("request");
var config = require("./ConfigurationHelper");

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
