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

*/

SplayTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
SplayTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
SplayTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------




// Export the module for external use
exports.SplayTree = SplayTree;