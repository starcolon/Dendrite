//-------------------------------------------------
//	Dendrite
//	Developed & managed by StarColon Projects
//	EST: December 2014
// 		http://starcolon.com/
//-------------------------------------------------
/*
/*	Usage: Run [dendrite.js] via node.js
/*
/*		Dendrite automatically initializes an AVL tree
/*		through the global session. Simply manipulates 
/*		it through simple RESTful API as follow:
/*
/*		127.0.0.1:5666/push/{val}			<=== Add {val} to the AVL tree.
/*		127.0.0.1:5666/rem/{val}			<=== Remove {val} from the AVL tree
/*		127.0.0.1:5666/reset 				<=== Reset the AVL tree
/*
/*
/*
/*		NOTE: After every add/remove operations 
/*			Dendrite automatically examines the balance of 
/*			the tree and retrace the tree in rebuild the balance.
/*===========================================================================================*/

var tree = null;

(function loop(port){

	var app = require('express')();
	var colors = require('colors');
	var bodyParser = require('body-parser');
	var avlTree = require('./lib/avltree.js');

	// Initialize the binary tree
	tree = new avlTree.AVLTree(50,{});

	// CONFIGURE THE SERVER -----------------------
	init(app,bodyParser);

	// MAP REST PARAMETERS ------------------------
	app.param('n', function(req,resp,next,n){
		if (typeof(n)=='undefined' || n==null){
			resp.send('Please specify integer param: n');
			return;
		}
		req.n = parseInt(n);
		return next();
	});

	// MAP REST VERBS -----------------------------
	app.get('/', httpRoot);
	app.post('/wake', httpWake);
	app.get('/reset', httpReset);
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
	console.log('Tree depth: ' + tree.depth());
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

function httpReset(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/reset receives a request.'.green);
	tree.clear();
	displayTree();

	resp.send(tree.toKeyArray());
}


function httpWake(req,resp,next){
	console.log(timestamp().toString().gray + '>>> Dendrite/Wake receives a request.'.yellow);
	console.log(req.body);
}


