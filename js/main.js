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
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
