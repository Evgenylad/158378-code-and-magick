'use strict';

define(function() {
  /** @constant {string} */
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/**
 * getReviews - send request to a server for data
 * @param  {Function} callbackSuccess - call to the function which is the argument for getReviews after the data
 * have been loaded]
 * @param  {Function} callbackError - call to the function which is the argument for getReviews after the data
 * have NOT been loaded due to an error or timeout
 */
//При описании функции getReviews в качестве параметра указывается функция с аргументом loadedData, которая описывается
//в МОМЕНТ вызова функции getReviews. Таким образом действия (методы внутри функции), которые вызываются функцией могут меняться
//от кода к коду на лету и в зависимости от текущей необходимости.
  function getData(callbackSuccess, callbackError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 30000;

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callbackSuccess(loadedData);
    };
    xhr.onerror = callbackError;

    xhr.ontimeout = callbackError;

    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.send();
  }

  return getData;
});
