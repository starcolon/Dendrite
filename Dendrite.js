//-------------------------------------------------
//	Dendrite
//	Developed & managed by StarColon Projects
//	EST: December 2014
// 		http://starcolon.com/
//-------------------------------------------------

(function loop(port){

	var app = require('express')();
	var colors = require('colors');
	var bodyParser = require('body-parser');
	var treeBinary = require('./lib/binarytree.js');
	var treeSelfBalance = require('./lib/selfbalancetree.js');

	// Initialize the binary tree
	var tree = new treeSelfBalance.SelfBalancingTree(50,{});
	tree.push(75).push(87).push(100).push(51).push(32).push(0).push(15).push(24);
	console.log('BEFORE RIGHT ROTATION: Root = ' + tree.key );
	tree.log();
	tree.rotateRight().rotateRight().rotateRight();
	console.log('AFTER RIGHT ROTATION x3: Root = ' + tree.key)
	tree.log();
	tree.rotateLeft().rotateLeft();
	console.log('AFTER LEFT ROTATION x2: Root = ' + tree.key);
	tree.log();
	console.log('----');
	console.log('Tree depth: ' + tree.depth());


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


