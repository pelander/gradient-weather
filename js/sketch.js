var Y_AXIS = 1;
var ba1, ba2;
var weather;
var loaded;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ba1 = color(221,214,243);
  ba2 = color(250,172,168);

  // Request the data from openweathermap
   loadJSON('http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco,US', function(w){
        loaded = true;
        weather = w.weather;
        print(weather);
    });
}



function draw() {
  setGradient(0, 0, width/2, height, ba1, ba2, 1);

}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
}

function gotWeather(weather) {
  
  // Get the wind speed
  var windmag = Number(weather.wind.speed);
  
  // Display as HTML elements
  var temperatureDiv = createDiv(floor(weather.main.temp) + '&deg;').addClass('temperature');
  var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>").addClass('wind');
}