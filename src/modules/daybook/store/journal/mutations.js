export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries]; //add new entries to what we already had in the state
  state.isLoading = false; //we're done receiving them
}

export const updateEntry = (state, entry) => {
  const index = state.entries.map(e => e.id).indexOf(entry.id);
  state.entries[index] = entry;
}

export const addEntry = (state, entry) => {
  state.entries = [entry, ...state.entries]; //adding it to be the first in the arr of entries
}

export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter(entry => entry.id !== id);
}
