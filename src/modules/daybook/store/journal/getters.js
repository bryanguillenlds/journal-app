
// Making the getter return another arrow function so that
// it can be invoked and receive arguments
export const getEntriesByTerm = (state) => (term = '') => {
  if (term.length === 0 ) return state.entries; //return all entries if searchbar is empty

  //Else, return the entry that matches the term being searched
  return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()));
}

export const getEntryById = (state) => (id = '') => {
  const entry = state.entries.find(entry => entry.id === id);
  
  if (!entry) return;

  return {...entry}; 
}
