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
	var origin_bfactor = Math.abs(bfactor);
	var iter=1;
	var maxIter=10;

	while (Math.abs(bfactor)>1 && iter<maxIter){
		console.log(' iter#' + iter + ' :factor = ' + bfactor);
		if (bfactor>0){
			SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
		}
		else if (bfactor<0){
			SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
		}

		bfactor = balanceFactor.apply(this);
		iter++;

		// Should the balance factor grows greater or remains unchanged, do not proceed
		if (Math.abs(bfactor)>=origin_bfactor){
			break;
		}
	}

	console.log(' stops iter#' + iter + ' :final factor = ' + bfactor);
	console.log(' root becomes : @' + this.key);

	return this;
}

AVLTree.prototype.push = function(key,value){
	SelfBalancingTree.SelfBalancingTree.prototype.push.call(this, key, value, this.retrace);

	// Then also perform retracing at the very root of the tree
	this.retrace();
}


AVLTree.prototype.add = function(tree){
	SelfBalancingTree.SelfBalancingTree.prototype.add.call(this, tree, this.retrace);

	// Then also perform retracing at the very root of the tree
	this.retrace();
}

AVLTree.prototype.remove = function(key){
	SelfBalancingTree.SelfBalancingTree.prototype.remove.call(this, key, this.retrace);

	// Then also perform retracing at the very root of the tree
	this.retrace();
}


// Export the namespace as a module, so the other js can make use of it
exports.AVLTree = AVLTree;

