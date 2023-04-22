const {TrieRoot, TrieNode} = require('./trie-tree.js');
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

// DELETING
describe('Does the class delete words successfully', () => {
  test('it deletes a word even if it is 1 letter', () => {
    // Arrange
    let word = 'x';
    let node = trieTree.root;
    // Act
    trieTree.insert(word);
    let result = trieTree.delete(word);
    // Assert
    expect(result).toBe(true);
    expect(node.child).toMatchObject({});
  });
  test('it deletes the only word in the tree', () => {
    // Arrange
    let word = 'biblioteca';
    trieTree.insert(word);
    // Act
    let result = trieTree.delete(word);
    // Assert
    expect(result).toBe(true);
    expect(trieTree.child).toBeUndefined();
  });
  test('it deletes single word leving its siblings intact', () => {
    // Arrange
    let result = false, leftoverWord = false;
    let words = ['plane', 'sugar'];
    let node = trieTree.root;
    let objectBeforeDelete = {
      p: expect.any(TrieNode),
      s: expect.any(TrieNode)
    }
    let objectAfterDelete = {
      s: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    result = trieTree.delete(words[0]);
    leftoverWord = trieTree.search(words[1]);
    // Assert
    expect(result).toBe(true);
    // only 1 word left in the tree
    expect(Object.keys(node.child).length).toBe(1);
    // make sure the object does not match initial shape and matches new shape after deletion
    expect(node.child).not.toMatchObject(objectBeforeDelete);
    expect(node.child).toMatchObject(objectAfterDelete);
  });
  test('it deletes the first word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let wordMarker = true;
    let nodeRoot = trieTree.root;
    let node = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);

    let result = trieTree.delete(words[0]);
    // traverse the tree after deletion
    for (let i=0; i<words[0].length; i++) {
      if (i == 2) {
        wordMarker = node.child[words[0][i]].isWord;
      }
      node = node.child[words[0][i]];
    }
    // Assert
    expect(result).toBe(true);
    expect(wordMarker).toBe(false);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
  test('it deletes the second word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let wordMarker = true;
    let nodeRoot = trieTree.root;
    let node = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);
    let result = trieTree.delete(words[1]);
    // traverse the tree after deletion
    for (let i=0; i<words[1].length; i++) {
      if (i == 4) {
        wordMarker = node.child[words[1][i]].isWord;
      }
      node = node.child[words[1][i]];
    }
    // Assert
    expect(result).toBe(true);
    expect(wordMarker).toBe(false);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
  test('it deletes the last word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let nodeRoot = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);
    let result = trieTree.delete(words[2]);
    // Assert
    expect(result).toBe(true);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
});

describe('Does the class delete words using RECURSION', () => {
  test('it deletes a word even if it is 1 letter', () => {
    // Arrange
    let word = 'x';
    let node = trieTree.root;
    // Act
    trieTree.insert(word);
    let result = trieTree.deleteWithRecursion(word);
    // Assert
    expect(result).toContain(true, false);
    expect(node.child).toMatchObject({});
  });
  test('it deletes the only word in the tree', () => {
    // Arrange
    let word = 'biblioteca';
    trieTree.insert(word);
    // Act
    let result = trieTree.deleteWithRecursion(word);
    // Assert
    expect(result).toContain(true, false);
    expect(trieTree.child).toBeUndefined();
  });
  test('it deletes single word leving its siblings intact', () => {
    // Arrange
    let result = false, leftoverWord = false;
    let words = ['plane', 'sugar'];
    let node = trieTree.root;
    let objectBeforeDelete = {
      p: expect.any(TrieNode),
      s: expect.any(TrieNode)
    }
    let objectAfterDelete = {
      s: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    result = trieTree.deleteWithRecursion(words[0]);
    leftoverWord = trieTree.search(words[1]);
    // Assert
    expect(result).toContain(true, false);
    // only 1 word left in the tree
    expect(Object.keys(node.child).length).toBe(1);
    // make sure the object does not match initial shape and matches new shape after deletion
    expect(node.child).not.toMatchObject(objectBeforeDelete);
    expect(node.child).toMatchObject(objectAfterDelete);
  });
  test('it deletes the first word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let wordMarker = true;
    let nodeRoot = trieTree.root;
    let node = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);

    let result = trieTree.deleteWithRecursion(words[0]);
    // traverse the tree after deletion
    for (let i=0; i<words[0].length; i++) {
      if (i == 2) {
        wordMarker = node.child[words[0][i]].isWord;
      }
      node = node.child[words[0][i]];
    }
    // Assert
    expect(result).toContain(false, false);
    expect(wordMarker).toBe(false);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
  test('it deletes the second word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let wordMarker = true;
    let nodeRoot = trieTree.root;
    let node = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);
    let result = trieTree.deleteWithRecursion(words[1]);
    // traverse the tree after deletion
    for (let i=0; i<words[1].length; i++) {
      if (i == 4) {
        wordMarker = node.child[words[1][i]].isWord;
      }
      node = node.child[words[1][i]];
    }
    // Assert
    expect(result).toContain(false, false);
    expect(wordMarker).toBe(false);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
  test('it deletes the last word in a branch of many', () => {
    // Arrange
    let words = ['car', 'carol', 'caroline'];
    let nodeRoot = trieTree.root;
    let objectBeforeDelete = {
      c: expect.any(TrieNode)
    }
    // Act
    trieTree.insert(words[0]);
    trieTree.insert(words[1]);
    trieTree.insert(words[2]);
    let result = trieTree.deleteWithRecursion(words[2]);
    // Assert
    expect(result).toContain(false, false);
    expect(nodeRoot.child).toMatchObject(objectBeforeDelete);
  });
});

// SUGGESTIONS
describe('Does it return the correct suggestions matching the prefix', () => {
  beforeAll(() => {
    
  });
  test('it returns a list of matching words', () => {
    // Arrange
    let prefixA = 'ca';
    let prefixB = 'caroli';
    let listA, listB;
    let words = ['car', 'cat', 'carol', 'caroline', 'linux', 'lotus'];
    // Act
    words.forEach(word => {
      trieTree.insert(word);
    });
    listA = trieTree.lookUp(prefixA);
    listB = trieTree.lookUp(prefixB)
    // Assert
    expect(listA).toContain('car', 'cat', 'carol', 'caroline');
    expect(listB).toContain('caroline');
  });
});
