const express = require('express')
const app = express()
const port = 3000
var unirest = require("unirest");
var fs = require("fs")
app.set('view engine', 'pug')
app.use(express.static('./'))
var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 20

app.get('/',function(req,res)
{
    res.render('index', { title: 'Hey', message: 'Hello there!' })

})

app.get('/dictionary/:wrd',function(req,res)
{
    var wrd = req.params.wrd;
    var req1 = unirest("GET", "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ wrd + "?key=398676b0-b366-411f-9fe2-99b0863d12dd");
    req1.end(function (res1) {
        if (res1.error) throw new Error(res1.error);
       
        var toString = JSON.stringify(res1);
        var pasredInfo = JSON.parse(toString);
        /*
        if (typeof pasredInfo.body==="undefined") {
            res.render('word', { meaning: wrd + " could not be found. Try again"})
        }
        */
       lcd.print(wrd);
       try{
        var def = pasredInfo.body[0].shortdef[0];
        var hwi = pasredInfo.body[0].hwi;
        var snd = hwi.prs[0].sound.audio;
        var ref = snd.charAt(0);
       }
        catch(err){
                res.render('word', { meaning: wrd + " could not be found. Try again."})
                return
        }
       //console.log(wrd);
       // console.log(pasredInfo.body[0]);
        console.log(def, hwi);
        console.log(hwi.prs[0].sound);

        var url_pdf = "https://media.merriam-webster.com/soundc11/" + ref + "/" + snd +  ".wav"
                    unirest.get(url_pdf)        
                    .as.binary(function (response) {                        
                       fs.writeFile("./word.wav", response.body, 'binary', function (err){
                          if (err) 
                             console.log(err);
                        }); 
                    })
      res.render('word', { meaning:def})
      //res.send(def)
    });
    

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//from here is LCD




    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  });

  // Tell the LCD you will use these characters:
  //lcd.useChar("check");
  //lcd.useChar("heart");
  //lcd.useChar("duck");

  // Line 1: Hi rmurphey & hgstrp!
  //lcd.clear().print("rmurphey, hgstrp");
 // lcd.cursor(1, 0);

  // Line 2: I <3 johnny-five
  // lcd.print("I").write(7).print(" johnny-five");
  // can now be written as:
  lcd.print(req);

  //this.wait(3000, function() {
   // lcd.clear().cursor(0, 0).print("I :check::heart: 2 :duck: :)");
 // });

  this.repl.inject({
    lcd: lcd
  });
});
