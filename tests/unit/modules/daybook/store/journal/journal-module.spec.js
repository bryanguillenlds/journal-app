import journal from "@/modules/daybook/store/journal";
import { createStore } from "vuex";
import { journalState } from "../../mock-data/test-journal-state";

const createVuexStore = (initalState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initalState}
    }
  }
});

describe('Vuex Journal Store', () => {
  // STATE
  it('should have the right initial state', () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });
  
  //MUTATIONS
  it('should set an entry correctly', () => {
    const store = createVuexStore({ isLoading: true, entries: []});

    store.commit('journal/setEntries', journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  it('should update an entry correctly', () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "ABC123",
      date: "Sat Jun 11 2022",
      text: "I am learning a lot with this App. And I just updated an entry!"
    }

    store.commit('journal/updateEntry', updatedEntry);

    const matchingEntry = store.state.journal.entries.find(entry =>  entry.id === updatedEntry.id);

    expect(store.state.journal.entries.length).toBe(2);
    expect(matchingEntry).toEqual(updatedEntry);
  });

  it('should add and delete an entry correctly', () => {
    const store = createVuexStore(journalState);
    
    store.commit('journal/addEntry', {
      id: "DEF123",
      text: "A brand new entry!"
    });

    const testEntries = store.state.journal.entries;

    expect(testEntries.length).toBe(3);
    expect(testEntries.find(entry => entry.id === 'DEF123')).toBeTruthy();

    store.commit('journal/deleteEntry', 'DEF123');

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.entries.find(entry => entry.id === 'DEF123')).toBeFalsy();
  });

  // GETTERS
  it('should get entries by term and by id', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    // BY SEARCH TERM
    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntriesByTerm']('lot').length).toBe(1);
    expect(store.getters['journal/getEntriesByTerm']('lot')).toEqual([entry1]);

    // BY ID
    expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1);
  });

  // ACTIONS
  it('should loadEntries and commit the entries', async () => {
    const store = createVuexStore({ isLoading: true, entries: []});

    await store.dispatch('journal/loadEntries');

    expect(store.state.journal.entries.length).toBe(3);
  });

  it('should update an Entry correctly', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "ABC123",
      date: "Sat Jun 11 2022",
      text: "I am learning a lot with this App.\n\nDuis dolor dolor deserunt ea deserunt tempor incididunt exercitation."
    }

    await store.dispatch('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.entries.find(entry => entry.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  it('should create and delete an entry correctly', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: "Friday Jun 24 2022",
      text: "A brand new entry!"
    };

    const id = await store.dispatch('journal/createEntry', newEntry);

    //CREATING

    let testEntries = store.state.journal.entries;

    expect(typeof id).toBe('string');
    
    expect(testEntries.find(entry => entry.id === id)).toBeTruthy();

    expect(testEntries.length).toBe(3);

    // DELETING

    store.commit('journal/deleteEntry', id);

    testEntries = store.state.journal.entries;

    expect(testEntries.length).toBe(2);
    expect(testEntries.find(entry => entry.id === id)).toBeFalsy();

  })
})