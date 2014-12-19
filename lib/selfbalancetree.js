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
	.rotateLeft()
	.rotateRight()




*/

SelfBalancingTree = function(key,value,leaves){
	BinaryTree.BinaryTree.call(this,key,value,leaves);
}

// Selfbalancing tree inherits Binary tree
SelfBalancingTree.prototype = Object.create(BinaryTree.BinaryTree.prototype);
SelfBalancingTree.prototype.constructor = BinaryTree.BinaryTree;

//-------------------------------------------------------

SelfBalancingTree.prototype.rotateLeft = function(){
	// Rotate from:
	//
	//		pivot
	//		/ 	\
	//	  left  right
	//	  /  \		
	//		  L			to:  			left
	//									/	\
	//										pivot
	//										/	\
	//									   L	right
	//

	// Self = pivot

	if (this.isLeftBranchEmpty()){ 
		return this;
	}

	// Take nodes
	var pivot = this;
	delete pivot.leftBranch;
	pivot.leftBranch = null;

	var L = null;
	var left = this.leftBranch;
	if (!left.isRightBranchEmpty()){
		L = left.rightBranch;
		delete left.rightBranch;
		left.rightBranch = null;

		pivot.leftBranch = L;
	}
	
	// Now rotate, [left] becomes the root
	this.key = left.key;
	this.value = left.value;

	// Assemble [pivot] back to the tree
	this.rightBranch = pivot;

	return this;
}

SelfBalancingTree.prototype.rotateRight = function(){

}








// Export the namespace as a module, so the other js can make use of it
exports.SelfBalancingTree = SelfBalancingTree;

