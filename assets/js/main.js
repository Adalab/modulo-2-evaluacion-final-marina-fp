"use strict";

//Elementos que me traigo del HTML
const inputElement = document.querySelector('.js-input');
const buttonElement = document.querySelector('.js-button');
const formElement = document.querySelector('.js-form');
const favoritesListElement = document.querySelector('.js-favorites-list')

//Arrays de objetos que voy a usar
let shows = [];
let favoriteShows = [];


//API
function getDataFromApi() {
fetch(`http://api.tvmaze.com//search/shows?q=${inputElement.value}`)
  .then((response) => response.json())
  .then((data) => {
    shows = data;
    paintShows();
  });
}
buttonElement.addEventListener('click', getDataFromApi);


//Pintar series que coinciden con la búsqueda de la usuaria
function paintShows() {
    let htmlCode = '';
    for (const series of shows) {
        //PARA BORRAR CUANDO ESTÉ SEGURA DE USAR FOR OF let index = 0; index < shows.length; index++) {
        let idShow = series.show.id;
        let nameShow = series.show.name;
        let imageShow = series.show.image;

            //Si es favorita la pinto con una clase más que le dará el estilo
            let isFavoriteClass;
            if (isFavoriteShow(series)) {
                isFavoriteClass = 'fav-mode';
            } else { 
                isFavoriteClass = ''
            }
    
        htmlCode += `<li class="shows__list--element ${isFavoriteClass} js-show" id="${idShow}">`;

            //Si no tiene imagen le aplico una por defecto
            const noImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
            if (imageShow === null) {
                htmlCode += `<img src="${noImage}" class="show-image" alt="No image available" />`
            } else {
                htmlCode += `<img src="${imageShow.medium}" class="show-image" alt="${nameShow} poster" />`
            }

        htmlCode += `<h4 class="show-name">${nameShow}</h4>`;
        htmlCode += '</li>';
    }
    const showsList = document.querySelector('.js-shows__list');
    showsList.innerHTML = htmlCode;
    paintFavorites();
    listenToShows();
}

//Pinto el array de las series marcadas como favoritas en su correspondiente lista
function paintFavorites() {
    let htmlCode = '';
    for (const favorite of favoriteShows) {
        let nameFavorite = favorite.show.name;
        let imageFavorite = favorite.show.image;
        
        htmlCode += `<li class="favorites__list--element">`
        const noImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
            if (imageFavorite === null) {
                htmlCode += `<img src="${noImage}" class="favorite-image" alt="No image available" />`
            } else {
                htmlCode += `<img src="${imageFavorite.medium}" class="show-image" alt="${nameFavorite} poster" />`
            }
        htmlCode += `<h5 class="show-name">${nameFavorite}</h5>`;
        htmlCode += '</li>'
    }
    favoritesListElement.innerHTML = htmlCode
}

//Definir si una serie es favorita o no
function isFavoriteShow(series) {
    const favoriteFound = favoriteShows.find((favorite) => {
        return favorite.show.id === series.show.id;
    });
    if (favoriteFound === undefined) {
        return false;
    } else {
        return true;
    }
}

//Escuchar eventos en las tarjetas de las series
function listenToShows() {
const cardsElements = document.querySelectorAll('.js-show');
    for (const cardElement of cardsElements) {
        cardElement.addEventListener('click', handleShows);   
    }
}

//Añadir show a al array de favoritos 
function handleShows(ev) {
    const clickedShowId = parseInt(ev.currentTarget.id);
    const favoriteFoundIndex = favoriteShows.findIndex(function (favorite) {
        return favorite.show.id === clickedShowId;
    });

    if (favoriteFoundIndex === -1) {
        const showFound = shows.find(function (series) {
            return series.show.id === clickedShowId;
        });
        favoriteShows.push(showFound);
    } else {
        favoriteShows.splice(favoriteFoundIndex, 1);
    }
    setInLocalStorage();
    paintShows();
}

//Guardamos el array de favoritas en el LocalStorage pasándolo antes a string
function setInLocalStorage() {
    const stringFavoriteShows = JSON.stringify(favoriteShows);
    localStorage.setItem('favoriteShows', stringFavoriteShows);
}

//Evitar que se envíe el formulario de forma predeterminada al presionar 'enter'
function handleForm(ev) {
    ev.preventDefault();
    //getDataFromApi();
}  
formElement.addEventListener('submit', handleForm);