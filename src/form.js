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
  var form = document.querySelector('.review-form');
  var ratingRadioButtons = document.getElementsByName('review-mark');
  var inputFields = document.getElementsByClassName('review-form-field');
  var textInput = document.getElementById('review-text');
  var nameInput = document.getElementById('review-name');
  var submitButton = form.querySelector('.review-submit');
  var reviewFieldsContainer = form.querySelector('.review-fields');
  var reviewMarkInput = form.elements['review-mark'];
  var nameLabel = form.querySelector('.review-fields-name');
  var textLabel = form.querySelector('.review-fields-text');

  nameInput.setAttribute('required', true);
  textInput.setCustomValidity('Please tell us your real name');
  textInput.setCustomValidity('We\'d like to know why did you give us so low rating. Please fill the form.');
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

  nameInput.oninput = function() {
    if (nameInput.checkValidity()) {
      _validation(nameInput, nameLabel);
      _enableElement(submitButton);
    } else {
      console.log(nameInput);
      _disableElement(submitButton);
    }
  };

  textInput.oninput = function() {
    if (textInput.checkValidity()) {
      _validation(textInput, textLabel);
      _enableElement(submitButton);
    } else {
      _disableElement(submitButton);
      textInput.setCustomValidity('We\'d like to know why did you give us so low rating. Please fill the form.');
    }
  };

  inputFields.oninput = function() {
    if (textInput.checkValidity() && nameInput.checkValidity()) {
      reviewFieldsContainer.style.visibility = 'hidden';
    }
  };

// Disabling element
  function _disableElement(disabledElement) {
    disabledElement.setAttribute('disabled', 'disabled');
  }
// Enabling element
  function _enableElement(enableElement) {
    enableElement.removeAttribute('disabled');
  }

// Validating and hiding children label if .review-fields if true.
  function _validation(input, label) {
    if (input.checkValidity()) {
      label.style.visibility = 'hidden';
    }
  }
})();
