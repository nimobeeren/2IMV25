/**
 * A simple express app allowing us to store the positions to a server
 * 
 * The body of the POST method should contain the following:
 * filename - The filename
 * positions - the JSON file with the positions
 */

var express = require('express')
fs = require('fs');
url = require('url');
var app = express();

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/', function(req, res){
	var body = {
	    filename: req.body.filename,
	    positions: req.body.positions
	}

	filePath = `${__dirname}/public/${body.filename}.json`;

	fs.appendFile(filePath, body.positions, function(err) {
		if (err) { throw err }
		res.status(200).json({
			message: "File successfully written"
		})
    })

})

app.listen(8000);