/* TEST ALL TREES */

var assert = require('assert');

var BinaryTree = require('../lib/binarytree.js');
var AvlTree = require('../lib/avltree.js');
var SplayTree = require('../lib/splaytree.js');

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


		it ('should retrieve the node correctly',function(done){
			var w = tree.get(120);
			assert.deepEqual({key:120, value:undefined},w);

			tree.push(50,0xFF);
			assert.deepEqual({key:50, value:0xFF}, tree.get(50));
			done();
		});

		it ('should add another tree properly', function(done){
			var anotherTree = new BinaryTree.BinaryTree();
			tree.clear();
			var addValue = add.bind(tree);
			var addValueAnotherTree = add.bind(anotherTree);
			[1,3,5,7,9].forEach(addValue);
			[2,4,6].forEach(addValueAnotherTree);

			// Add the tree now
			tree.add(anotherTree);

			// Check
			assert.deepEqual([1,2,3,4,5,6,7,9], tree.toKeyArray());
			done();
		});

		it ('should balance a big data well', function(done){
			tree.clear();
			var addValue = add.bind(tree);
			[1,-1,1,30,20,1,30,0,0,20,100,30,31,32,25,10,5,3,4,1,-20,0].forEach(addValue);

			 // Check the result
			var leftDepth = tree.leftBranch.depth();
			var rightDepth = tree.rightBranch.depth();

			assert(Math.abs(leftDepth-rightDepth)>2);
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

		it ('should retrieve the node correctly',function(done){
			var w = tree.get(120);
			assert.deepEqual({key:120, value:undefined},w);

			tree.push(50,0xFF);
			assert.deepEqual({key:50, value:0xFF}, tree.get(50));
			done();
		});

		it ('should add another tree properly', function(done){
			var anotherTree = new BinaryTree.BinaryTree();
			tree.clear();
			var addValue = add.bind(tree);
			var addValueAnotherTree = add.bind(anotherTree);
			[1,3,5,7,9].forEach(addValue);
			[2,4,6].forEach(addValueAnotherTree);

			// Add the tree now
			tree.add(anotherTree);

			// Check
			assert.deepEqual([1,2,3,4,5,6,7,9], tree.toKeyArray());
			done();
		});
	});

	describe('@splaytree checkup starts!===============================', function(){
		
		var tree = new SplayTree.SplayTree();

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

		it ('should have new root after add value', function(done){
			tree.push(120); // Add the right node and it should become the root

			// Check the result
			assert(tree.isRightBranchEmpty());
			assert.equal(tree.key,120);
			done();
		});

		it ('should have the last accessed node become root', function(done){
			tree.clear();
			var addValue = add.bind(tree);
			[1,2,3,4,5].forEach(addValue);

			// Check the result
			assert.equal(5,tree.key);
			done();
		});

		it ('should add all numbers and the last added become root', function(done){
			tree.clear();
			var addValue = add.bind(tree);
			[1,6,5,3,4].forEach(addValue);

			// Check the result
			assert.equal(4, tree.key);
			assert.deepEqual([1,3,4,5,6], tree.toKeyArray());
			done();
		});

		it ('should add all sequences and the last become root', function(done){
			tree.clear();
			var addValue = add.bind(tree);
			[1,3,10,15,30,35,40].forEach(addValue);

			// Check the result
			assert.equal(40, tree.key);
			assert.deepEqual([1,3,10,15,30,35,40], tree.toKeyArray());
			done();
		});

		it ('should add all nodes and the last added become root (bigger tree)', function(done){
			tree.clear();
			var addValue = add.bind(tree);
			[1,6,5,3,4,8,10].forEach(addValue);

			// Check the result
			assert.equal(10, tree.key);
			assert.deepEqual([1,3,4,5,6,8,10], tree.toKeyArray());
			done();
		});

		it ('should add another tree properly', function(done){
			var anotherTree = new BinaryTree.BinaryTree();
			tree.clear();
			var addValue = add.bind(tree);
			var addValueAnotherTree = add.bind(anotherTree);
			[1,3,5,7,9].forEach(addValue);
			[2,4,6].forEach(addValueAnotherTree);

			// Add the tree now
			tree.add(anotherTree);

			// Check
			assert.deepEqual([1,2,3,4,5,6,7,9], tree.toKeyArray());
			done();
		});

		it('should make the recently-accessed node becomes root', function(done){
			tree.get(1);
			assert.equal(1,tree.key);

			tree.get(7);
			assert.equal(7,tree.key);

			tree.remove(7);
			assert.notEqual(7,tree.key);

			done();
		});
	});
	
});
