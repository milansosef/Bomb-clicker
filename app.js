// options
const port = process.env.port || 80;

const express = require('express');
	path = require('path');

// Express App
const app = express();

// static directory for client files
app.use('/', express.static(path.join(__dirname, 'docs')));

// Initialize routes
app.use('/', require('./routes/index.js'));

//Listen for requests
app.listen(port, function(){
	console.log("Now listening for requests. ("+port+")");
});
