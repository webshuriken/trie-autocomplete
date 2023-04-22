// Root class
class TrieRoot {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (let i=0; i < word.length; i++) {
      if (node.child[word[i]] == undefined) {
        node.child[word[i]] = new TrieNode();
      }
      node = node.child[word[i]];
    }
    node.isWord = true;
  }
  search(prefix) {
    let node = this.root;
    for (let i=0; i < prefix.length; i++) {
      if (node.child[prefix[i]]) {
        node = node.child[prefix[i]];
      }else{
        return false;
      }
    }
    // return if its a word sas boolean
    return node.isWord;
  }
  delete(prefix) {
    let node = this.root;
    let leaf = undefined, prop = undefined;
    for (let i=0, len=prefix.length; i<len; i++) {
      // check if letter exists to escape early
      if (node.child[prefix[i]] == undefined) return false;
      if (leaf == undefined && Object.keys(node.child[prefix[i]].child).length  < 2 && !node.isWord) {
        leaf = node;
        prop = prefix[i];
      } else if (Object.keys(node.child[prefix[i]].child).length  > 1 || node.isWord) {
        leaf = undefined;
      }
      node = node.child[prefix[i]];
    }
    // make sure its a valid word before we continue
    if (node.isWord) {
      // check if its a leaf or node
      if (Object.keys(node.child).length > 0) {
        node.isWord = false;
      }else{
        // Time to delete the leaf along the way
        delete leaf.child[prop];
      }
      return true;
    }else {
      return false
    };
  }
  deleteWithRecursion(prefix, node = this.root, keepGoing = true, wordSearch = true) {
    let child = node.child[prefix[0]];
    // first check that child node exists and see if we can carry on
    if (child !== undefined && keepGoing) {
      // shall we recurse
      if (prefix.length > 1) {
        [keepGoing, wordSearch] = this.deleteWithRecursion(prefix.substring(1,prefix.length), child, true);
      }
      // as we have managed to reach end of prefix, check that it is a word
      if (wordSearch && keepGoing && child.isWord) {
        child.isWord = false;
      }
      // can we delete the node
      if (!child.isWord && keepGoing && Object.keys(child.child).length < 1) {
        // delete requires the parent object to perform delete
        delete node.child[prefix[0]];
        return [true, false];
      }
    }
    return [false, false];
  }
  suggestions(node, word, list) {
    // lets start adding valid words to the list
    if (node.isWord) list.push(word);
    // our early exit from the recursion
    if (Object.keys(node.child).length == 0) return;
    // this loop will allow us to branch down the tree and find all children
    for (let letter in node.child) {
      // lets recursie
      this.suggestions(node.child[letter], word + letter, list);
    }
  }
  lookUp(prefix) {
    let node = this.root;
    let list = [];
    let word = "";

    for (let i = 0; i < prefix.length; i++) {
      // lets make sure the the prefix thus far, exists in the tree
      if (node.child[prefix[i]] == undefined) {
        return false;
      }
      // store the next bit of information and move on
      node = node.child[prefix[i]];
      word += prefix[i];
    }
    // we are passing a reference to list variable creating a closure
    this.suggestions(node, word, list);
    return list;
  }
}

// trie node class
class TrieNode {
  constructor() {
    this.child = {}
    this.isWord = false;
  }
}

module.exports = {
  TrieRoot, TrieNode
}