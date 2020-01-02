// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var unirest = require("unirest");

var req = unirest("GET", "https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=398676b0-b366-411f-9fe2-99b0863d12dd");
var fs = require("fs")
req.end(function (res) {
	if (res.error) throw new Error(res.error);
   
    var toString = JSON.stringify(res);
    var pasredInfo = JSON.parse(toString);
    var def = pasredInfo.body[0].shortdef[0];
    var hwi = pasredInfo.body[0].hwi;

    console.log(def, hwi);
    //console.log(pasredInfo);

    var url_pdf = "https://media.merriam-webster.com/soundc11/v/volumi02.wav"
                    unirest.get(url_pdf)        
                    .as.binary(function (response) {                        
                       fs.writeFile("./test.wav", response.body, 'binary', function (err){
                          if (err) 
                             console.log(err);
                        }); 
                    })

});
