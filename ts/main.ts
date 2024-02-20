/* global data */
interface Obj {
  title: string;
  photoURL: string;
  notes: string;
  entryId: number;
}

const $inputURL = document.getElementById('photoURL') as HTMLInputElement;

$inputURL?.addEventListener('input', () => {
  const $img = document.querySelector('img') as HTMLElement;
  $img.setAttribute('src', $inputURL.value);
});

const $form = document.querySelector('form');

$form?.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $inputTitle = document.getElementById('title') as HTMLInputElement;
  const $textarea = document.querySelector('textarea') as HTMLTextAreaElement;

  const obj: Obj = {
    title: $inputTitle?.value,
    photoURL: $inputURL.value,
    notes: $textarea.value,
    entryId: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(obj);

  const $img = document.querySelector('img') as HTMLElement;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
