// Add express to the project
var express = require('express');
var app = express();

// Add filesystem to the project
var fs = require('fs');

// Connects to the cloud server
const PORT = process.env.PORT || 8081;
var http = require("http");

// Add body parser to the project
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
    // Send HTML file index.html to the server
    res.sendFile(__dirname + '/index.html');
});

app.get('/guestbook', function(req, res){
    res.sendFile(__dirname + '/guestbook.html');
    // Get json data from data.json
    var data = require('./data.json');

    // Add the json data to a table
    var results = '<table border="1" > ';

    for (var i = 0; i < data.length; i++){
        results +=
        '<tr>'+
        '<td>'+data[i].username+'</td>'+
        '<td>'+data[i].country+'</td>'+
        '<td>'+data[i].message+'</td>'+
        '</tr>';
    }
    // Send the table to the server
    res.send(results);
});

app.get('/newmessage', function(req, res){
    // Send HTML file newmessage.html to the server
    res.sendFile(__dirname + '/newmessage.html')
});

app.post('/newmessage', function(req, res){
    // Access json data from data.json
    var data = require('./data.json');

    // Add data to the json file
    data.push({
        "username": req.body.username+"\n",
        "country": req.body.country+"\n",
        "message": req.body.message+"\n",
    });
    
    var jsonStr = JSON.stringify(data);

    fs.writeFile('data.json', jsonStr, (err)=> {
        if(err) throw err;
        console.log("Data saved");
    });
    // Send info to the HTML that data was saved
    res.send("Data saved to the file");
    res.send('<a href="/">Back to the Front Page</a>');
});

app.get('/ajaxmessage', function(req, res){
    // Send HTML file ajaxmessage.html to the server
    res.sendFile(__dirname + '/ajaxmessage.html')
});

app.post('/ajaxmessage', function(req, res){
});

app.get('*', function(req, res){
    res.send('Cannot find the page :(')
});

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});


