'use strict';
define(['./loadImage'], function(loadImage) {

  function getReviewElement(data, container, elementToClone) {
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
  }

  return getReviewElement;

});
