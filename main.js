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
}

// trie node class
class TrieNode {
  constructor() {
    this.child = {}
    this.isWord = false;
  }
}

const tRoot = new TrieRoot();