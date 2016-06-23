'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
var reviewsBlock = document.querySelector('.reviews');

/** @constant {number} */
var LOAD_IMAGE_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @constant {number} */
var RECENT_PERIOD = 4;

/** @constant {number} */
var PAGE_SIZE = 3;

/** @type {number} */
var pageNumber = 0;

/** @type {Array.<Object>} */
var reviews = [];

/** @enum {string} */
var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};
/** @enum {string} */
var Rating = {
  'GOOD': 3,
  'BAD': 2
};

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

/**
 * [getReviews - send request to a server for data]
 * @param  {Function} callbackSuccess [call to the function which is the argument for getReviews after the data
 * have been loaded]
 * @param  {Function} callbackError [call to the function which is the argument for getReviews after the data
 * have NOT been loaded due to an error or timeout]
 */
//При описании функции getReviews в качестве параметра указывается функция с аргументом loadedData, которая описывается
//в МОМЕНТ вызова функции getReviews. Таким образом действия (методы внутри функции), которые вызываются функцией могут меняться
//от кода к коду на лету и в зависимости от текущей необходимости.
var getReviews = function(callbackSuccess, callbackError) {
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
};

/** @param {Array.<Object>} loadedReviews */
//Функция renderReviews получает на вход массив reviews и обрабатывает каждый элемент массива,
//создавая под каждый элемент (review) отдельную запись в списке отзывов reviewsContainer
var renderReviews = function(loadedReviews, page) {
  reviewsContainer.innerHTML = '';

  if(loadedReviews.length < 1) {
    addNothinFoundDiv();
  }
  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  document.querySelector('.reviews-controls-more').classList.remove('invisible');
  loadedReviews.slice(from, to).forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

/**
 * @param {Array} hotels
 * @param {number} page
 * @param {number} pageSize
 * @return {boolean}
 */
var isNextPageAvailable = function(reviewsFiltered, page, pageSize) {
  return page < Math.floor(reviewsFiltered.length / pageSize);
};

var setMoreReviewsButtonEnabled = function(reviewsFiltered) {
  var moreReviewsButton = document.querySelector('.reviews-controls-more');
  moreReviewsButton.addEventListener('click', function() {
    if(isNextPageAvailable(reviewsFiltered, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(reviewsFiltered, pageNumber);
    }
  });
};
//Создадим функцию, которая будет получать на вход массив reviews и проверять каждый элемент
//на предмет соответствия критериям заданным описании фильтра.
//Для этого в фунцкцию также нужно передавать фильтр, который будет проверять функция.

var getFilteredReviews = function(loadedReviews, filter) {
  var reviewsToFilter = reviews.slice(0); // создаем копию массива, чтобы не повредить reviews при фильтрации
  switch(filter) {
    /*case Filter.ALL:
      break;*/
    case Filter.RECENT:
      var today = new Date();
      var dateToCompare = today.setDate(today.getDate() - RECENT_PERIOD);
      return reviewsToFilter
        .filter(function(review) {
          return (dateToCompare < Date.parse(review.date));
        })
        .sort(function(a, b) {
          return (b.date - a.date);
        });

    case Filter.GOOD:
      return reviewsToFilter
        .filter(function(review) {
          return (review.rating >= Rating.GOOD);
        })
        .sort(function(a, b) {
          return (b.rating - a.rating);
        });

    case Filter.BAD:
      return reviewsToFilter
        .filter(function(review) {
          return (review.rating <= Rating.BAD);
        })
        .sort(function(a, b) {
          return (a.rating - b.rating);
        });

    case Filter.POPULAR:
      return reviewsToFilter.sort(function(a, b) {
        return (b.review_usefulness - a.review_usefulness);
      });
  }
  return reviewsToFilter;
};

var addNothinFoundDiv = function() {
  var alert = document.createElement('div');
  reviewsContainer.appendChild(alert);
  alert.classList.add('nothing-found');
  alert.textContent = 'Ничего не найдено...';
  alert.style.color = 'white';
  alert.style.textAlign = 'center';
  alert.style.margin = '20px';
  alert.style.fontSize = '220%';
};

var amountOfComments = function(filter) {
  var filtersLabel = filter.id;
  var filteredReviews = getFilteredReviews(reviews, filtersLabel);
  var reviewsListLength = filteredReviews.length;
  var sup = document.createElement('sup');
  filter.labels[0].appendChild(sup);
  sup.textContent = reviewsListLength;
  if(reviewsListLength < 1) {
    filter.classList.add('reviews-filter-item-blocked');
    filter.setAttribute('disabled', 'disabled');
  }
};

//Фильтруем reviews и отрисовываем список при клике на кнопку
var setFilter = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews, pageNumber);
  setMoreReviewsButtonEnabled(filteredReviews);
};

//Создадим функцию обработчик событий при клике, которая проверяет все радио-баттон собраные в переменную .filters
//и включает фильтр для выбраного в данный момент по id. Фильтрация происходит в момент вызова setFilter.
var setFilterEnabled = function() {
  var filters = document.getElementsByName('reviews');
  for (var i = 0; i < filters.length; i++) {
    amountOfComments(filters[i]);
    filters[i].onclick = function() {
      setFilter(this.id);
    };
  }
};

function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}

reviewsFiltersHide();

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

reviewsBlock.classList.add('reviews-list-loading'); //Adding preLoader

//При вызове функции getReviews в качестве аргумента передается функция,
//которая инициирует новую переменную reviews и записывает в нее загруженный массив отзывов.
//Кроме того, вызывается функция renderReviews, в которую передается аргумент reviews (массив отзывов).
getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFilterEnabled();
  renderReviews(reviews, pageNumber);
  reviewsBlock.classList.remove('reviews-list-loading'); //Removing preLoader in case of success
  reviewsFiltersShow();
}, function() {
  reviewsBlock.classList.remove('reviews-list-loading'); //Removing preLoader in case of error
  reviewsBlock.querySelector('.reviews').classList.add('reviews-load-failure');
});
