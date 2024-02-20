"use strict";
/* exported data */
const data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
// In data.js, add a 'beforeunload' event listener to the window object that serializes
// the data model as JSON and stores the JSON in localStorage
window.addEventListener('beforeunload', () => {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-model', dataJSON);
});
