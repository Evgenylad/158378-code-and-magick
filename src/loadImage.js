'use strict';

define(function() {
  /** @constant {number} */
  var LOAD_IMAGE_TIMEOUT = 10000;

  var loadImageModule = function(url, onSuccess, onFailure) {
    var imageToLoadIn = new Image();
    // грузим картинку
    imageToLoadIn.src = url;

    // если всё хорошо
    imageToLoadIn.onload = function() {
      clearTimeout(imageToLoadInTimeout);
      onSuccess();
    };

    // если всё плохо
    imageToLoadIn.onerror = function() {
      clearTimeout(imageToLoadInTimeout);
      onFailure();
    };

    var imageToLoadInTimeout = setTimeout(function() {
      imageToLoadIn.src = '';
      onFailure();
    }, LOAD_IMAGE_TIMEOUT);
  };

  return loadImageModule;
});
