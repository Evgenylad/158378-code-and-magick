'use strict';
define(function() {
  var form = document.querySelector('.review-form');
  var submitButton = form.querySelector('.review-submit');
  var reviewFieldsContainer = form.querySelector('.review-fields');

  function _checkField(input) {
    var inputLength = input.value.length;
    if (inputLength < 1 && input.required) {
      return false;
    } else {
      return true;
    }
  }

  // Enabling form
  function _enableForm() {
    reviewFieldsContainer.style.visibility = 'hidden';
    submitButton.removeAttribute('disabled');
  }

  // Disabling form
  function _disableForm() {
    reviewFieldsContainer.style.visibility = 'visible';
    submitButton.setAttribute('disabled', 'disabled');
  }

  return {
    checkField: _checkField,
    enableForm: _enableForm,
    disableFrom: _disableForm
  };
});
