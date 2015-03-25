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
	.splay(key)			: perform a splay operation on the specified node
	.zig(key)			: zig step
*/

SplayTree = function(key,value,leaves){
	SelfBalancingTree.SelfBalancingTree.call(this,key,value,leaves);
}

// AVL tree inherites Self balancing tree
SplayTree.prototype = Object.create(SelfBalancingTree.SelfBalancingTree.prototype);
SplayTree.prototype.constructor = SelfBalancingTree.SelfBalancingTree;

//-------------------------------------------------------

SplayTree.prototype.splay = function(key) {

	// Stops splaying if the root node is already the key
	if (this.key==key){
		console.log('Splay finishes! ' + key + ' is now the root.');
		return this;
	}
	if (key<this.key && this.isLeftBranchEmpty())
		return this;
	if (key>=this.key && this.isRightBranchEmpty())
		return this;

	// Recursively until the `key‘ becomes the root node
	//--------------------------------------------------
	if (key<this.key && !this.isLeftBranchEmpty()){
		// Left branch is the `key‘ node?
		if (this.leftBranch.key==key){
			// Zig
			console.log('zig! :rotate right');
			SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
			return this;
		} 
		else {
			var parent = this.leftBranch;
			if (key<parent.key && !parent.isLeftBranchEmpty()){
				if (parent.leftBranch.key==key){
					// Zigzig
					console.log('zigzig!');
					this.leftBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(parent);					
					SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
					return this;
				}
				else{
					console.log('recursive splay! on left branch');
					// Splay the left branch further until `key' becomes that branch
					parent.leftBranch = SplayTree.prototype.splay.call(parent.leftBranch,key);
					// Rotate the parent so the left branch node becomes the root
					this.leftBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.call(parent);
					// Rotate itself so the left branch becomes the top root
					SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.call(this);
					return this;
				}
			}
			else if (key>=parent.key && !parent.isRightBranchEmpty()){
				if (parent.rightBranch.key==key){
					// Zigzag
					console.log('zigzag!!');
					this.rightBranchBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(parent);
					SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
					return this;
				}
				else{
					console.log('recursive splay! on right branch');
					// Splay the right branch further until `key' becomes that branch
					parent.rightBranch = SplayTree.prototype.splay.call(parent.rightBranch,key);
					// Rotate the parent so the right branch becomes the root of the parent
					this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.call(parent);
					// Rotate itself so the right branch becomes the top root
					SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.call(this);
					return this;
				}
			}

		}
	}
	else if (key>=this.key && !this.isRightBranchEmpty()){
		if (this.rightBranch.key==key){
			// Zig
			console.log('zig! :rotate left');
			SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
			return this;
		}
		else{
			var parent = this.rightBranch;
			if (key>=parent.key && !parent.isRightBranchEmpty()){
				if (parent.rightBranch.key==key){
					// Zigzig
					console.log('zigzig!');
					this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(parent);
					SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
					return this;
				}
				else{
					console.log('recursive splay! on right branch');
					// Splay the right branch further until `key' becomes that branch
					parent.rightBranch = SplayTree.prototype.splay.call(parent.rightBranch,key);
					// Rotate the parent so its right branch becomes the root of parent
					this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.call(parent);
					// Rotate itself so the right branch becomes the top root
					SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.call(this);
					return this;
				}
			}
			else if (key<parent.key && !parent.isLeftBranchEmpty()){
				if (parent.leftBranch.key==key){
					// Zigzag
					console.log('zigzag!!');
					this.leftBranchBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(parent);
					SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
					return this;
				}
				else{
					console.log('recursive splay! on left branch');
					// Splay the left branch further until `key' becomes that branch
					parent.leftBranch = SplayTree.prototype.splay.call(parent.leftBranch,key);
					// Rotate the parent so its left branch becomes its root
					this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.call(parent);
					// Rotate itself so the right branch becomes the top root
					SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.call(this);
					return this;
				}
			}
		}
	}

	console.log('Splay terminates! root is ' + this.key);
	return this;
};


SplayTree.prototype.push = function(key,value) {
	SelfBalancingTree.SelfBalancingTree.prototype.push.call(this, key, value);

	// Splay the recently added node
	SplayTree.prototype.splay.call(this,key);
	return this;
};

SplayTree.prototype.add = function(tree) {
	SelfBalancingTree.SelfBalancingTree.prototype.add.call(this, tree);

	// Splay the root of the tree
	SplayTree.prototype.splay.call(this,tree.key);
	return this;
};

SplayTree.prototype.get = function(key) {
	var value = SelfBalancingTree.SelfBalancingTree.prototype.get.call(this, key);

	// Splay the accessed element
	SplayTree.prototype.splay.call(this,key);
	return value;
}

SplayTree.prototype.remove = function(key) {
	SelfBalancingTree.SelfBalancingTree.prototype.remove.call(this, key);
}


// Export the module for external use

exports.SplayTree = SplayTree;