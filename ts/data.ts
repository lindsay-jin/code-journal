/* exported data */

interface Data {
  view: string;
  entries: Obj[];
  editing: null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-model', dataJSON);
});

if (localStorage.getItem('data-model')) {
  const storedData = localStorage.getItem('data-model');
  if (!storedData) throw new Error('The $storedData query has failed.');
  data = JSON.parse(storedData);
}
