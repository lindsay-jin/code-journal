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

  let obj: Obj = {
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
    const $allEntries = $ul?.querySelectorAll('li') as NodeListOf<HTMLElement>;
    const dataEditingEntryId = data.editing.entryId;
    for (let i = 0; i < $allEntries?.length; i++) {
      const $theEntry = $allEntries[i];
      const $entryValue = $theEntry.getAttribute('data-entry-id');
      if ($entryValue === dataEditingEntryId.toString()) {
        $theEntry.replaceWith(newObj);
      }
    }
  }
  $h1NewEntry?.classList.remove('hidden');
  $h1EditEntry?.classList.add('hidden');
  $h1Entries?.classList.add('hidden');

  data.editing = null;
  $form.reset();
  viewSwap('entries');
  toggleEntries();
});

function renderEntry(entry: Obj): HTMLElement {
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

const $h1Entries = document.querySelector('.h1-entries');
const $h1NewEntry = document.querySelector('.h1-new-entry');
const $h1EditEntry = document.querySelector('.h1-edit-entry');

const $entriesNav = document.querySelector('.nav-entries');
$entriesNav?.addEventListener('click', (event: Event) => {
  event?.preventDefault();
  viewSwap('entries');
  $h1Entries?.classList.remove('hidden');
  $h1EditEntry?.classList.add('hidden');
  $h1NewEntry?.classList.add('hidden');
});

const $newButton = document.querySelector('.new-button');
$newButton?.addEventListener('click', (event: Event) => {
  event.preventDefault();
  viewSwap('entry-form');
  $h1Entries?.classList.add('hidden');
  $h1NewEntry?.classList.remove('hidden');
  $h1EditEntry?.classList.add('hidden');
});

$ul?.addEventListener('click', (event: Event) => {
  viewSwap('entry-form');
  $h1Entries?.classList.add('hidden');
  $h1NewEntry?.classList.add('hidden');
  $h1EditEntry?.classList.remove('hidden');

  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.tagName === 'I') {
    const $closestElement = $eventTarget.closest(
      '.entries-list'
    ) as HTMLElement;
    const $dataEntryIdValue = $closestElement?.getAttribute('data-entry-id');

    for (let i = 0; i < data.entries.length; i++) {
      let entry;
      if (data.entries[i].entryId === Number($dataEntryIdValue)) {
        entry = data.entries[i];
        data.editing = entry;
      }
    }
  }

  $inputTitle.value = data.editing?.title as string;
  $inputURL.value = data.editing?.photoURL as string;
  $textarea.value = data.editing?.notes as string;
  $img.setAttribute('src', $inputURL.value);
});
