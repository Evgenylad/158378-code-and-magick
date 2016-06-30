'use strict';
define(function() {
  function contactFormModule() {

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

    var monthOfBirth = 5;
    var dayOfBirth = 11;

    var expires = getDaysFromLastBirthday(monthOfBirth, dayOfBirth);

    var browserCookies = require('browser-cookies');
    reviewMarkInput.value = browserCookies.get('reviewMarkInput') || reviewMarkInput.value;
    nameInput.value = browserCookies.get('nameInput') || nameInput.value;

    form.onsubmit = function() {
      browserCookies.set('nameInput', nameInput.value, {expires: expires});
      browserCookies.set('reviewMarkInput', reviewMarkInput.value, {expires: expires});
      this.submit();
    };

    nameInput.setAttribute('required', true);
    _disableForm();

    /**
   * get days from last birthday
   * @param  {month:number, day:number} month, day — your last birthday
   * @return {number} days from last birthday
   */

    function getDaysFromLastBirthday(month, day) {
      var today = new Date();
      var thisYear = today.getFullYear();
      var todayMonth = today.getMonth();
      var todayDay = today.getDate();
      var todayFormated = new Date(thisYear, todayMonth, todayDay);
      var myBirthday = new Date(thisYear, month, day);
      var daysFromLastBirthday;

      if (myBirthday > todayFormated) {
        myBirthday = new Date(thisYear - 1, month, day);
      }
      daysFromLastBirthday = Math.floor((todayFormated - myBirthday) / 24 / 60 / 60 / 1000);
      return daysFromLastBirthday;
    }

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

  }
  return contactFormModule;
});
