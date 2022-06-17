import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://journal-app-beb85-default-rtdb.firebaseio.com'
})

export default journalApi;