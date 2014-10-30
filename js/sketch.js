// Credit goes to Varun Vachhar (varunvachhar@gmail.com) for the motion tween.

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255, 25);

  // Request the data from openweathermap
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&units=imperial', gotWeather);

  newTween();
}


function draw() {
  background(255);

  for (var i = 0; i <= width; i++) {
    var j = map(i, 0, width, 0, 1);
    var c = lerpColor(c1, c2, j);
    stroke(c);
    line(i, 0, i, height);
  }
}


function newTween() {
  var gradStart = randomGradient();
    c1 = gradStart[0];
    c2 = gradStart[1];

  t = new MOTION.Tween(30)
            .add(this, 'c1', gradStart[0])
            .add(this, 'c2', gradStart[1])
            .easing(Sine.InOut)
            .relative()
            .play()
            .onEnd(function() {
              var gradEnd = randomGradient();
              t.get('c1').setEnd(gradEnd[0]);
              t.get('c2').setEnd(gradEnd[1]);
              t.play();
            });
}


function randomGradient() {
  var gradient = gradients[Math.floor( Math.random() * gradients.length )];

  var _c1 = hexToRgb(gradient.colour1);
  var _c2 = hexToRgb(gradient.colour2);

  return [color(_c1.r, _c1.g, _c1.b), color(_c2.r, _c2.g, _c2.b)];
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

function gotWeather(weather) {
  
  // Get the wind speed
  var windmag = Number(weather.wind.speed);
  
  // Display as HTML elements
  var temperatureDiv = createDiv(floor(weather.main.temp) + '&deg;').addClass('temprature');
  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>").addClass('wind');
}