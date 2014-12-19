//-------------------------------------------------
//  SelfBalancingTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//      http://starcolon.com/
//-------------------------------------------------

var BinaryTree = require('./binarytree.js');

// Global namespace for the tree structure
var SCTree = SCTree || {};

// DESIGN NODE: Always use fluent interface
/*





*/

// Selfbalancing tree inherits Binary tree
SCTree.SelfBalancingTree.prototype = Object.create(BinaryTree.SCTree.BinaryTree.prototype);
SCTree.SelfBalancingTree.prototype.constructor = BinaryTree.SCTree.BinaryTree;

//-------------------------------------------------------

SCTree.SelfBalancingTree = function(key,value,leaves){
	BinaryTree.SCTree.BinaryTree.call(this,key,value,leaves);
}










// Export the namespace as a module, so the other js can make use of it
exports.SCTree = SCTree;