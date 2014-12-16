//-------------------------------------------------
//  BinaryTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//      http://starcolon.com/
//-------------------------------------------------

// Global namespace for the tree structure
var SCTree = SCTree || {};

// DESIGN NODE: Always use fluent interface

SCTree.BinaryTree = function(key,value,leaves){

    // Initialize class members
    this.leftBranch = null;
    this.rightBranch = null;
    this.key = key;
    this.value = value;

    if (typeof(leaves)!='undefined') {
        // Otherwise, if the arguments are not null, add the leaves into its children
        if (leaves.key < this.key)
            this.leftBranch = leaves;
        else
            this.rightBranch = leaves;
    }
};

// Binary tree property
SCTree.BinaryTree.prototype.leftBranch = null;
SCTree.BinaryTree.prototype.rightBranch = null;
SCTree.BinaryTree.prototype.key = null;
SCTree.BinaryTree.prototype.value = null;


SCTree.BinaryTree.prototype.addLeave = function(l){
    // l = BinaryTree
    if (typeof(l)=='undefined') {
        return this;
    }

    if (l.key < this.key){
        // Add l to the left leave
        if (this.isLeftBranchEmpty()){
            this.leftBranch = l;
        } 
        else{
            this.leftBranch = this.leftBranch.addLeave(l);
        }
    }
    else{
        // Add l to the right leave
        if (this.isRightBranchEmpty()){
            this.rightBranch = l;
        }
        else{
            this.rightBranch = this.rightBranch.addLeave(l);
        }
    }

    return this;
}


SCTree.BinaryTree.prototype.removeBranch = function(key){
    if (this.isLeaveNode())
        return this;
    else if (key < this.key){
        // Remove the left node
        if (this.isLeftBranchEmpty())
            return this; // No node to remove, leave it
        else if (this.isLeftBranchEqual(key))
            return this.removeLeft();
        else{
            // Look further on the left child nodes
            this.leftBranch = this.leftBranch.removeBranch(key);
            return this;
        }

    }
    else {
        // Remove the right node
        if (this.isRightBranchEmpty())
            return this; // No node to remove, just leave it
        else if (this.isRightBranchEqual(key))
            return this.removeRight();
        else {
            // Look further on the right child nodes
            this.rightBranch = this.rightBranch.removeBranch(key);
            return this;
        }

    }
    
    return this;
}

SCTree.BinaryTree.prototype.removeLeft = function(){
    delete this.leftBranch;
    this.leftBranch = null;
    return this;
}


SCTree.BinaryTree.prototype.removeRight = function(){
    delete this.rightBranch;
    this.rightBranch = null;
    return this;
}

SCTree.BinaryTree.prototype.rotateLeft = function(){
}

SCTree.BinaryTree.prototype.rotateRight = function(){
}

SCTree.BinaryTree.prototype.searchKey = function(key){
}

SCTree.BinaryTree.prototype.isLeftBranchEmpty = function(){
    if (typeof(this.leftBranch)=='undefined')
        return true;
    else if (this.leftBranch==null)
        return true;
    else
        return false;
}

SCTree.BinaryTree.prototype.isRightBranchEmpty = function(){
    if (typeof(this.rightBranch)=='undefined')
        return true;
    else if (this.rightBranch==null)
        return true;
    else
        return false;
}


SCTree.BinaryTree.prototype.isLeaveNode = function(){
    return this.isLeftBranchEmpty() && this.isRightBranchEmpty();
}

SCTree.BinaryTree.prototype.isRightBranchEqual = function(key){
    if (typeof(this.rightBranch)=='undefined') return false;
    else if (this.rightBranch == null) return false;
    return this.rightBranch.key===key;
}
             
SCTree.BinaryTree.prototype.isLeftBranchEqual = function(key){
    if (typeof(this.leftBranch)=='undefined') return false;
    else if (this.leftBranch == null) return false;
    return this.leftBranch.key===key;
}

SCTree.BinaryTree.prototype.depth = function(){
    if (this.isLeaveNode())
        return 1;
    else{
        var depthLeft = (this.isLeftBranchEmpty() ? 0 : this.leftBranch.depth());
        var depthRight = (this.isRightBranchEmpty() ? 0 : this.rightBranch.depth());
        return 1 + Math.max(depthLeft,depthRight);
    }
}

SCTree.BinaryTree.prototype.log = function(){
    // Print the left nodes first
    if (!this.isLeftBranchEmpty()){
        this.leftBranch.log();
    }

    // Then print itself
    console.log(this.key + " -> ");

    // Print the right nodes
    if (!this.isRightBranchEmpty()){
        this.rightBranch.log();
    }
}






// Export the namespace as a module, so the other js can make use of it
exports.SCTree = SCTree;













