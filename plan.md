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
