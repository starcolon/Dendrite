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
/*
    .add( tree )
    .push( key, value )
    .remove( key )
    .set( tree )            :Replace itself with the given [tree] parameter
    .setValue( key ,value )
    .getValue( key )
    .isLeftBranchEmpty()
    .isRightBranchEmpty()
    .isLeaveNode()
    .isLeftBranchEqual(key)     :Doesn't break if left branch is undefined, just returns false
    .isRightBranchEqual(key)
    .depth()
    .log()
*/

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


SCTree.BinaryTree.prototype.set = function(l){
    this.leftBranch = l.leftBranch;
    this.rightBranch = l.rightBranch;
    this.key = l.key;
    this.value = l.value;
    return this;
}


SCTree.BinaryTree.prototype.setValue = function(key,value){
    if (key<this.key) {
        // Search through the left node
        if (!this.isLeftBranchEmpty()){
            this.leftBranch.setValue(key,value);
        }
    }
    else if (key==this.key){
        // Set the value of self
        this.value = value;
    }
    else{
        // Search through the right node
        if (!this.isRightBranchEmpty()){
            this.rightBranch.setValue(key,value);
        }
    }

    return this;
}


SCTree.BinaryTree.prototype.getValue = function(key){
    if (key<this.key){
        // Search through the left node
        if (this.isLeftBranchEmpty())
            return null;
        else
            return this.leftBranch.getValue(key);
    }
    else if (key == this.key){
        // Return self
        return value;
    }
    else{
        // Search through the right node
        if (this.isRightBranchEmpty())
            return null;
        else
            return this.rightBranch.getValue(key);
    }
}


SCTree.BinaryTree.prototype.add = function(l){
    // l = BinaryTree
    if (typeof(l)=='undefined') {
        return this;
    } 
    else if (l==null){
        return this;
    }

    if (l.key < this.key){
        // Add l to the left leave
        if (this.isLeftBranchEmpty()){
            this.leftBranch = l;
        } 
        else{
            this.leftBranch = this.leftBranch.add(l);
        }
    }
    else{
        // Add l to the right leave
        if (this.isRightBranchEmpty()){
            this.rightBranch = l;
        }
        else{
            this.rightBranch = this.rightBranch.add(l);
        }
    }

    return this;
}


SCTree.BinaryTree.prototype.push = function(key,value){
    if (key<this.key){
        // Push to the left branch
        if (this.isLeftBranchEmpty()){
            // Add a new left leave
            this.leftBranch = new SCTree.BinaryTree(key,value);
            return this;
        }
        else{
            this.leftBranch = this.leftBranch.push(key,value);
            return this;
        }
    }
    else{
        // Push to the right branch
        if (this.isRightBranchEmpty()){
            // Add to the right leave
            this.rightBranch = new SCTree.BinaryTree(key,value);
            return this;
        }
        else{
            this.rightBranch = this.rightBranch.push(key,value);
            return this;
        }
    }
}


SCTree.BinaryTree.prototype.remove = function(key){
    if (this.isLeaveNode() && this.key == key){
        // If remove itself and it has no child, destroy 
        return null;
    }
    else if (key == this.key) {
        // Remove self, take the children
        var left = this.leftBranch;
        var right = this.rightBranch;

        // If left node is empty, the right node becomes the root, vice versa
        if (this.isLeftBranchEmpty()) return right;
        else if (this.isRightBranchEmpty()) return left;

        // The righ branch becomes self and add the left branch to it
        this.set(right).add(left);
        return this;
    }
    else if (key < this.key){
        // Remove the left node
        if (this.isLeftBranchEmpty())
            return this; // No node to remove, leave it
        else if (this.isLeftBranchEqual(key)){
            // Take the grand children of the left branch
            var leftOfLeft = this.leftBranch.leftBranch;
            var rightOfLeft = this.leftBranch.rightBranch;

            // Remove the left child now
            delete this.leftBranch ;
            this.leftBranch = null;

            // Re-add the right grandchild, then the left grandchild back
            this.add(rightOfLeft).add(leftOfLeft);
            return this;
        }
        else{
            // Look further on the left child nodes
            this.leftBranch = this.leftBranch.remove(key);
            return this;
        }

    }
    else {
        // Remove the right node
        if (this.isRightBranchEmpty())
            return this; // No node to remove, just leave it
        else if (this.isRightBranchEqual(key)){
            // Take the grand children of the right node
            var leftOfRight = this.rightBranch.leftBranch;
            var rightOfRight = this.rightBranch.rightBranch;

            // Remove the right child now
            delete this.rightBranch;
            this.rightBranch = null;

            // Re-add the right grandchild, then the left grandchild back
            this.add(rightOfRight).add(leftOfRight);
            return this;
        }
        else {
            // Look further on the right child nodes
            this.rightBranch = this.rightBranch.remove(key);
            return this;
        }

    }
    
    return this;
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













