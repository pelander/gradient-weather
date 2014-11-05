var Y_AXIS = 1;
var PartlyCloudy1, PartlyCloudy2, Sunny1, Sunny2, Cloudy1, Cloudy2, Snowing1, Snowing2, Rain1, Rain2, Fog1, Fog2;
var weather;
var loaded;
var main;
var name;

function setup() {
  createCanvas(windowWidth, windowHeight);

  PartlyCloudy1 = color(218,226,248);
  PartlyCloudy2 = color(214,164,164);

  Sunny1 = color(255,78,80);
  Sunny2 = color(249,212,35);

  Cloudy1 = color(236,233,230);
  Cloudy2 = color(255,255,255);

  Snowing1 = color(230,218,218);
  Snowing2 = color(39,64,70);

  Rain1 = color(97,97,97);
  Rain2 = color(155,197,195);

  Fog1 = color(117,127,154);
  Fog2 = color(215,221,232);      

  // Request the data from openweathermap
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,CA&units=imperial', function(w){
        loaded = true;
        weather = w.weather;
        main = w.main;
        name = w.name;
        createDiv( floor(main.temp) + '&deg;').addClass('temperature');
        createDiv( weather[0].main).addClass('wind');
        createDiv( name).addClass('wind');
        print(weather);
        print(main);
        print(name);
    });
}

function draw() {
  setGradient(0, 0, width/2, height, PartlyCloudy1, PartlyCloudy2, 1);

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
