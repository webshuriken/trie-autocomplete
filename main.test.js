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
  test('insert "car" and "caroline" and make sure there are word markers on "r" and "e"', () => {
    // Arrange
    const words = ['car', 'caroline'];
    let nodes = [trieTree.root, trieTree.root];
    let randomNodes = [];
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    // Act
    words.forEach((word, x) => {
      for (let i=0, len=word.length; i<len; i++) {
        nodes[x] = nodes[x].child[word[i]];
        if (len-2 == i) {
          randomNodes[x] = nodes[x];
        }
      }
    });
    // Assert
    expect(randomNodes[0].isWord).toBe(false);
    expect(randomNodes[1].isWord).toBe(false);
    expect(nodes[0].isWord).toBe(true);
    expect(nodes[1].isWord).toBe(true);
  });
});

// SEARCHING
describe('Does the seach work as it should', () => {
  test('it searches for existing word "plane"', () => {
    // Arrange
    const word = 'plane';
    trieTree.insert(word);
    // Act
    let result = trieTree.search(word);
    // Assert
    expect(result).toBe(true);
  });
  test('it search for a word that does not exist, returning false', () => {
    // Arrange
    const words = ['robot', 'planes'];
    // Act
    let resultA = trieTree.search(words[0]);
    let resultB = trieTree.search(words[1]);
    // Assert
    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
  });
});