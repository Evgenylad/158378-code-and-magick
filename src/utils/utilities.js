'use strict';
define(function() {
  function _checkField(input) {
    var inputLength = input.value.length;
    if (inputLength < 1 && input.required) {
      return false;
    } else {
      return true;
    }
  }

  // Enabling form
  function _enableForm(reviewFieldsContainer, submitButton) {
    reviewFieldsContainer.style.visibility = 'hidden';
    submitButton.removeAttribute('disabled');
  }

  // Disabling form
  function _disableForm(reviewFieldsContainer, submitButton) {
    reviewFieldsContainer.style.visibility = 'visible';
    submitButton.setAttribute('disabled', 'disabled');
  }

  return {
    checkField: _checkField,
    enableForm: _enableForm,
    disableForm: _disableForm
  };
});
