import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json');

  if (!data) return commit('setEntries', []);

  const entries = [];
  // Loop through all keys of the response (the keys are the ids coming from firebase)
  // and we want to make the repsonse into an arr with the id INSIDE of each pushed obj
  for (let id of Object.keys(data)) {
    //Push each key (entire entry) as an object inside of an arr
    entries.push({
      id,
      ...data[id]
    })
  }

  commit('setEntries', entries);

}

export const updateEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry;
  const dataToSave = { date, picture, text };

  await journalApi.put(`entries/${entry.id}.json`, dataToSave);

  dataToSave.id = entry.id;

  commit('updateEntry', {...dataToSave}); //spread it so that we don't pass it as reference
  //we commit the entry because it was already the updated version and it contains the id, resp doesn't
}

export const createEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry;
  const dataToSave = { date, picture, text };

  const {data} = await journalApi.post(`entries.json`, dataToSave);
  dataToSave.id = data.name;

  commit('addEntry', dataToSave);

  return dataToSave.id;
}

export const deleteEntry = async ({ commit }, id) => {
  
  await journalApi.delete(`entries/${id}.json`);

  commit('deleteEntry', id);

  return id;
}