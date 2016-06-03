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

  var form = document.forms[1];
  var range = form.elements['review-mark'];
  var text = document.getElementById('review-text');
  var checkingRange = function() {
    if(range.value < 3) {
      text.removeAttribute('disabled');
      console.log(text);

    }
  };

  checkingRange();

})();
