'use strict';
const $inputURL = document.getElementById('photoURL');
const $img = document.querySelector('img');
const $inputTitle = document.getElementById('title');
const $textarea = document.querySelector('textarea');
$inputURL?.addEventListener('input', () => {
  $img.setAttribute('src', $inputURL.value);
});
const $form = document.querySelector('form');
$form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    title: $inputTitle?.value,
    photoURL: $inputURL.value,
    notes: $textarea.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(obj);
  const newList = renderEntry(obj);
  const theFirstChild = $ul?.firstChild;
  $ul?.insertBefore(newList, theFirstChild);
  viewSwap('entries');
  toggleEntries();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
function renderEntry(entry) {
  const $entriesList = document.createElement('li');
  $entriesList.className = 'entries-list row';
  const $divImg = document.createElement('div');
  $divImg.className = 'column-half';
  $entriesList.appendChild($divImg);
  const $imgList = document.createElement('img');
  $imgList.setAttribute('src', entry.photoURL);
  $divImg.appendChild($imgList);
  const $divList = document.createElement('div');
  $divList.className = 'column-half';
  $entriesList.appendChild($divList);
  const $h2List = document.createElement('h2');
  $h2List.textContent = entry.title;
  $divList.appendChild($h2List);
  const $pList = document.createElement('p');
  $pList.textContent = entry.notes;
  $divList.appendChild($pList);
  return $entriesList;
}
const $ul = document.querySelector('.entries-ul');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    let currentEntry = renderEntry(data.entries[i]);
    $ul?.appendChild(currentEntry);
    const previousView = data.view;
    viewSwap(previousView);
    toggleEntries();
  }
});
const $h3 = document.querySelector('h3');
function toggleEntries() {
  if (data.entries.length === 0) {
    $h3.classList.remove('hidden');
  } else {
    $h3.classList.add('hidden');
  }
}
const $entries = document.querySelector('div[data-view="entries"]');
const $entryForm = document.querySelector('div[data-view="entry-form"]');
function viewSwap(view) {
  if (view === 'entries') {
    $entries?.classList.remove('hidden');
    $entryForm?.classList.add('hidden');
    $newButton?.classList.remove('hidden');
  } else if (view === 'entry-form') {
    $entryForm?.classList.remove('hidden');
    $entries?.classList.add('hidden');
    $newButton?.classList.add('hidden');
  }
  data.view = view;
}
const $entriesNav = document.querySelector('.nav-entries');
$entriesNav?.addEventListener('click', (event) => {
  event?.preventDefault();
  viewSwap('entries');
});
const $newButton = document.querySelector('.new-button');
$newButton?.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entry-form');
});
