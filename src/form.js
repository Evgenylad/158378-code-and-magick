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
  var range = document.getElementsByName('review-mark');
  var text = document.getElementById('review-text');
  var name = form.querySelector('.review-form-field-name');
  var button = form.querySelector('.review-submit');

  for(var i = 0; i < range.length; i++) {
    var rangeOfElement = range[i].value;
    var rangeOfElementInt = parseInt(rangeOfElement, 10);
    if(rangeOfElementInt < 3) {
      range[i].onclick = function() {
        text.removeAttribute('disabled');
      };
    }
  }

  name.oninput = function() {
    if (name.checkValidity() === true) {
      var hideNameLabel = function() {
        var nameLabel = form.querySelector('.review-fields-name');
        nameLabel.setAttribute('visibility', true);
        nameLabel.style.visibility = 'hidden';
      };
      hideNameLabel();
      console.log(name);
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  };

  text.oninput = function() {
    if (text.checkValidity() === true) {
      var hideTextLabel = function() {
        var textLabel = form.querySelector('.review-fields-text');
        textLabel.setAttribute('visibility', true);
        textLabel.style.visibility = 'hidden';
      };
      hideTextLabel();
      console.log(name);
    }
    else {
      button.setAttribute('disabled', 'disabled');
    }
  };
})();
