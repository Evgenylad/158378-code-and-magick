'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    _addListeners();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
    _removeListeners();
  //  addEventListener('input', inputFieldsOninput);
  };

  var form = document.querySelector('.review-form');
  var ratingRadioButtons = document.getElementsByName('review-mark');

  var textInput = document.getElementById('review-text');
  var nameInput = document.getElementById('review-name');

  var textLabel = form.querySelector('.review-fields-text');
  var nameLabel = form.querySelector('.review-fields-name');
  var defaultLabelDisplay = getComputedStyle(nameLabel).display;


  var reviewFieldsContainer = form.querySelector('.review-fields');

  var submitButton = form.querySelector('.review-submit');
  var reviewMarkInput = form.elements['review-mark'];

  var browserCookies = require('browser-cookies');
  reviewMarkInput.value = browserCookies.get('reviewMarkInput') || reviewMarkInput.value;
  nameInput.value = browserCookies.get('nameInput') || nameInput.value;
  form.onsubmit = function() {
    browserCookies.set('nameInput', nameInput.value);
    console.log(reviewMarkInput);
    browserCookies.set('reviewMarkInput', reviewMarkInput.value);
    this.submit();
  };
  console.log(document.browserCookies);

  nameInput.setAttribute('required', true);
  _disableForm();

  function onRadioChange() {
    var currentValue = parseInt(reviewMarkInput.value, 10);

    if(currentValue < 3) {
      textInput.setAttribute('required', true);
    } else {
      textInput.removeAttribute('required');
    }

    validateForm();
  }

  function _addListeners() {

    for(var i = 0; i < ratingRadioButtons.length; i++) {
      ratingRadioButtons[i].onchange = onRadioChange;
    }
    textInput.oninput = validateTextInput;
    nameInput.oninput = validateNameInput;
  }

  function _removeListeners() {

    for(var i = 0; i < ratingRadioButtons.length; i++) {
      ratingRadioButtons[i].onchange = null;
    }
    textInput.oninput = null;
    textInput.oninput = null;
  }

  function validateNameInput() {

    if (_checkField(nameInput)) {
      nameLabel.style.display = 'none';

      nameInput.setCustomValidity('');
    } else {
      nameLabel.style.display = defaultLabelDisplay;

      nameInput.setCustomValidity('We\'d like to know your name');
    }

    validateForm();
  }


  function validateTextInput() {

    if (_checkField(textInput)) {
      textLabel.style.display = 'none';

      textInput.setCustomValidity('');
    } else {
      textLabel.style.display = defaultLabelDisplay;

      textInput.setCustomValidity('We\'d like to know why did you rate us so low. Please let us know what you\'d like to change at the game');
    }

    validateForm();
  }


  function validateForm() {
    if (_checkField(nameInput) && _checkField(textInput)) {
      _enableForm();
    } else {
      _disableForm();
      nameLabel.style.display = defaultLabelDisplay;
      nameLabel.style.display = defaultLabelDisplay;
    }
  }


  // Disabling form
  function _disableForm() {
    reviewFieldsContainer.style.visibility = 'visible';
    submitButton.setAttribute('disabled', 'disabled');
  }


  // Enabling form
  function _enableForm() {
    reviewFieldsContainer.style.visibility = 'hidden';
    submitButton.removeAttribute('disabled');
  }

  function _checkField(input) {
    var inputLength = input.value.length;
    if (inputLength < 1 && input.required) {
      return false;
    } else {
      return true;
    }
  }
})();
