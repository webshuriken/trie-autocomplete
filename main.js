const {TrieRoot, TrieNode} = require('./trie-tree.js');

// Grab all the html elements
const searchBar = document.querySelector('#searchBar');
const suggestionsList = document.querySelector('#suggestionsList');

// listen to the html
searchBar.addEventListener('input', handleInput);

// listen to typing in the search box
function handleInput(event) {
  console.log("HANDLE INPUT: ", event.target.value);
  const list = tRoot.lookUp(event.target.value);
  console.log("SUGGESTIONS: ", list)
}

const tRoot = new TrieRoot();

tRoot.insert('cat');
tRoot.insert('car');
tRoot.insert('carol');
tRoot.insert('coconut');


module.exports = {
  TrieRoot, TrieNode
}