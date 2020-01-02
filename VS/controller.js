var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function(){

  var led = new five.Led(13);

  led.blink(1000)
    // set up the LCD's number of columns and rows:
    //lcd.begin(16, 2);
    // Print a message to the LCD.
    //lcd.print("You're Gay :)");
  }
)