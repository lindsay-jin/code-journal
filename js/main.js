'use strict';
const $inputURL = document.getElementById('photoURL');
$inputURL?.addEventListener('input', () => {
  const $img = document.querySelector('img');
  $img.setAttribute('src', $inputURL.value);
});
const $form = document.querySelector('form');
$form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const $inputTitle = document.getElementById('title');
  const $textarea = document.querySelector('textarea');
  const obj = {
    title: $inputTitle?.value,
    photoURL: $inputURL.value,
    notes: $textarea.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(obj);
  const $img = document.querySelector('img');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
