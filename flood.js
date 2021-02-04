/*
Misanya Liui started this code
7/12/17
Ethan Wessel continuing for own personal project
10/24/2017
*/

require('dotenv').config()
const chalk = require('chalk')
const { program } = require("commander");

function commaSeparatedList(value, dummyPrevious) {
    return value.split(',');
}

program
    .requiredOption('-t, --target <string>', 'target to call')
    .requiredOption('-a, --action <string>', 'call or message', 'call')
    .requiredOption('-n, --numbers <items>', 'numbers to use', commaSeparatedList)
    .option('-i, --instances <string>', 'number of instances', 'unlimited')
    .option('-d, --delay <string>', 'delay between calls/messages in seconds', '10')
    .parse()
const options = program.opts()
console.log(options)

if (options.action !== 'call' && options.action !== 'sms') {
    console.log(chalk.red(`'${options.action}' is an Invalid Action, please select: 'call' or 'sms'`))
    process.exit(0)
}

let maxCallCount = options.instances !== 'unlimited' ? parseInt(options.instances) : 'unlimited'
let accountSid = process.env.TWILIO_ACCOUNT_SID; //Config Here
let authToken = process.env.TWILIO_AUTH_TOKEN; //Config Here
let twimlUrl = process.env.TWILIO_TWIML; //Config Here
let client = require('twilio')(accountSid, authToken);

if (options.action === 'call') {
    let numbers = options.numbers;

    const calltimeout = 3000;// call time out = 3s.

    let callCount = 0;
    let index = 0;
    const callPhone = () => {
        if (typeof (maxCallCount) === 'number' && callCount >= maxCallCount) {
            console.log(`Terminating, max call count reached: ${maxCallCount}`)
            process.exit(0)
        }
        callCount += 1

        client.calls.create({
            url: twimlUrl,
            to: options.target,
            from: numbers[index++],
            record: true
        }, function (err, call) {
            if (call) {
                console.log("SID: " + call.sid);
                console.log("Calling " + options.target + " from " + numbers[index]);
            } else {
                console.log("ERROR: " + err);
            }
        });
        // loop through numbers
        index += 1
        index %= numbers.length
    }

    const launchCall = () => {
        callPhone();
        setInterval(callPhone, calltimeout);
    };

    launchCall()
} else {

}
