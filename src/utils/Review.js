'use strict';

define(['./loadImage'], function(loadImage) {
  var templateElement = document.querySelector('template');
  var elementToClone;
  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }


  var Review = function(data) {
    this.data = data.author.picture;
    this._renderElement = function() {
      var element = elementToClone.cloneNode(true);
      var picture = element.querySelector('.review-author');
      element.querySelector('.review-text').textContent = data.description;
      var rating = element.querySelector('.review-rating');

      var ratingValue = data.rating;
      var ratingNames = ['', '', 'two', 'three', 'four', 'five'];
      if(ratingValue >= 2 && ratingValue <= 5) {
        rating.classList.add('review-rating-' + ratingNames[ratingValue]);
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

    this.element = this._renderElement();

    this.reviewQuiz = this.element.querySelector('.review-quiz');
    this.quizAnswerElementsCollection = this.element.querySelectorAll('.review-quiz-answer');
    this.quizAnswerElementsArray = Array.prototype.slice.call(this.quizAnswerElementsCollection);

    this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
    this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

    this.eventListeners = function() {
      this.reviewQuiz.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('review-quiz-answer-active')) {
          evt.target.classList.remove('review-quiz-answer-active');
        } else {
          evt.target.classList.add('review-quiz-answer-active');
        }
      });
    };

    this.remove = function() {
      this.element.parentNode.removeChild(this.element);
      this.quizAnswerYes.removeEventListener('click', this.addClassActiveToAnswerYes());
      this.quizAnswerNo.removeEventListener('click', this.addClassActiveToAnswerNo());
    };
  };

  return Review;

});
