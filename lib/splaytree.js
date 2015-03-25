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
		console.log('Splay stops!');
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
		else{
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
					console.log('recursive splay!');
					// Splay the left branch further until `key' becomes that branch
					parent.leftBranch = SplayTree.prototype.splay.call(parent.leftBranch,key);
					this.leftBranch = parent;
					// Splay itself last time
					SplayTree.prototype.splay.call(this);
					return this;
				}
			}
			else if (key>parent.key && !parent.isRightBranchEmpty()){
				if (parent.rightBranch.key==key){
					// Zigzag
					console.log('zigzag!!');
					this.rightBranchBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(parent);
					SelfBalancingTree.SelfBalancingTree.prototype.rotateRight.apply(this);
					return this;
				}
				else{
					console.log('recursive splay!');
					// Splay the right branch further until `key' becomes that branch
					parent.rightBranch = SplayTree.prototype.splay.call(parent.rightBranch,key);
					this.leftBranch = parent;
					// Splay itself last time
					SplayTree.prototype.splay.call(this);
					return this;
				}
			}

		}
	}
	else if (key>this.key && !this.isRightBranchEmpty()){
		if (this.rightBranch.key==key){
			// Zig
			console.log('zig! :rotate left');
			SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
			return this;
		}
		else{
			var parent = this.rightBranch;
			if (key>parent.key && !parent.isRightBranchEmpty()){
				if (parent.rightBranch.key==key){
					// Zigzig
					console.log('zigzig!');
					this.rightBranch = SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(parent);
					SelfBalancingTree.SelfBalancingTree.prototype.rotateLeft.apply(this);
					return this;
				}
				else{
					console.log('recursive splay!');
					// Splay the right branch further until `key' becomes that branch
					parent.rightBranch = SplayTree.prototype.splay.call(parent.rightBranch,key);
					this.rightBranch = parent;

					// Splay itself last time
					SplayTree.prototype.splay.call(this);
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
					console.log('recursive splay!');
					// Splay the left branch further until `key' becomes that branch
					parent.leftBranch = SplayTree.prototype.splay.call(parent.leftBranch,key);
					this.leftBranch = parent;

					// Splay itself last time
					SplayTree.prototype.splay.call(this);
					return this;
				}
			}
		}
	}

	console.log('Splay terminates!')
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



// Export the module for external use

exports.SplayTree = SplayTree;