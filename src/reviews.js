'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;


/** @constant {number} */
var LOAD_IMAGE_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @constant {integer} */
var LAST_FOUR_DAYS = 4;

/** @type {Array.<Object>} */
var reviews = [];


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

/** @param {Array.<Object>} loadedReviews */
//Функция renderReviews получает на вход массив reviews и обрабатывает каждый элемент массива,
//создавая под каждый элемент (review) отдельную запись в списке отзывов reviewsContainer
var renderReviews = function(loadedReviews) {
  reviewsContainer.innerHTML = '';

  loadedReviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};
//Создадим массив с фильтрами, где каждый элемент соответствует id фильтра в разметке
var arrayOfFilters = ['reviews-all', 'reviews-recent', 'reviews-good', 'reviews-bad', 'reviews-popular'];

//Создадим функцию, которая будет получать на вход массив reviews и проверять каждый элемент
//на предмет соответствия критериям заданным описании фильтра.
//Для этого в фунцкцию также нужно передавать фильтр, который будет проверять функция.

var getFilteredReviews = function(loadedReviews, filter) {
  var reviewsToFilter = reviews.slice(0); // создаем копию массива, чтобы не повредить reviews при фильтрации
  switch(filter) {
    case 'reviews-all':
      break;
    case 'reviews-recent':
      var today = new Date();
      var dateToCompare = today.setDate(today.getDate() - LAST_FOUR_DAYS);
      var reviewsRecent = reviewsToFilter.filter(function(review) {
        return (dateToCompare < Date.parse(review.date));

      });
      reviewsRecent.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      reviewsToFilter = reviewsRecent;
      break;
    case 'reviews-good':
      var reviewsGood = reviewsToFilter.filter(function(review) {
        return (review.rating >= 3);
      });
      reviewsGood.sort(function(a, b) {
        return Date.parse(b.rating) - Date.parse(a.rating);
      });
      reviewsToFilter = reviewsGood;
      break;
    case 'reviews-bad':
      var reviewsBad = reviewsToFilter.filter(function(review) {
        return (review.rating <= 2);
      });
      reviewsBad.sort(function(a, b) {
        return Date.parse(a.rating) - Date.parse(b.rating);
      });
      reviewsToFilter = reviewsBad;
      break;
    case 'reviews-popular':
      var reviewsPopular = reviewsToFilter.sort(function(a, b) {
        return Date.parse(b.review_usefulness) - Date.parse(a.review_usefulness);
      });
      reviewsToFilter = reviewsPopular;
      break;
  }
  return reviewsToFilter;
};

//Фильтруем reviews и отрисовываем список при клике на кнопку
var setFilter = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);
};

//Создадим функцию обработчик событий при клике, которая проверяет все радио-баттон собраные в переменную .filters
//и включает фильтр для выбраного в данный момент по id. Фильтрация происходит в момент вызова setFilter.
var setFilterEnabled = function() {
  var filters = document.getElementsByName('reviews');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilter(this.id);
    };
  }
};

//При вызове функции getReviews в качестве аргумента передается функция,
//которая инициирует новую переменную reviews и записывает в нее загруженный массив отзывов.
//Кроме того, вызывается функция renderReviews, в которую передается аргумент reviews (массив отзывов).
getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFilterEnabled(true);
  renderReviews(reviews);
});

reviewsFiltersShow();


function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}
