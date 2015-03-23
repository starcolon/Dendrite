/* TEST ALL TREES */

var assert = require('assert');

var BinaryTree = require('../lib/binarytree.js');
var AvlTree = require('../lib/avltree.js');
var RedBlackTree = require('../lib/redblacktree.js');

describe('@tree checkup starts!', function(){
	var species = [BinaryTree,AvlTree,RedBlackTree];

	// Sequentially test against each of the tree species
	while (species.length>0){
		var Tree = species.pop();
		testTree(Tree);
	}
});

function testTree(Tree){
	var treeName = Object.keys(Tree)[0].toString();
	describe(treeName+' test starts!', function(){
		console.log(treeName);
	});
}