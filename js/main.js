'use strict';
const $inputURL = document.getElementById('photoURL');
const $img = document.querySelector('img');
const $inputTitle = document.getElementById('title');
const $textarea = document.querySelector('textarea');
$inputURL?.addEventListener('input', () => {
  $img.setAttribute('src', $inputURL.value);
});
const $form = document.querySelector('form');
const $h1NewEntry = document.querySelector('.new-entry-title');
$form?.addEventListener('submit', (event) => {
  event.preventDefault();
  let obj = {
    title: $inputTitle?.value,
    photoURL: $inputURL.value,
    notes: $textarea.value,
    entryId: data.nextEntryId,
  };
  if (!data.editing) {
    data.nextEntryId++;
    data.entries.unshift(obj);
    $ul?.prepend(renderEntry(obj));
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (data.editing) {
    obj = {
      title: $inputTitle.value,
      photoURL: $inputURL.value,
      notes: $textarea.value,
      entryId: data.editing.entryId,
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = obj;
      }
    }
    const newObj = renderEntry(obj);
    const $allEntries = $ul?.querySelectorAll('li');
    if (!$allEntries) throw new Error('The $allEntries query has failed.');
    for (let i = 0; i < $allEntries.length; i++) {
      const $dataEntryIdValue = $allEntries[i].getAttribute('data-entry-id');
      if (Number($dataEntryIdValue) === data.editing.entryId) {
        $allEntries[i].replaceWith(newObj);
      }
    }
  }
  data.editing = null;
  $form.reset();
  viewSwap('entries');
  toggleEntries();
});
function renderEntry(entry) {
  const $entriesList = document.createElement('li');
  $entriesList.className = 'entries-list row';
  $entriesList.setAttribute('data-entry-id', entry.entryId.toString());
  const $divImg = document.createElement('div');
  $divImg.className = 'column-half';
  $entriesList.appendChild($divImg);
  const $imgList = document.createElement('img');
  $imgList.setAttribute('src', entry.photoURL);
  $divImg.appendChild($imgList);
  const $divList = document.createElement('div');
  $divList.className = 'div-list column-half';
  $entriesList.appendChild($divList);
  const $divFirstRow = document.createElement('div');
  $divFirstRow.className = 'divFirstRow row';
  $divList.appendChild($divFirstRow);
  const $h2List = document.createElement('h2');
  $h2List.className = 'column-half h2-list';
  $h2List.textContent = entry.title;
  $divFirstRow.appendChild($h2List);
  const $divPencil = document.createElement('div');
  $divPencil.className = 'column-half div-pencil';
  $divFirstRow.appendChild($divPencil);
  const $i = document.createElement('i');
  $i.className = 'fa-solid fa-pencil';
  $divPencil.appendChild($i);
  const $pList = document.createElement('p');
  $pList.className = 'column-full';
  $pList.textContent = entry.notes;
  $divList.appendChild($pList);
  return $entriesList;
}
const $ul = document.querySelector('.entries-ul');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const currentEntry = renderEntry(data.entries[i]);
    $ul?.appendChild(currentEntry);
  }
  const previousView = data.view;
  viewSwap(previousView);
  toggleEntries();
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
const $deleteEntry = document.querySelector('.delete-entry');
function viewSwap(view) {
  if (view === 'entries') {
    $entries?.classList.remove('hidden');
    $entryForm?.classList.add('hidden');
    $newButton?.classList.remove('hidden');
  } else if (view === 'entry-form') {
    $entryForm?.classList.remove('hidden');
    $entries?.classList.add('hidden');
    $newButton?.classList.add('hidden');
    $deleteEntry?.classList.add('hidden');
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
  $h1NewEntry.textContent = 'New Entry';
});
$ul?.addEventListener('click', (event) => {
  viewSwap('entry-form');
  $h1NewEntry.textContent = 'Edit Entry';
  $deleteEntry?.classList.remove('hidden');
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    const $closestElement = $eventTarget.closest('.entries-list');
    const $dataEntryIdValue = $closestElement?.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      let entry;
      if (data.entries[i].entryId === Number($dataEntryIdValue)) {
        entry = data.entries[i];
        data.editing = entry;
      }
    }
  }
  $inputTitle.value = data.editing?.title;
  $inputURL.value = data.editing?.photoURL;
  $textarea.value = data.editing?.notes;
  $img.setAttribute('src', $inputURL.value);
});
const $deleteDialog = document.querySelector('.delete-dialog');
$deleteEntry?.addEventListener('click', (event) => {
  event?.preventDefault();
  $deleteDialog.showModal();
});
const $cancelButton = document.querySelector('.cancel-button');
$cancelButton?.addEventListener('click', (event) => {
  event?.preventDefault();
  $deleteDialog.close();
});
const $confirmButton = document.querySelector('.confirm-button');
$confirmButton?.addEventListener('click', (event) => {
  event?.preventDefault();
  if (!data.editing) throw new Error('The data.editing query has failed.');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }
  const $allEntries = $ul?.querySelectorAll('li');
  if (!$allEntries) throw new Error('The $allEntries query has failed.');
  for (let i = 0; i < $allEntries.length; i++) {
    const $dataEntryIdValue = $allEntries[i].getAttribute('data-entry-id');
    if (Number($dataEntryIdValue) === data.editing.entryId) {
      $allEntries[i].remove();
    }
  }
  toggleEntries();
  $deleteDialog.close();
  $form?.reset();
  data.editing = null;
  viewSwap('entries');
  $inputTitle.value = '';
  $inputURL.value = '';
  $textarea.value = '';
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});
