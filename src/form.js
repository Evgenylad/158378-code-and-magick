'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    textInput.addEventListener('input', textInputOninput);
    nameInput.addEventListener('input', nameInputOninput);
  //  addEventListener('input', inputFieldsOninput);
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
    textInput.removeEventListener('input', textInputOninput);
    nameInput.removeEventListener('input', nameInputOninput);
  //  addEventListener('input', inputFieldsOninput);
  };
  var form = document.querySelector('.review-form');
  var ratingRadioButtons = document.getElementsByName('review-mark');
  var textInput = document.getElementById('review-text');
  var nameInput = document.getElementById('review-name');
  var submitButton = form.querySelector('.review-submit');
  var reviewFieldsContainer = form.querySelector('.review-fields');
  var reviewMarkInput = form.elements['review-mark'];
  var nameLabel = form.querySelector('.review-fields-name');
  var textLabel = form.querySelector('.review-fields-text');

  nameInput.setAttribute('required', true);
// name.setCustomValidity('Please tell us your real name');
//textInput.setCustomValidity('We\'d like to know why did you give us so low rating. Please fill the form.');
  _disableElement(submitButton);
  for(var i = 0; i < ratingRadioButtons.length; i++) {
    ratingRadioButtons[i].onchange = function() {
      var currentValue = parseInt(reviewMarkInput.value, 10);
      textInput.removeAttribute('disabled');
      if(currentValue < 3) {
        textInput.setAttribute('required', true);
      } else {
        textInput.removeAttribute('required');
      }
    };
  }

  var nameInputOninput = function() {
    var nameInputLength = nameInput.value.length;
    if (nameInputLength > 0) {
      _validation(nameInput, nameLabel);
    } else if (nameInputLength > 0 && textInputLength > 0) {
      hideReviewField();
      _enableElement(submitButton);
    } else {
      _disableElement(submitButton);
      nameLabel.style.visibility = 'visible';
      nameInput.setCustomValidity('Please tell us your real name');
      reviewFieldsContainer.style.visibility = 'visible';
    }
  };

  var textInputOninput = function() {
    var textInputLength = textInput.value.length;
    if (textInputLength > 0 && textInput.required) {
      _validation(textInput, textLabel);
      hideReviewField();
    } else if (textInputLength > 0) {
      _validation(textInput, textLabel);
      _enableElement(submitButton);
    } else {
      textInput.setCustomValidity('We\'d like to know why did you give us so low rating. Please fill the form.');
      _disableElement(submitButton);
      textLabel.style.visibility = 'visible';
      reviewFieldsContainer.style.visibility = 'visible';
    }
  };

  var hideReviewField = function() {
    reviewFieldsContainer.style.visibility = 'hidden';
  };


// Disabling element
  function _disableElement(disabledElement) {
    disabledElement.setAttribute('disabled', 'disabled');
  }
// Enabling element
  function _enableElement(enableElement) {
    enableElement.removeAttribute('disabled');
  }
// Validating and hiding .review-fields's children label if true.
  function _validation(input, label) {
    label.style.visibility = 'hidden';
  }
})();
