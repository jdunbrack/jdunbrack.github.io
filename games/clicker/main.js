const $cashPerTick = $('#cash-per-tick');
const $cashPerClick = $('#cash-per-click');

var cash = 0;
var tickrate = 1000;
var tickCounter = 0;
var clickCounter = 0;

var powers = [
  {
    level: 1,
    cost: 10,
    gain: 1,
    costGrowth: 1.12,
    purchased: 0,
    $button: $('#power1')
  },
  {
    level: 0,
    cost: 10000,
    gain: 1,
    costGrowth: 1.20,
    purchased: 0,
    $button: $('#power2')
  }
];
var pushers = [
  {
    level: 0,
    cost: 10,
    gain: 1,
    costGrowth: 1.1,
    purchased: 0,
    $button: $("#pusher1")
  },
  {
    level: 0,
    cost: 1000,
    gain: 1,
    costGrowth: 1.16,
    purchased: 0,
    $button: $("#pusher2")
  },
  {
    level: 0,
    cost: 100000,
    gain: 1,
    costGrowth: 1.21,
    purchased: 0,
    $button: $("#pusher3")
  },
  {
    level: 0,
    cost: 10000000,
    gain: 1,
    costGrowth: 1.26,
    purchased: 0,
    $button: $('#pusher4')
  }
];
var tickers = [
  {
    level: 0,
    cost: 10,
    gain: 1,
    costGrowth: 1.25,
    purchased: 0,
    $button: $('#ticker1'),
  },
  {
    level: 0,
    cost: 10000,
    gain: 1,
    costGrowth: 1.35,
    purchased: 0,
    $button: $('#ticker2'),
    
  }
];


var gameLoop = function () {
  tick();
  draw();
  setTimeout(gameLoop, parseInt(tickrate));
}

var tick = function update() {
  cash += pushers[0].gain * pushers[0].level;
  if (tickCounter % 10 === 0) {
    cascade();
    tickUpdate();
  }
  tickCounter++;
}

function draw() {
  drawPushers();
  drawPowers();
  drawTickers();
  $("#cash").text("Cash: $" + cash);
  $("#ticks").text("Ticks: 1 / " + parseInt(tickrate) + "ms");
  $cashPerTick.text("Cash per tick: $" + pushers[0].gain * pushers[0].level);
  $cashPerClick.text("Cash per click: $" + powers[0].gain)
}

function drawPushers() {
  for (var i = 0; i < pushers.length; i++) {
    $(".pusher" + (i + 1) + "#level").text("Level: " + pushers[i].level);
    $(".pusher" + (i + 1) + "#cost").text("Cost: $" + pushers[i].cost);
  }
}
function drawPowers() {
  for (var i = 0; i < powers.length; i++) {
    $(".power" + (i + 1) + "#level").text("Level: " + powers[i].level);
    $(".power" + (i + 1) + "#cost").text("Cost: $" + powers[i].cost);
  }
}
function drawTickers() {
  for (var i = 0; i < tickers.length; i++) {
    $(".ticker" + (i + 1) + "#level").text("Level: " + tickers[i].level);
    $(".ticker" + (i + 1) + "#cost").text("Cost: $" + tickers[i].cost);
  }
}

function cascade() {
  for (var i = 1; i < pushers.length; i++) {
    pushers[i - 1].level += pushers[i].gain * pushers[i].level;
  }
  for (var i = 1; i < tickers.length; i++) {
    tickers[i - 1].level += tickers[i].gain * tickers[i].level;
  }
}

function tickUpdate() {
  tickrate = 1000 / Math.pow(1.8, tickers[0].level);
  
}

$(".click").click(() => {
  cash += powers[0].gain;
  if (clickCounter % 20 === 0) {
    for (var i = 1; i < powers.length; i++) {
      powers[i - 1].level += powers[i].gain * powers[i].level;
    }
  }
  draw();
  clickCounter++;
});

powers[0].$button.click(() => {
  if (cash >= powers[0].cost) {
    cash -= powers[0].cost;
    powers[0].level++;
    powers[0].cost = parseInt(powers[0].costGrowth * powers[0].cost);
    powers[0].gain++;
  }
  draw();
});

pushers[0].$button.click(() => {
  if (cash >= pushers[0].cost) {
    cash -= pushers[0].cost;
    pushers[0].level++;
    pushers[0].cost = parseInt(pushers[0].costGrowth * pushers[0].cost);
  }
  draw();
});

tickers[0].$button.click(() => {
  if (cash >= tickers[0].cost) {
    cash -= tickers[0].cost;
    tickers[0].cost = parseInt(tickers[0].costGrowth * tickers[0].cost);
    tickers[0].level++;
    tickUpdate();
  }
  draw();
});

powers[1].$button.click(() => {
  if (cash >= powers[1].cost) {
    cash -= powers[1].cost;
    powers[1].level++;
    powers[1].cost = parseInt(powers[1].costGrowth * powers[1].cost);
  }
  draw();
});

pushers[1].$button.click(() => {
  if (cash >= pushers[1].cost) {
    cash -= pushers[1].cost;
    pushers[1].level++;
    pushers[1].cost = parseInt(pushers[1].costGrowth * pushers[1].cost);
  }
  draw();
});

pushers[2].$button.click(() => {
  if (cash >= pushers[2].cost) {
    cash -= pushers[2].cost;
    pushers[2].level++;
    pushers[2].cost = parseInt(pushers[2].costGrowth * pushers[2].cost);
  }
  draw();
});

pushers[3].$button.click(() => {
  if (cash >= pushers[3].cost) {
    cash -= pushers[3].cost;
    pushers[3].level++;
    pushers[3].cost = parseInt(pushers[3].costGrowth * pushers[3].cost);
  }
  draw();
});

tickers[1].$button.click(() => {
  if (cash >= tickers[1].cost) {
    cash -= tickers[1].cost;
    tickers[1].cost = parseInt(tickers[1].costGrowth * tickers[1].cost);
    tickers[1].level++;
  }
  draw();
});

$("#dropdown").hide();
$("#output").click(() => {
  $("#dropdown").slideToggle();
});

gameLoop();