// Root class
class TrieRoot {
  constructor() {
    this.root = new Trie();
  }
}

// trie node class
class TrieNode {
  constructor() {
    this.child = {}
    this.isWord = false;
  }
}