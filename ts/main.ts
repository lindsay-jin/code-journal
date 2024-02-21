/* global data */
interface Obj {
  title: string;
  photoURL: string;
  notes: string;
  entryId: number;
}

const $inputURL = document.getElementById('photoURL') as HTMLInputElement;
const $img = document.querySelector('img') as HTMLElement;
const $inputTitle = document.getElementById('title') as HTMLInputElement;
const $textarea = document.querySelector('textarea') as HTMLTextAreaElement;

$inputURL?.addEventListener('input', () => {
  $img.setAttribute('src', $inputURL.value);
});

const $form = document.querySelector('form');

$form?.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const obj: Obj = {
    title: $inputTitle?.value,
    photoURL: $inputURL.value,
    notes: $textarea.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(obj);

  const newList = renderEntry(obj);

  const theFirstChild = $ul?.firstChild as HTMLElement;
  $ul?.insertBefore(newList, theFirstChild);
  viewSwap('entries');
  toggleEntries();

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry: Obj): HTMLElement {
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
    const currentEntry = renderEntry(data.entries[i]);
    $ul?.appendChild(currentEntry);
    const previousView = data.view;
    viewSwap(previousView);
    toggleEntries();
  }
});

const $h3 = document.querySelector('h3') as HTMLElement;

function toggleEntries(): void {
  if (data.entries.length === 0) {
    $h3.classList.remove('hidden');
  } else {
    $h3.classList.add('hidden');
  }
}

const $entries = document.querySelector('div[data-view="entries"]');
const $entryForm = document.querySelector('div[data-view="entry-form"]');

function viewSwap(view: string): void {
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
$entriesNav?.addEventListener('click', (event: Event) => {
  event?.preventDefault();
  viewSwap('entries');
});

const $newButton = document.querySelector('.new-button');
$newButton?.addEventListener('click', (event: Event) => {
  event.preventDefault();
  viewSwap('entry-form');
});
