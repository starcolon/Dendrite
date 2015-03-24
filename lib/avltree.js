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
	.retrace()				: Adjust the root's balance factor if necessary
	
*/

AVLTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
AVLTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
AVLTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------

AVLTree.prototype.retrace = function(){

	var balanceFactor = function(){
		return SelfBalancingTree.SelfBalancingTree.prototype.leftDepth.call(this) - 
				SelfBalancingTree.SelfBalancingTree.prototype.rightDepth.call(this);
	}

	console.log('retracing ...@' + this.key);

	// NOTE: [this] MUST reference the parent of the node which we want to perform retracing on.

	// calculate the balance factor
	var bfactor = balanceFactor.apply(this);

	// Skip if the tree is already balanced
	if (Math.abs(bfactor)<=1){
		console.log('   balanced tree, skipping');
		return this;
	}

	// Left case?
	if (bfactor>1){
		// Skip if the tree has no grandchildren
		if (this.isLeftBranchEmpty()){
			return this;
		}
		var bfactorChild = balanceFactor.apply(this.leftBranch);

		// If left-right case, rotate left so it becomes left-left case first
		if (bfactorChild<=-1){
			console.log('   left-right case: rotate left');
			this.leftBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this.leftBranch);
			bfactorChild = balanceFactor.apply(this.leftBranch);
		}

		// If left-left case, rotate right so it becomes balanced
		if (bfactorChild>=1){
			console.log('   left-left case: rotate right');
			SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
		}

	}
	// Right case
	else if (bfactor<-1){
		// Skip if the tree has no grandchildren
		if (this.isRightBranchEmpty()){
			return this;
		}
		var bfactorChild = balanceFactor.apply(this.rightBranch);

		// If right-left case, rotate right so it becomes right-right case first
		if (bfactorChild>=1){
			console.log('   right-left case: rotate right');
			this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this.rightBranch);
			bfactorChild = balanceFactor.apply(this.rightBranch);
		}

		// If right-right case, rotate left so it becomes balanced
		if (bfactorChild<=-1){
			console.log('   right-right case: rotate left');
			SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
		}
	}

	// Now calculate post-tracing balance factor
	bfactor = balanceFactor.apply(this);
	console.log('   => Resulting balance factor: ' + bfactor );
	console.log('   => Root becomes @' + this.key);
	return this;
}

AVLTree.prototype.push = function(key,value){
	SelfBalancingTree.SelfBalancingTree.prototype.push.call(this, key, value);

	// Then also perform retracing at the very root of the tree
	this.retrace();
	return this;
}


AVLTree.prototype.add = function(tree){
	SelfBalancingTree.SelfBalancingTree.prototype.add.call(this, tree);

	// Then also perform retracing at the very root of the tree
	this.retrace();
	return this;
}

AVLTree.prototype.remove = function(key){
	SelfBalancingTree.SelfBalancingTree.prototype.remove.call(this, key);

	// Then also perform retracing at the very root of the tree
	this.retrace();
	return this;
}


// Export the namespace as a module, so the other js can make use of it
exports.AVLTree = AVLTree;

