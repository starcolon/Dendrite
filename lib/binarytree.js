//-------------------------------------------------
//  BinaryTree
//  Developed & managed by StarColon Projects
//  Aimed to be utilized with [node.js] app
//  EST: December 2014
//      http://starcolon.com/
//-------------------------------------------------

// DESIGN NODE: Always use fluent interface
/*
    .add( tree, nodefunc )
    .push( key, value, nodefunc )
    .remove( key, nodefunc )
    .clear()
    .set( tree )            :Replace itself with the given [tree] parameter
    .get( key )             :Get the tree at the specified key
    .setValue( key ,value )
    .getValue( key )
    .isLeftBranchEmpty()
    .isRightBranchEmpty()
    .removeLeftBranch()
    .removeRightBranch()
    .isLeaveNode()
    .isLeftBranchEqual(key)     :Doesn't break if left branch is undefined, just returns false
    .isRightBranchEqual(key)
    .toArray()                  :Returns array of {key, value}
    .toKeyArray()               :Returns array of only key
    .clone()
    .depth()
    .leftBranchDepth()
    .rightBranchDepth()
    .log()
*/

BinaryTree = function(key,value){

    // Initialize class members
    this.leftBranch = null;
    this.rightBranch = null;
    this.key = key;
    this.value = value;
};

// Binary tree property
BinaryTree.prototype.leftBranch = null;
BinaryTree.prototype.rightBranch = null;
BinaryTree.prototype.key = null;
BinaryTree.prototype.value = null;


BinaryTree.prototype.set = function(l){
    this.leftBranch = (l.isLeftBranchEmpty() ? null : l.leftBranch.clone());
    this.rightBranch = (l.isRightBranchEmpty() ? null : l.rightBranch.clone());
    this.key = l.key;
    this.value = l.value;
    return this;
}


BinaryTree.prototype.clone = function(){
    var newTree = new BinaryTree(this.key, this.value);
    newTree.leftBranch = null;
    newTree.rightBranch = null;
    if (!this.isLeftBranchEmpty()){
        newTree.leftBranch = this.leftBranch.clone();
    }
    if (!this.isRightBranchEmpty()){
        newTree.rightBranch = this.rightBranch.clone();
    }
    return newTree;
}


BinaryTree.prototype.get = function(key){
    if (key<this.key){
        if (this.isLeftBranchEmpty())
            return null;
        else
            return this.leftBranch.get(key);
    }
    else if (key==this.key){
        return this;
    }
    else{
        if (this.isRightBranchEmpty())
            return null;
        else
            return this.rightBranch.get(key);
    }
}

BinaryTree.prototype.setValue = function(key,value){
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


BinaryTree.prototype.getValue = function(key){
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


BinaryTree.prototype.add = function(l,nodeFunc){

    nodeFunc = (typeof(nodeFunc)=='undefined')?function(){ return this;}:nodeFunc; 

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
            this.leftBranch = this.leftBranch.add(l,nodeFunc);
            this.leftBranch = nodeFunc.apply(this.leftBranch);
        }
    }
    else{
        // Add l to the right leave
        if (this.isRightBranchEmpty()){
            this.rightBranch = l;
        }
        else{
            this.rightBranch = this.rightBranch.add(l,nodeFunc);
            this.rightBranch = nodeFunc.apply(this.rightBranch);
        }
    }

    return this;
}


BinaryTree.prototype.push = function(key,value, nodeFunc){

    nodeFunc = (typeof(nodeFunc)=='undefined')?function(){return this;}:nodeFunc; 

    // Simple validation
    if (key == null || typeof(key)=='undefined'){
        console.error('Push nothing');
        return this;
    }

    // Assign this to self if the tree is already empty
    if (this.key == null || typeof(this.key)=='undefined'){
        this.key = key;
        this.value = value;
        return this;
    }

    if (key<this.key){
        // Push to the left branch
        if (this.isLeftBranchEmpty()){
            // Add a new left leave
            this.leftBranch = new BinaryTree(key,value);
            return this;
        }
        else{
            this.leftBranch = this.leftBranch.push(key,value,nodeFunc);
            this.leftBranch = nodeFunc.apply(this.leftBranch);
            return this;
        }
    }
    else{
        // Push to the right branch
        if (this.isRightBranchEmpty()){
            // Add to the right leave
            this.rightBranch = new BinaryTree(key,value);
            return this;
        }
        else{
            this.rightBranch = this.rightBranch.push(key,value,nodeFunc);
            this.rightBranch = nodeFunc.apply(this.rightBranch);
            return this;
        }
    }
}


