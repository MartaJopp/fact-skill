const Alexa = require('alexa-sdk');

const APP_ID = undefined;
const SKILL_NAME = 'Silicon Valley Facts';
const GET_FACT_NAME = "Here's your Silicon Valley Fact: ";
const HELP_MESSAGE = "You can say tell me a fact about the valley, or you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

const data = ['It is a common but incorrect myth that Silicon Valley is bro culture. Silicon Valley is geek culture.',
    'A startup is a company designed to grow fast. Being newly founded does not in itself make a company a startup.',
    'Venture investors want to back intellectually honest entrepreneurs that can talk about strenghts and weaknesses.'
];

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context)
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'Launch Request': function () { //this request always gets called first we are sending it to the next intent
        this.emit('GetSiliconValleyFactIntent');
    },
    'GetSiliconValleyFactIntent': function () {
        const factSiliconValley = data;
        const factIndex = Math.floor(Math.random() * factSiliconValley.length);
        //multiplying the lenght of array (3) and randomizing
        const randomFact = factSiliconValley[factIndex];
        const speechOutput = GET_FACT_NAME + randomFact;

        this.response.speak(speechOutput);
        this.emit(':responseReady')
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');

    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    }
};
