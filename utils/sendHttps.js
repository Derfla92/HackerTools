const https = require("https");
const { prependListener } = require("process");


const sendHttps = (message,options,callBack) => {



    var req = https.request(options, (response) => {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
    
        response.on('end', function () {
            callBack(str)
        });
    });
    
    
    req.write(message);
    req.end();

}

module.exports = sendHttps