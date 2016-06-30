'use strict';
define(['./utils/utilities'], function(utilities) {
  function validateForm() {
    var form = document.querySelector('.review-form');
    var textInput = document.getElementById('review-text');
    var nameInput = document.getElementById('review-name');

    var textLabel = form.querySelector('.review-fields-text');
    var nameLabel = form.querySelector('.review-fields-name');
    var defaultLabelDisplay = getComputedStyle(nameLabel).display;

    if (utilities.checkField(nameInput) && utilities.checkField(textInput)) {
      utilities.enableForm();
    } else {
      utilities.disableForm();
      nameLabel.style.display = defaultLabelDisplay;
      textLabel.style.display = defaultLabelDisplay;
    }
  }
  return {
    validateForm: validateForm
  };
});
