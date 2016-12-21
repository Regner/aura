let Assistant = require('actions-on-google').ApiAiAssistant;
let request = require('request');

const ACTION_LOGIN_COUNT = 'aura.login.count';
const ACTION_YEAR = 'aura.year';
const ACTION_MARKET_PRICE = 'aura.market.price';
const ACTION_SHIT_TIER = 'aura.shit-tier-corp';
const ACTION_TIME = 'aura.time';

const ARG_EVE_ITEM = 'eve-item';
const ARG_MARKET_HUB = 'market-hub';

function year (assistant) {
  const baseYearSubtraction = 1898;
  const currentYear = new Date().getFullYear();

  assistant.tell('The current year is YC' + (currentYear - baseYearSubtraction));
}

function loginCount (assistant) {
  request('https://crest-tq.eveonline.com/', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);

      assistant.tell('There are currently ' + data.userCount_str + ' pilots logged into New Eden.');
    } else {
      assistant.tell('Sorry but it appears New Eden is dead. Please ask again later.');
    }
  });
}

function marketPrice (assistant) {

}

function shitTierCorp (assistant) {
  assistant.tell('Well that would obviously be Catastrophic Overview Failure.');
}

function time (assistant) {
  var time = new Date().toTimeString();

  // Much shit tier JS dev
  var cleanTime = time.substring(0, time.length - 18);

  assistant.tell('It is currently ' + cleanTime);
}

exports.root = function root (req, res) {
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  const assistant = new Assistant({request: req, response: res});

  let actionMap = new Map();

  actionMap.set(ACTION_LOGIN_COUNT, loginCount);
  actionMap.set(ACTION_YEAR, year);
  actionMap.set(ACTION_SHIT_TIER, shitTierCorp);
  actionMap.set(ACTION_TIME, time);

  assistant.handleRequest(actionMap);

  res.status(200);
};
