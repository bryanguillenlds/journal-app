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
  it('should have the right initial state', () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });
  
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

    let testEntries = store.state.journal.entries;

    expect(testEntries.length).toBe(3);
    expect(testEntries.find(entry => entry.id === 'DEF123')).toBeTruthy();

    store.commit('journal/deleteEntry', 'DEF123');

    testEntries = store.state.journal.entries;

    expect(testEntries.length).toBe(2);
    expect(testEntries.find(entry => entry.id === 'DEF123')).toBeFalsy();
  })

})