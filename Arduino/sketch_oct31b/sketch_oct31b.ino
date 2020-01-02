 #include "Keyboard.h"

void setup() {
  // open the serial port
  Serial.begin(9600);
  // initialize control over the keyboard
  Keyboard.begin();
}

void loop() {
 
  // check for incoming serial data
  if(Serial.available() > 0) {
  //read incoming serial data
  char inChar = Serial.read();
  // Type the next ASCII value from what was received
  Keyboard.print(inChar + 1);
  }
}
