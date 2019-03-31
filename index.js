

'use strict';
const Alexa = require('alexa-sdk');
const https = require('https');
const http = require('http');
const APP_ID = 'amzn1.ask.skill.8b62a979-1144-4c7d-b368-844a54d2d361';

const HELP_MESSAGE = 'You can say what should I wear today, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

var latitude;
var longtitude;
var response = "";
var location;
var location_orig;
var day = 'today';
var i = 0;


//=========================================================================================================================================
//Clothes users should wear
//=========================================================================================================================================

var BringJacket = ['you should bring a jacket with you for later in the day.', 'a nice windbreaker for later at night should be good.', 'take a warm clothing for later at night.'];
var SummerClothes = [ 'It\'ll be nice to wear shorts and a tshirt..', 'you should wear short sleeves and shorts..' ,'You should wear lose comfy clothes to stay cool..'];
var WinterClothes = ['It\'ll be nice to wear a sweater and warm pants..' ,'you should wear warm clothing to stay warm..', 'It\'ll be nice to wear a coat or a parka..'];
var MediumClothes = ['It will be nice to wear a flannel...tshirt or shorts will be too cold...', 'It will be nice to wear a thin cardigan...tshirt or shorts will be too cold...', 'It will be nice to wear jeans and a thin shirt'];
const handlers = {

    'LaunchRequest': function () {
        const welcome = 'Hello! I\'m your personal stylist. How can I help?';
        this.emit(':ask', welcome);

    },

    'StylistIntent': function () {


        var dayValue = this.event.request.intent.slots.day.value;
        if(dayValue=='tomorrow')
        {
                i= 1;
                day = 'tomorrow';
        }


        location_orig = this.event.request.intent.slots.city.value;
        location = location_orig.replace(/ /,'%20');

        var options = {
        host: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/weather?appid=b4a0745dca28f12ed7ad2011bb9434c6&q=' + location,
        method: 'GET',
        }

        var req = https.request(options, res => {

        var responseString = "";

        res.on('data', chunk => {
            responseString += chunk;
        });

        res.on('end', () => {
            var result = JSON.parse(responseString);
            latitude = `${result.coord.lat}`;
            longtitude = `${result.coord.lon}`;
            this.emitWithState('weatherIntent');

        });

    });

    req.end();

    },

    'weatherIntent' : function(){


        var options2 = {
        host: 'api.darksky.net',
        port: 443,
        path: '/forecast/5692263836d923b00bd444e4a35cc78b/' + latitude +','+ longtitude,
        method: 'GET',
        }

        var req = https.request(options2, res => {

        var responseString = "";

        res.on('data', chunk => {
            responseString += chunk;
        });

        res.on('end', () => {

            var result2 = JSON.parse(responseString);

            const high_temp = `${result2.daily.data[i].temperatureMax}`;
            const low_temp = `${result2.daily.data[i].temperatureMin}`;
            const icon = `${result2.daily.data[i].icon}`;
            const summary = day + ' in ' + location_orig + ', it\'s ' + `${result2.daily.data[i].summary}`;

            var j = Math.floor((Math.random() * 3) + 0);


            if(high_temp>=75)
                response = SummerClothes[j];
            if(high_temp<=55)
                response = WinterClothes[j];
            if(high_temp<75 && high_temp>55)
                response = MediumClothes[j];
            if(high_temp-low_temp >= 20)
               response +=  ', and ' +  BringJacket[j];
            if(icon.includes('rain')==true)
                response += '  Don\'t forget to take an umbrella!'
            if(icon.includes('clear')==true)
                response += '  Also, take a pair of sunglasses with you, it\'s clear out!';


            this.emit(':tell',summary +' ' + response);
            i = 0;
            day = 'Today';

        });

    });

    req.end();

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
    },

};


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context,callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
