'use strict';
define(['./utils/utilities'], function(utilities) {
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

    var submitButton = form.querySelector('.review-submit');
    var reviewFieldsContainer = form.querySelector('.review-fields');
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
    utilities.disableForm(reviewFieldsContainer, submitButton);

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

      if (utilities.checkField(nameInput)) {
        nameLabel.style.display = 'none';

        nameInput.setCustomValidity('');
      } else {
        nameLabel.style.display = defaultLabelDisplay;

        nameInput.setCustomValidity('We\'d like to know your name');
      }

      validateForm();
    }


    function validateTextInput() {

      if (utilities.checkField(textInput)) {
        textLabel.style.display = 'none';

        textInput.setCustomValidity('');
      } else {
        textLabel.style.display = defaultLabelDisplay;

        textInput.setCustomValidity('We\'d like to know why did you rate us so low. Please let us know what you\'d like to change at the game');
      }

      validateForm();
    }


    function validateForm() {
      if (utilities.checkField(nameInput) && utilities.checkField(textInput)) {
        utilities.enableForm(reviewFieldsContainer, submitButton);
      } else {
        utilities.disableForm(reviewFieldsContainer, submitButton);
        nameLabel.style.display = defaultLabelDisplay;
      }
    }

  }
  return contactFormModule;
});
