//-------------------------------------------------
//  Red-Black Tree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: March 2015
//      http://starcolon.com/
//-------------------------------------------------

var SelfBalancingTree = require('./selfbalancetree.js');


// DESIGN NODE: Always use fluent interface
/*

*/

RedBlackTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// Selfbalancing tree inherits Binary tree
RedBlackTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
RedBlackTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;
RedBlackTree.prototype.redNodes = [];
RedBlackTree.prototype.blackNodes = [];

// Overrides










// Export the module
exports.RedBlackTree = RedBlackTree;



