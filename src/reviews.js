'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

/** @constant {number} */
var LOAD_IMAGE_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

reviewsFiltersHide();

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/**
*@param {Object} data
*@param {HTMLElement} container
*@return {HTMLElement}
*/

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  var picture = element.querySelector('.review-author');
  element.querySelector('.review-text').textContent = data.description;
  var rating = element.querySelector('.review-rating');

  var ratingValue = data.rating;
  var ratingNames = ['', '', 'two', 'three', 'four', 'five'];
  if(ratingValue >= 2 && ratingValue <= 5) {
    rating.classList.add('review-rating-' + ratingNames[ratingValue]);
  }

  container.appendChild(element);

  loadImage(data.author.picture, function() {
    picture.src = data.author.picture;
    picture.width = '124';
    picture.height = '124';
  }, function() {
    element.classList.add('review-load-failure');
  });
  return element;
};

var loadImage = function(url, onSuccess, onFailure) {
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

/** @param {function(Array.<Object>)} callback */
//При описании функции getReviews в качестве параметра указывается функция с аргументом loadedData, которая описывается
//в МОМЕНТ вызова функции getReviews. Таким образом действия (методы внутри функции), которые вызываются функцией могут меняться
//от кода к коду на лету и в зависимости от текущей необходимости.
var getReviews = function(callback) {
  var reviewsBlock = document.querySelector('.reviews');
  reviewsBlock.classList.add('.reviews-list-loading'); //Adding preLoader
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    reviewsBlock.classList.remove('.reviews-list-loading'); //Removing preLoader in case of success
    callback(loadedData);
  };
  xhr.onerror = function() {
    reviewsBlock.classList.remove('reviews-list-loading'); //Removing preLoader in case of error
    reviewsBlock.querySelector('.reviews').classList.add('reviews-load-failure');
  };
  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

/** @param {Array.<Object>} reviews */
//Функциия renderReviews получает на вход массив reviews и обрабатывает каждый элемент массива,
//создавая под каждый элемент (review) отдельную запись в списке отзывов reviewsContainer
var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};
//Создадим массив с фильтрами, где каждый элемент соответствует id фильтра в разметке
var arrayOfFilters = ['reviews-all', 'reviews-recent', 'reviews-good', 'reviews-bad', 'reviews-popular'];

//Создадим функцию, которая будет получать на вход массив reviews и проверять каждый элемент
//на предмет соответствия критериям заданным описании фильтра.
//Для этого в фунцкцию также нужно передавать фильтр, который будет проверять функция.

var checkReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0); // создаем копию массива, чтобы не повредить reviews при фильтрации
  switch(filter) {
    case 'reviews-all':
      break;
    case 'reviews-recent':
      var reviewsRecent = reviewsToFilter.filter(function(review) {
        for(var i = 0; i < reviews.length; i++) {
          var lastFourDays = 1000 * 60 * 60 * 24 * 4;
          var today = new Date();
          if(review.date >= (today - lastFourDays)) {
            return true;
          }
        }
        return reviewsRecent;
      });
  }
  return reviewsToFilter;
};

//При вызове функции getReviews в качестве аргумента передается функция,
//которая инициирует новую переменную reviews и записывает в нее загруженный массив отзывов.
//Кроме того, вызывается функция renderReviews, в которую передается аргумент reviews (массив отзывов).
getReviews(function(loadedData) {
  var reviews = [];
  reviews = loadedData;
  renderReviews(reviews);
  checkReviews(reviews, 'reviews-recent');
  console.log(reviewsRecent);
});

reviewsFiltersShow();


function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}
