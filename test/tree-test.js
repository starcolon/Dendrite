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

	describe('@binarytree checkup starts!============================', function(){

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

		it ('should not have left branch', function(done){
			tree.push(120); // Add the right node

			// Check the result
			assert(tree.isLeftBranchEmpty());
			done();
		});

		it ('should NOT auto balance itself after adding multiple values', function(done){
			var addValue = add.bind(tree);
			[1,125,124,125,180,300,300,1000].forEach(addValue);

			// Check the result
			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			assert.deepEqual([1,80,120,124,125,125,180,300,300,1000],tree.toKeyArray());
			assert.equal(tree.key,80); // root must not change
			assert(Math.abs(leftDepth-rightDepth)>2);
			done();
		});

		it ('should NOT auto balance itself after removing multiple values', function(done){
			var removeValue = remove.bind(tree);
			[1,125,124,300].forEach(removeValue);

			// left branch should disappear
			assert(tree.isLeftBranchEmpty());

			// Check the result
			assert.equal(tree.key,80); // root must not change
			done();
		});

	});

	describe('@avltree checkup starts!===============================', function(){
		
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

		it ('should not have left branch', function(done){
			tree.push(120); // Add the right node

			// Check the result
			assert(tree.isLeftBranchEmpty());
			done();
		});

		it ('should auto balance itself after adding multiple values', function(done){
			var addValue = add.bind(tree);
			[1,125,124,125,180,300,300,1000].forEach(addValue);

			// Check the result
			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			assert.deepEqual([1,80,120,124,125,125,180,300,300,1000],tree.toKeyArray());
			assert.notEqual(tree.key,80); // root must change
			assert(Math.abs(leftDepth-rightDepth)<2);
			done();
		});

		it ('should auto balance itself after removing multiple values', function(done){
			var removeValue = remove.bind(tree);
			[1,125,124,300].forEach(removeValue);

			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			// Check the result
			assert.notEqual(tree.key,80); // root must not change
			assert(Math.abs(leftDepth-rightDepth)<2);
			done();
		});
	});

	describe('@redblacktree checkup starts!==========================', function(){

		var tree = new RedBlackTree.RedBlackTree();

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

		it ('should not have left branch', function(done){
			tree.push(120); // Add the right node

			// Check the result
			assert(tree.isLeftBranchEmpty());
			done();
		});

		it.skip ('should auto balance itself after adding multiple values', function(done){
			var addValue = add.bind(tree);
			[1,125,124,125,180,300,300,1000].forEach(addValue);

			// Check the result
			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			assert.deepEqual([1,80,120,124,125,125,180,300,300,1000],tree.toKeyArray());
			assert.notEqual(tree.key,80); // root must change
			assert(Math.abs(leftDepth-rightDepth)<2);
			done();
		});

		it.skip ('should auto balance itself after removing multiple values', function(done){
			var removeValue = remove.bind(tree);
			[1,125,124,300].forEach(removeValue);

			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			// Check the result
			assert.notEqual(tree.key,80); // root must not change
			assert(Math.abs(leftDepth-rightDepth)<2);
			done();
		});
	});
});
