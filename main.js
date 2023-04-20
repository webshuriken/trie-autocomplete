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
    // first check that child node exists and see if we can carry on
    if (node.child[prefix[0]] !== undefined && keepGoing) {
      // shall we recurse
      if (prefix.length > 1) {
        [keepGoing, wordSearch] = this.deleteWithRecursion(prefix.substring(1,prefix.length), node.child[prefix[0]], true);
      }
      // as we have managed to reach end of prefix, check that it is a word
      if (wordSearch && keepGoing && node.child[prefix[0]].isWord) {
        node.child[prefix[0]].isWord = false;
        wordSearch = false;
      }
      // can we delete the node
      if (!node.child[prefix[0]].isWord && keepGoing && Object.keys(node.child[prefix[0]].child).length < 1) {
        delete node.child[prefix[0]];
        return [true, wordSearch];
      }
    }
    return [false, false];
  }
}

// trie node class
class TrieNode {
  constructor() {
    this.child = {}
    this.isWord = false;
  }
}

const tRoot = new TrieRoot();

module.exports = {
  TrieRoot, TrieNode
}