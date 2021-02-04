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
    .option('-m, --message <string>', 'message to send for sms', 'testing')
    .parse()
const options = program.opts()
console.log(options)

if (options.action !== 'call' && options.action !== 'sms') {
    console.log(chalk.red(`'${options.action}' is an Invalid Action, please select: 'call' or 'sms'`))
    process.exit(0)
}

let MAX_INSTANCE_COUNT = options.instances !== 'unlimited' ? parseInt(options.instances) : 'unlimited'
let ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID; //Config Here
let AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN; //Config Here
let TWIML_URL = process.env.TWILIO_TWIML; //Config Here
let MSG_SERVICE_SID = process.env.MSG_SID; //Config Here
let numbers = options.numbers;
const delay = parseInt(options.delay);

let client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

let instanceCount = 0;
let index = 0;

if (options.action === 'call') {
    const callPhone = () => {
        if (typeof (MAX_INSTANCE_COUNT) === 'number' && instanceCount >= MAX_INSTANCE_COUNT) {
            console.log(`Terminating, max call count reached: ${MAX_INSTANCE_COUNT}`)
            process.exit(0)
        }
        instanceCount += 1
        client.calls.create({
            url: TWIML_URL,
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
        setInterval(callPhone, delay);
    };
    launchCall()
} else {
    const smsPhone = () => {
        if (typeof (MAX_INSTANCE_COUNT) === 'number' && instanceCount >= MAX_INSTANCE_COUNT) {
            console.log(`Terminating, max message count reached: ${MAX_INSTANCE_COUNT}`)
            process.exit(0)
        }
        instanceCount += 1
        client.messages.create({
            body: options.message,
            messagingServiceSid: MSG_SERVICE_SID,
            to: options.target
        }, function (err, message) {
            if (message) {
                console.log(message)
            } else {
                console.log("ERROR: " + err);
            }
        })
        // loop through numbers
        index += 1
        index %= numbers.length
    }
    const launchSms = () => {
        smsPhone();
        setInterval(smsPhone, delay);
    };
    launchSms()
}
