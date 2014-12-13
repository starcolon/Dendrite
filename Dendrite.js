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

	// START THE SERVER ---------------------------
	var server = app.listen(port, function(){
		var host = server.address().address;
		var port = server.address().port;

		console.log('****************************************************'.cyan);
		console.log('      DENDRITE starts!'.cyan );
		console.log('      listening carefully at:'.cyan + (host + ':' + port).toString() );
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