import { TrieRoot } from "./trie-tree.js";
import {UKCities} from "./assets/uk-cities.js";


// Grab all the html elements
const searchBar = document.querySelector('#searchBar');
const suggestionsContainer = document.querySelector('#suggestionsContainer');

// listen to the html
searchBar.addEventListener('input', handleInput);

/**
 * @description searches the trie tree on each user keystroke inside the input box
 * @param {object} event 
 */
function handleInput(event) {
  let prefix = event.target.value.toLowerCase();
  let list = [];
  // handle an empty search string
  if (prefix !== '') {
    list = tRoot.lookUp(prefix);
  }
  // make sure the list is an array, even if its empty
  list = list.length > 0 ? list : [];
  // we want the list to update immediately on each key stroke
  updateSuggestionsList(list);
}

/**
 * 
 * @param {array} list 
 */
function updateSuggestionsList(list) {
  let li, text;
  let ul = document.createElement('UL');
  ul.setAttribute('id', 'suggestionsList');
  // create the list items
  for (let i=0, len=list.length; i<len; i++) {
    li = document.createElement('LI');
    text = document.createTextNode(list[i]);
    li.appendChild(text);
    ul.appendChild(li);
  }
  // handles both empty lists and not so empty ones too
  if (list.length == 0) {
    let p = document.createElement('P');
    p.append('No match found');
    suggestionsContainer.replaceChild(p, suggestionsContainer.firstElementChild);
  }else{
    suggestionsContainer.replaceChild(ul, suggestionsContainer.firstElementChild);
  }
}

// Create the trie tree
const tRoot = new TrieRoot();
tRoot.insert('cat')
UKCities.forEach((city, i) => {
  tRoot.insert(city.city.toLowerCase());
});
