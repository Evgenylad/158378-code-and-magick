'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var range = document.getElementsByName('review-mark');
  var text = document.getElementById('review-text');
  for(var i = 0; i < range.length; i++) {
    var rangeOfElement = range[i].value;
    var rangeOfElementInt = parseInt(rangeOfElement, 10);
    if(rangeOfElementInt < 3) {
      range[i].onclick = function() {
        text.removeAttribute('disabled');
      };
    }
  }
})();
