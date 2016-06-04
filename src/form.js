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
  var rangeRadioButton = document.getElementsByName('review-mark');
  var textInput = document.getElementById('review-text');
  var nameInput = form.querySelector('.review-form-field-name');
  var submitButton = form.querySelector('.review-submit');
  var reviewFields = form.querySelector('.review-fields');
  var reviewMarkInput = form.elements['review-mark'];
  var nameLabel = form.querySelector('.review-fields-name');
  var textLabel = form.querySelector('.review-fields-text');

  nameInput.setAttribute('required', true);
  _disableElement(submitButton);
  for(var i = 0; i < rangeRadioButton.length; i++) {
    rangeRadioButton[i].onchange = function() {
      var currentValue = parseInt(reviewMarkInput.value, 10);
      textInput.removeAttribute('disabled');
      if(currentValue < 3) {
        textInput.setAttribute('required', true);
      }
    };
  }

  nameInput.oninput = function() {
    if (nameInput.checkValidity()) {
      _hideLabel(nameLabel);
      _enableElement(submitButton);
    }
  };

  textInput.oninput = function() {
    if (textInput.checkValidity()) {
      _hideLabel(textLabel);
    } else {
      _disableElement(submitButton);
    }
  };

  _hideReview();


// Disabling element
  function _disableElement(disabledElement) {
    disabledElement.setAttribute('disabled', 'disabled');
  }
// Enabling element
  function _enableElement(enableElement) {
    enableElement.removeAttribute('disabled');
  }
// Hiding label's block
  function _hideReview() {
    if (textInput.checkValidity() && nameInput.checkValidity()) {
      reviewFields.style.visibility = 'hidden';
      console.log(reviewFields);
    }
  }
  // Hiding label
  function _hideLabel(hideLabel) {
    if (textInput.checkValidity()) {
      hideLabel.style.visibility = 'hidden';
    }
  }
})();
