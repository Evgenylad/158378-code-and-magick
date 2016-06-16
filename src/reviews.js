'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

/** @constant {number} */
var LOAD_IMAGE_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

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

  var ratingValue = data.rating;
  var ratingNames = ['', '', 'two', 'three', 'four', 'five'];
  if(ratingValue >= 2 && ratingValue <= 5) {
    rating.classList.add('review-rating-' + ratingNames[ratingValue]);
  }

  container.appendChild(element);

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
  var imageToLoadIn = new Image();
  // грузим картинку
  imageToLoadIn.src = url;

  // если всё хорошо
  imageToLoadIn.onload = function() {
    clearTimeout(imageToLoadInTimeout);
    onSuccess();
  };

  // если всё плохо
  imageToLoadIn.onerror = function() {
    clearTimeout(imageToLoadInTimeout);
    onFailure();
  };

  var imageToLoadInTimeout = setTimeout(function() {
    imageToLoadIn.src = '';
    onFailure();
  }, LOAD_IMAGE_TIMEOUT);
};

/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

getReviews(function(loadedData) {
  var reviews = [];
  reviews = loadedData;
  renderReviews(reviews);
});

reviewsFiltersShow();


function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}
