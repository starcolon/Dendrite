//-------------------------------------------------
//  SplayTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: March 2015
//      http://starcolon.com/
//-------------------------------------------------

var BinaryTree = require('./binarytree.js');
var SelfBalancingTree = require('./selfbalancetree.js');


// DESIGN NODE: Always use fluent interface
/*
	.splay(key)			: perform a splay operation on the specified node
*/

SplayTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
SplayTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
SplayTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------

SplayTree.prototype.splay = function(key) {
	var self = this;

	// Stops splaying if the root node is already the key
	if (this.key==key){
		console.log('Splay stops!')
		return self;
	}
	if (key<this.key && this.isLeftBranchEmpty())
		return self;
	if (key>=this.key && this.isRightBranchEmpty())
		return self;

	// Recursively until the `key‘ becomes the root node
	//--------------------------------------------------
	if (this.key<key){
		// Splay node on the left branch
		console.log('Splay left node');
		SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(self);
		self = SplayTree.splay.apply(self,[key]);
	}
	else (this.key>key){
		// Splay node on the right branch
		console.log('Splay right node');
		SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(self);
		self = SplayTree.splay.apply(self,[key]);
	}

	return self;
};

SplayTree.prototype.push = function(key,value) {
	SelfBalancingTree.SelfBalancingTree.prototype.push.call(this, key, value);

	// Splay the recently added node
	this.splay(key);
	return this;
};

SplayTree.prototype.add = function(tree) {
	SelfBalancingTree.SelfBalancingTree.prototype.add.call(this, tree);

	// Splay the root of the tree
	this.splay(tree.key);
	return this;
};

// Export the module for external use

exports.SplayTree = SplayTree;