BinaryTree.prototype.remove = function(key,nodeFunc){

    nodeFunc = (typeof(nodeFunc)=='undefined')?function(){return this;}:nodeFunc; 

    if (this.isLeaveNode() && this.key == key){
        // If remove itself and it has no child, destroy 
        this.key = null;
        this.value = null;
        return null;
    }
    else if (key == this.key) {
        // Remove self, take the children
        var left = this.leftBranch;
        var right = this.rightBranch;

        // If left node is empty, the right node becomes the root, vice versa
        if (this.isLeftBranchEmpty()) { 
            this.set(right);
            return this; 
        }
        else if (this.isRightBranchEmpty()) { 
            this.set(left);
            return this; 
        }

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
            this.add(rightOfLeft).add(leftOfLeft,nodeFunc);

            // Perform the node function on self
            // TAOTODO:
            return this;
        }
        else{
            // Look further on the left child nodes
            this.leftBranch = this.leftBranch.remove(key,nodeFunc);
            this.leftBranch = nodeFunc.apply(this.leftBranch);
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
            this.add(rightOfRight).add(leftOfRight,nodeFunc);

            // TAOTOTDO: apply nodefunction on self
            return this;
        }
        else {
            // Look further on the right child nodes
            this.rightBranch = this.rightBranch.remove(key,nodeFunc);
            this.rightBranch = nodeFunc.apply(this.rightBranch);
            return this;
        }

    }
    
    return this;
}


BinaryTree.prototype.clear = function(){
    // Remove left & right branches
    this.removeLeftBranch();
    this.removeRightBranch();
    this.key = null;
    this.value = null;
}


BinaryTree.prototype.removeLeftBranch = function(){
    if (this.isLeftBranchEmpty())
        return this;
    delete this.leftBranch;
    this.leftBranch = null;
    return this;
}


BinaryTree.prototype.removeRightBranch = function(){
    if (this.isRightBranchEmpty())
        return this;
    delete this.rightBranch;
    this.rightBranch = null;
    return this;
}


BinaryTree.prototype.isLeftBranchEmpty = function(){
    if (typeof(this.leftBranch)=='undefined')
        return true;
    else if (this.leftBranch==null)
        return true;
    else
        return false;
}

BinaryTree.prototype.isRightBranchEmpty = function(){
    if (typeof(this.rightBranch)=='undefined')
        return true;
    else if (this.rightBranch==null)
        return true;
    else
        return false;
}


BinaryTree.prototype.isLeaveNode = function(){
    return this.isLeftBranchEmpty() && this.isRightBranchEmpty();
}

BinaryTree.prototype.isRightBranchEqual = function(key){
    if (typeof(this.rightBranch)=='undefined') return false;
    else if (this.rightBranch == null) return false;
    return this.rightBranch.key===key;
}
             
BinaryTree.prototype.isLeftBranchEqual = function(key){
    if (typeof(this.leftBranch)=='undefined') return false;
    else if (this.leftBranch == null) return false;
    return this.leftBranch.key===key;
}

BinaryTree.prototype.depth = function(){
    if (this.isLeaveNode())
        return 1;
    else{
        var depthLeft = (this.isLeftBranchEmpty() ? 0 : this.leftBranch.depth());
        var depthRight = (this.isRightBranchEmpty() ? 0 : this.rightBranch.depth());
        return 1 + Math.max(depthLeft,depthRight);
    }
}


BinaryTree.prototype.leftDepth = function(){

    if (this.isLeftBranchEmpty())
        return 0;
    else
        return this.leftBranch.depth();
}


BinaryTree.prototype.rightDepth = function(){
    if (this.isRightBranchEmpty())
        return 0;
    else 
        return this.rightBranch.depth();
}


BinaryTree.prototype.log = function(){
    // Print the left nodes first
    if (!this.isLeftBranchEmpty()){
        this.leftBranch.log();
    }

    // Then print itself
    console.log(" -> " + this.key);

    // Print the right nodes
    if (!this.isRightBranchEmpty()){
        this.rightBranch.log();
    }
}

BinaryTree.prototype.toArray = function(){
    // Left first
    var arr = [];
    if (!this.isLeftBranchEmpty()){
        var leftArray = this.leftBranch.toArray();
        for (var a in leftArray){
            arr.push(leftArray[a]);
        }
    }

    // Itself
    arr.push({key: this.key, value: this.value});

    // Right node then
    if (!this.isRightBranchEmpty()){
        var rightArray = this.rightBranch.toArray();
        for (var a in rightArray){
            arr.push(rightArray[a]);
        }
    }

    return arr;
}

BinaryTree.prototype.toKeyArray = function(){
    // Left first
    var arr = [];
    if (!this.isLeftBranchEmpty()){
        var leftArray = this.leftBranch.toKeyArray();
        for (var a in leftArray){
            arr.push(leftArray[a]);
        }
    }

    // Itself
    arr.push(this.key);

    // Right node then
    if (!this.isRightBranchEmpty()){
        var rightArray = this.rightBranch.toKeyArray();
        for (var a in rightArray){
            arr.push(rightArray[a]);
        }
    }

    return arr;
}


// Export the namespace as a module, so the other js can make use of it
exports.BinaryTree = BinaryTree;













