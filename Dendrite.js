//-------------------------------------------------
//	Dendrite
//	Developed & managed by StarColon Projects
//	EST: December 2014
// 		http://starcolon.com/
//-------------------------------------------------

var tree = null;

(function loop(port){

	var app = require('express')();
	var colors = require('colors');
	var bodyParser = require('body-parser');
	var treeBinary = require('./lib/binarytree.js');
	var treeSelfBalance = require('./lib/selfbalancetree.js');

	// Initialize the binary tree
	tree = new treeSelfBalance.SelfBalancingTree(50,{});

	// CONFIGURE THE SERVER -----------------------
	init(app,bodyParser);

	// MAP REST PARAMETERS ------------------------
	app.param('n', function(req,resp,next,n){
		if (typeof(n)=='undefined' || n==null){
			resp.send('Please specify integer param: n');
			return;
		}
		req.n = n;
		return next();
	});

	// MAP REST VERBS -----------------------------
	app.get('/', httpRoot);
	app.post('/wake', httpWake);
	app.get('/push/:n', httpPush);
	app.get('/rem/:n', httpRemove);

	// START THE SERVER ---------------------------
	var server = app.listen(port, function(){
		var host = server.address().address;
		var port = server.address().port;

		console.log('****************************************************'.cyan);
		console.log('      DENDRITE starts!'.cyan );
		console.log('      listening carefully at:'.cyan + (host + ':' + port).toString().green );
		console.log('****************************************************'.cyan);
		console.log('');
		displayTree();
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


function displayTree(){
	console.log(tree.toKeyArray());
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


function httpPush(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/push receives a request.'.green);
	tree.push(req.n);
	displayTree();

	resp.send(tree.toKeyArray());
}

function httpRemove(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/remove receives a request.'.green);
	tree.remove(req.n);
	displayTree();

	resp.send(tree.toKeyArray());
}


function httpWake(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/Wake receives a request.'.yellow);
	console.log(req.body);
}


