//-------------------------------------------------
//  SelfBalancingTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//      http://starcolon.com/
//-------------------------------------------------

var BinaryTree = require('./binarytree.js');


// DESIGN NODE: Always use fluent interface
/*





*/

SelfBalancingTree = function(key,value,leaves){
	BinaryTree.BinaryTree.call(this,key,value,leaves);
}

// Selfbalancing tree inherits Binary tree
SelfBalancingTree.prototype = Object.create(BinaryTree.BinaryTree.prototype);
SelfBalancingTree.prototype.constructor = BinaryTree.BinaryTree;

//-------------------------------------------------------

SelfBalancingTree.prototype.rotateLeft = function(){
	
}










// Export the namespace as a module, so the other js can make use of it
exports.SelfBalancingTree = SelfBalancingTree;

