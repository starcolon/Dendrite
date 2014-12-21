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
	.rotateRight()
	.rotateLeft()




*/

SelfBalancingTree = function(key,value,leaves){
	BinaryTree.BinaryTree.call(this,key,value,leaves);
}

// Selfbalancing tree inherits Binary tree
SelfBalancingTree.prototype = Object.create(BinaryTree.BinaryTree.prototype);
SelfBalancingTree.prototype.constructor = BinaryTree.BinaryTree;

//-------------------------------------------------------

SelfBalancingTree.prototype.rotateRight = function(){
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

	// Take node parameters
	var pivot = this.clone();
	pivot.removeLeftBranch();

	var left = null, L = null;
	left = this.leftBranch.clone();
	this.removeLeftBranch();

	if (!left.isRightBranchEmpty()){
		L = left.rightBranch.clone();
		left.removeRightBranch();
	}

	// Now rotate
	this.set(left);
	this.rightBranch = pivot.clone();

	return this;
}

SelfBalancingTree.prototype.rotateLeft = function(){
	// Rotate from:
	//
	//		pivot
	//		/ 	\
	//	  left  right
	//	  /  \	/	\
	//		  	R		to:  			right
	//									/	\
	//								  pivot	
	//								  /	 \
	//								left  R	  	
	//

	// Self = pivot

	if (this.isRightBranchEmpty()){
		return this;
	}

	// Take the node parameters
	var pivot = this.clone();
	pivot.removeRightBranch();

	var right = null, R = null;
	right = this.rightBranch.clone();
	this.removeRightBranch();

	if (!right.isLeftBranchEmpty()){
		R = right.leftBranch.clone();
		right.removeLeftBranch();
	}

	// Now rotate
	this.set(right);
	this.leftBranch = pivot.clone();
	return this;
}








// Export the namespace as a module, so the other js can make use of it
exports.SelfBalancingTree = SelfBalancingTree;

