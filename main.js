import { TrieRoot } from "./trie-tree";


// Grab all the html elements
const searchBar = document.querySelector('#searchBar');
const suggestionsContainer = document.querySelector('#suggestionsContainer');

// listen to the html
searchBar.addEventListener('input', handleInput);

// listen to typing in the search box
function handleInput(event) {
  const list = tRoot.lookUp(event.target.value);
  updateSuggestionsList(list);
}

function updateSuggestionsList(list) {
  let ul = document.createElement('UL');
  ul.setAttribute('id', 'suggestionsList');
  let li;
  for (let i=0, len=list.length; i<len; i++) {
    li = document.createElement('LI');
    li.innerText = list[i];
    ul.append(li);
  }
  suggestionsContainer.append(ul);
}

const tRoot = new TrieRoot();

tRoot.insert('cat');
tRoot.insert('car');
tRoot.insert('carol');
tRoot.insert('coconut');
