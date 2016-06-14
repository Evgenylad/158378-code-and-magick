'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

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
  var avatarImage = new Image();
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  function loadImage(url, onSuccess, onFailure) {
    // грузим картинку
    avatarImage.src = url;
    // если всё хорошо
    avatarImage.onload = function() {
      onSuccess();
    };

    // если всё плохо
    avatarImage.onerror = function() {
      onFailure();
    };
  }

  loadImage(data.author.picture, function() {
    picture.src = data.author.picture;
    picture.width = '124';
    picture.height = '124';
  }, function() {
    element.classList.add('review-load-failure');
  });

  return element;
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
