"use strict";

const inputElement = document.querySelector(".js-input");
const inputValue = inputElement.value;
const buttonElement = document.querySelector(".js-button");
const formElement = document.querySelector(".js-form");

let shows = [];
let favoriteShows = [];

//API

function getDataFromApi() {
fetch(`http://api.tvmaze.com//search/shows?q=${inputValue}`)
  .then((response) => response.json())
  .then((data) => {
    shows = data;
    paintShows();
  });
}

//PAINT SHOWS

function paintShows() {
    let htmlCode = '';
    for (let index = 0; index < shows.length; index++) {
        const name = shows[index].show.name;
        const image = shows[index].show.image.medium;
        htmlCode += `<li class="js-show">`;
        htmlCode += `<p class="js-show-name">${name}</p>`;
        htmlCode += `<img src="${image}" class="js-show-image" alt="${name} poster" />`
        htmlCode += '</li>';
    }
    const showsList = document.querySelector(".js-shows__list");
    showsList.innerHTML = htmlCode;
}
buttonElement.addEventListener('submit'/*o 'click'*/, getDataFromApi);

//Evitar que se envíe el formulario de forma predeterminada al presionar 'enter'
function handleForm(ev) {
    ev.preventDefault();
  }
  
formElement.addEventListener('submit', handleForm);