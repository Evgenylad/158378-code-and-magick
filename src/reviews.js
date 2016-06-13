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

var getHotelElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);


  var avatarImage = new Image();
  avatarImage.onload = function() {
    var picture = elementToClone.querySelector('.review-author');
    picture.src = data.picture;
    picture.width = '124';
    picture.height = '124';
    container.appendChild(picture);
  };
  avatarImage.src = data.picture;

  return element;
};
window.reviews.forEach(function(review) {
  getHotelElement(review, reviewsContainer);
});
