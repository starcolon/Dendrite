//-------------------------------------------------
//	Dendrite
//	Developed & managed by StarColon Project
//	EST: December 2014
//-------------------------------------------------

(function loop(port){

	var app = require('express')();
	var colors = require('colors');
	var bodyParser = require('body-parser');
	

	// CONFIGURE THE SERVER -----------------------
	init(app,bodyParser);

	// MAP VERBS ----------------------------------
	app.get('/', httpRoot);
	app.post('/wake', httpWake);

	// START THE SERVER ---------------------------
	var server = app.listen(port, function(){
		var host = server.address().address;
		var port = server.address().port;

		console.log('****************************************************'.cyan);
		console.log('      DENDRITE starts!'.cyan );
		console.log('      listening carefully at:'.cyan + (host + ':' + port).toString().green );
		console.log('****************************************************'.cyan);
		console.log('');
	});

})(5666);


function init(app,bodyParser){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// Allow cross-origin XHR accesses
	app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  next();
	});
}


function timestamp(){
	var ts = new Date();
	return ts.toTimeString();
}

function httpRoot(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/ receives a request.'.green);
	console.log(req.body);

	resp.send('Dendrite!');
}


function httpWake(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/Wake receives a request.'.yellow);
	console.log(req.body);
}
