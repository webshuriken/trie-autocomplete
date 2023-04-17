const {TrieRoot, TrieNode} = require('./main.js');
let trieTree;


beforeEach(() => {
  // we need a trunk for the tree
  trieTree = new TrieRoot();
});

// INSERTION
describe('Does it insert words into the tree', () => {
  test('inserts "car" into the tree', () => {
    // Arrange
    const word = 'car';
    const letters = [];
    let node = trieTree.root;
    trieTree.insert(word);
    // Act
    for (let i=0; i<word.length; i++) {
      if (node.child[word[i]] !== undefined) {
        letters[i] = word[i];
      }else{
        letters[i] = undefined;
      }
      node = node.child[word[i]];
    }
    // Assert
    expect(letters).not.toContain(undefined);
    expect(letters).toContain('c');
    expect(letters).toContain('a');
    expect(letters).toContain('r');
  });
  test('insert "linux" and make sure it has a word marker on the x', () => {
    // Arrange
    const word = 'linux';
    let node = trieTree.root;
    trieTree.insert(word);
    // Act
    for (let i=0; i<word.length; i++) {
      node = node.child[word[i]];
    }
    // Assert
    expect(node.isWord).toBe(true);
  });
});