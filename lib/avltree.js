//-------------------------------------------------
//  AVLTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//      http://starcolon.com/
//-------------------------------------------------

var BinaryTree = require('./binarytree.js');
var SelfBalancingTree = require('./selfbalancetree.js');


// DESIGN NODE: Always use fluent interface
/*
	.balanceFactor()
	.retrace()				: Adjust the root's balance factor if necessary

*/

AVLTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
AVLTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
AVLTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------

AVLTree.prototype.balanceFactor = function(){
	return this.leftDepth() - this.rightDepth();
}


AVLTree.prototype.retrace = function(){
	// NOTE: [this] MUST reference the parent of the node which we want to perform retracing on.



	
}


AVLTree.prototype.avlPush = function(key){
	this.push(key, retrace);
}


AVLTree.prototype.avlAdd = function(tree){
	this.add(tree, retrace);
}

AVLTree.prototype.avlRemove = function(key){
	this.remove(key, retrace);
}



// Export the namespace as a module, so the other js can make use of it
exports.AVLTree = AVLTree;