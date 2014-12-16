//-------------------------------------------------
//  BinaryTree
//  Developed & managed by StarColon Project
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//-------------------------------------------------

// Global namespace for the tree structure
var SCTree = SCTree || {};

// DESIGN NODE: Always use fluent interface

SCTree.BinaryTree = function(key,value,leaves){

    // Initialize class members
    this.leftLeave = null;
    this.rightLeave = null;
    this.key = key;
    this.value = value;

    if (typeof(leaves)!='undefined') {
        // Otherwise, if the arguments are not null, add the leaves into its children
        if (leaves.key < this.key)
            this.leftLeave = leaves;
        else
            this.rightLeave = leaves;
    }
};

// Binary tree property
SCTree.BinaryTree.prototype.leftLeave = null;
SCTree.BinaryTree.prototype.rightLeave = null;
SCTree.BinaryTree.prototype.key = null;
SCTree.BinaryTree.prototype.value = null;


SCTree.BinaryTree.prototype.addLeave = function(l){
    // l = BinaryTree
    
    // TAOTODO: Find the best place to add
}


SCTree.BinaryTree.prototype.removeLeave = function(key){
   // Remove the immediate child
    if (this.leftLeaveEqual(key)){
        delete this.leftLeave;
        this.leftLeave = null;
        return true;
    } else if (this.rightLeaveEqual(key)){
        delete this.rightLeave;
        this.rightLeave = null;
        return true;
    }
    
    // Otherwise, check through the child nodes
    
}

SCTree.BinaryTree.prototype.rotateLeft = function(){
}

SCTree.BinaryTree.prototype.rotateRight = function(){
}

SCTree.BinaryTree.prototype.searchKey = function(key){
}

SCTree.BinaryTree.prototype.isLeaveNode = function(){
    if (typeof(this.rightLeave)!='undefined'){
        if (this.rightLeave != null)
            return false;
    }
}

SCTree.BinaryTree.prototype.rightLeaveEqual = function(key){
    if (typeof(this.rightLeave)=='undefined') return false;
    return this.rightLeave.key===key;
}
             
SCTree.BinaryTree.prototype.leftLeaveEqual = function(key){
    if (typeof(this.leftLeave)=='undefined') return false;
    return this.leftLeave.key===key;
}








// Export the namespace as a module, so the other js can make use of it
exports.SCTree = SCTree;













