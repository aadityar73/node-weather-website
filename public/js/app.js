'use strict';

console.log('Client-side JavaScript is loaded!');

const search = document.querySelector('#search-input');
const searchBtn = document.querySelector('#searchBtn');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
