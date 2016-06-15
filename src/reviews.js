'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
var imageToLoadIn;
var LOAD_IMAGE_TIMEOUT = 10000;


reviewsFiltersHide();

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/**
*@param {Object} data
*@param {HTMLElement} container
*@return {HTMLElement}
*/

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var picture = element.querySelector('.review-author');
  element.querySelector('.review-text').textContent = data.description;
  var rating = element.querySelector('.review-rating');

  switch (data.rating) {
    case 2: rating.classList.add('review-rating-two');
      break;
    case 3: rating.classList.add('review-rating-three');
      break;
    case 4: rating.classList.add('review-rating-four');
      break;
    case 5: rating.classList.add('review-rating-five');
      break;
    default:
      break;
  }
  container.appendChild(element);

  imageToLoadIn = new Image();

  loadImage(data.author.picture, function() {
    picture.src = data.author.picture;
    picture.width = '124';
    picture.height = '124';
  }, function() {
    element.classList.add('review-load-failure');
  });
  return element;
};

var loadImage = function(url, onSuccess, onFailure) {
  imageToLoadIn = new Image();
  // грузим картинку
  imageToLoadIn.src = url;

  // если всё хорошо
  imageToLoadIn.onload = function() {
    onSuccess();
    clearTimeout(imageToLoadInTimeout);
  };

  // если всё плохо
  imageToLoadIn.onerror = function() {
    onFailure();
  };

  var imageToLoadInTimeout = setTimeout(function() {
    imageToLoadIn.src = '';
    onFailure();
  }, LOAD_IMAGE_TIMEOUT);
};

__loadCallback('//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', function(data) {
  window.reviews = data;
  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
});

reviewsFiltersShow();

function __loadCallback(src, callback) {
  var dataStorageLink = document.createElement('script');
  document.body.appendChild(dataStorageLink);
  dataStorageLink.src = src;

  window.__reviewsLoadCallback = function(data) {
    delete window.__reviewsLoadCallback;
    callback(data);
  };
}

function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}

// обычная загрузка картинки
loadImage('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', function() {
  var img = document.createElement('img');
  document.body.appendChild(img);
  img.src = 'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg';
}, null);
// загрузка очень большой картинки (24мб)
loadImage('http://photojournal.jpl.nasa.gov/jpeg/PIA13932.jpg', null, function() {
  console.log('Ошибка! Должен сработать таймер 10 секунд');
});
