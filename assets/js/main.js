"use strict";

//Elementos que me traigo del HTML
const inputElement = document.querySelector(".js-input");
const buttonElement = document.querySelector(".js-button");
const formElement = document.querySelector(".js-form");

//Arrays de objetos que voy a usar
let shows = [];
let favoriteShows = [];


//API
function getDataFromApi() {
fetch(`http://api.tvmaze.com//search/shows?q=${inputElement.value}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    shows = data;
    paintShows();
  });
}
buttonElement.addEventListener('click', getDataFromApi);


//PAINT SHOWS
function paintShows() {
    let htmlCode = '';
    for (let index = 0; index < shows.length; index++) {
        let name = shows[index].show.name;
        let image = shows[index].show.image;
        htmlCode += `<li class="shows__list--element">`;
        if (image === null) {
            htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
            text=TV" class="show-image" alt="No image available" />`
        } else {
        htmlCode += `<img src="${image.medium}" class="show-image" alt="${name} poster" />`
        }
        htmlCode += `<h4 class="show-name">${name}</h4>`;
        htmlCode += '</li>';
    }
    const showsList = document.querySelector(".js-shows__list");
    showsList.innerHTML = htmlCode;
}

//

//Evitar que se envíe el formulario de forma predeterminada al presionar 'enter'
function handleForm(ev) {
    ev.preventDefault();
    getDataFromApi();
  }
  
formElement.addEventListener('submit', handleForm);
