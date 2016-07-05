'use strict';
define(['./loadImage'], function(loadImage) {

  var Review = function(data, container, elementToClone) {
    this.data = data.author.picture;
    this.element = function() {
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

    this.quizAnswerYes = container.querySelector('.review-quiz-answer-yes');
    this.quizAnswerNo = container.querySelector('.review-quiz-answer-no');

    this.addClassActiveToAnswerYes = function() {
      this.quizAnswerYes.classList.add('review-quiz-answer-active');
    };

    this.addClassActiveToAnswerNo = function() {
      this.quizAnswerNo.classList.add('review-quiz-answer-active');
    };

    this.eventListeners = function() {
      this.quizAnswerYes.addEventListener('click', this.addClassActiveToAnswerYes());
      this.quizAnswerNo.addEventListener('click', this.addClassActiveToAnswerNo());
    };
    this.remove = function() {
      var review = container.querySelector('.review');
      container.removeChild(review);
      this.quizAnswerYes.removeEventListener('click', this.addClassActiveToAnswerYes());
      this.quizAnswerNo.removeEventListener('click', this.addClassActiveToAnswerNo());
    };
  };
  return Review;
});
