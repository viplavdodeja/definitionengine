
int led = 13;
int b1 = 10;
void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(b1, INPUT);
pinMode(led,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
if (digitalRead(b1) == 1){
  digitalWrite(led,HIGH);
  delay(5000);
}
}
