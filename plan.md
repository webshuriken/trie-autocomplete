# Plan

The idea behind the trie method to improve auto completion.


## How it works

A trie is a tree-like data structure, a type of search tree used to store associative data structures. It is also referred to as a Radix tree or Prefix tree.

1. The main node is the ROOT and sits at the top.
2. Every node can have a child (a node sitting directly under the parent) and they can also have children.
3. A node with no child is called a leaf.
4. Every node has a reference to its children
5. Every child contains a variable `isWord` to indicate if its a prefix or a word.


```
  ROOT
 /    \
leaf  node
       / \
    leaf  leaf
```


## Steps

The idea of this little program is to create a fully functioning trie tree which will be used for auto completion in our search bar. I will be using the class component in JavaScript.

The tree should be able to insert, search and delete entries.

### Minimum setup

- Create a class for the root node called `TrieRoot`. Slowly I will use it add the different methods required which are insert, search and delete. ✅
  - create the constructor method ✅
    - attached a property called root that creates a new trie node ✅

- Create a class to create the trie nodes and call it `TrieNode` ✅
  - create the constructor that add two properties ✅
    - a property called `child` that will hold an object of pointers to the children ✅
    - a property called `isWord` that will store a boolean ✅

### Insert

Inside the Root class
- create a method called `insert` it will take a single parameter called `word` ✅
  - create a variable called `node` and store the property name `root` ✅
  - use a loop to go through each letter in the word ✅
    - check if current letter exists in the current node as a child ✅
      - create a new child using the current letter in the word, use the class `TrieNode` ✅
    - use the `node` variable to store the new child node ✅
  - after loop is done, update the `isWord` property to true, to mark end of word. ✅


### Search

Inside the Root Class
- create a method called `search` passing in param `prefix` ✅
  - store the root node in variable `node` ✅
  - loop through the tree to a depth the size of the prefix ✅
    - at each iteration check that the `node` exists and if it does ✅
      - store this child node in `node` ✅
    - if child doesnt exist, exit loop early, returning false ✅
  - at the end of the loop return the current `node` property `isWord` as it will contain true or false ✅


### Delete

Inside the Root Class
- create a method called `delete` passing in param `prefix` ✅
  - create variable `node` and store the root node in there ✅
  - create variable `leaf` and set it to undefined. it tracks of the last leaf during our search of the tree. ✅
  - traverse the tree with a loop, trying to reach the end of the word, at each iteration: ✅
    - check the nodes exist, and if it doesn't, exit function early with false value ✅
    - check for leaf with, leaf == undefined, child.length == 1, isWord == true ✅
      - leaf will store the current node, not the child. ✅
    - inside of `node` store the current node.child ✅
  - if we made it this far, the current letters exists in the tree, now lets check if it is a word and if it is true: ✅
    - check if the child is a node or a leaf by checking the left of the child properties. ✅
      - if it has any then it is a node so just set `isWord` marker to false. ✅
      - otherwise set the leaf child to empty object to delete any leaf below it ✅
    - we can now return true, as the word was deleted successfully ✅
  - if the current letter check fails then return false. ✅
