/* TEST ALL TREES */

var assert = require('assert');

var BinaryTree = require('../lib/binarytree.js');
var AvlTree = require('../lib/avltree.js');
var RedBlackTree = require('../lib/redblacktree.js');

//------------------------------------------------------
// COMMON FUNCTIONS

function add(v){
	this.push(v,null);
}

function remove(v){
	this.remove(v);
}


//------------------------------------------------------
describe('@tree checkup starts!', function(){

	describe('@binarytree checkup starts!', function(){

		var tree = new BinaryTree.BinaryTree();
		
		it ('should add 3 unordered numbers', function(done){
			var addValue = add.bind(tree);
			[1,80,3].forEach(addValue);

			// Check the result
			assert.deepEqual([1,3,80], tree.toKeyArray());
			done();
		});

		it ('should remove two numbers', function(done){
			var removeValue = remove.bind(tree);
			[1,3].forEach(removeValue);

			// Check the result
			assert.deepEqual([80], tree.toKeyArray());
			done();
		});


	});

	describe('@avltree checkup starts!', function(){
		
		var tree = new AvlTree.AVLTree();

		it ('should add 3 unordered numbers', function(done){
			var addValue = add.bind(tree);
			[1,80,3].forEach(addValue);

			// Check the result
			assert.deepEqual([1,3,80], tree.toKeyArray());
			done();
		});

		it ('should remove two numbers', function(done){
			var removeValue = remove.bind(tree);
			[1,3].forEach(removeValue);

			// Check the result
			assert.deepEqual([80], tree.toKeyArray());
			done();
		});
	});

	describe('@redblacktree checkup starts!', function(){

		var tree = new RedBlackTree.RedBlackTree();

	});
});
