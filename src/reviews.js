'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

reviewsFiltersHide();

function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

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
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);


  var avatarImage = new Image();
  avatarImage.onload = function() {
    element.querySelector('.review-author').src = data.author.picture;
    element.querySelector('.review-author').width = '124';
    element.querySelector('.review-author').height = '124';
    container.appendChild(element);
  };
  avatarImage.src = data.author.picture;
  return element;
};
window.reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});
