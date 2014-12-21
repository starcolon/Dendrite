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


*/

AVLTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
AVLTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
AVLTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------






// Export the namespace as a module, so the other js can make use of it
exports.AVLTree = AVLTree;