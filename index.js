
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

let ejs = require('ejs');

 app.listen(3000, function(){
     console.log('running app on port 3000');
 });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')




app.get('/', function (req, res) {
   res.render('search');
})

app.get('/results', function(req, res){
    var search = req.query.search;
    var url = 'https://www.omdbapi.com/?s=' + search + '&plot=short&r=json&tomatoes=true&apikey=2c87bef1';
   
    request(url, function(error, response, body){
        if(!error){
            var data = JSON.parse(body)
            res.render('results', {data: data});
        }
    });


  
});

//writing to a json file
app.get('/login', function(req, res){
const fs = require('fs');

let information = {  
    email: '',
    password: ''
};

let data = JSON.stringify(information, null, 2);

fs.writeFile('info.json', data, (err) => {  
    if (err) throw err;
    console.log('Data written to file');
});

console.log('after');  
})

//const fs = require('fs');

//let information = JSON.stringify(info);  
//fs.writeFileSync('info.json', information);  

