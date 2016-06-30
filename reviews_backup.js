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
var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

var arrayOfFilters = ['reviews-all', 'reviews-recent', 'reviews-good', 'reviews-bad', 'reviews-popular'];
/**
 * @param {Array.<Object>} reviews
 * @param {string} filter
 */
var checkReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);

  switch(filter) {
    case 'reviews-all':
      break;
    case 'reviews-recent':
      var lastFourDay = reviewsToFilter.filter(function(number) {
        return (+Date.now() - +Date.parse(number.date)) < 1000 * 60 * 60 * 24 * 4;
      });
      lastFourDay.sort(function(a, b) {
        return +Date.parse(b.date) - +Date.parse(a.date);
      });
      reviewsToFilter = lastFourDay;
      break;
    case 'reviews-good':
      var goodReviews = reviewsToFilter.filter(function(number) {
        return number.rating > 5;
      });
      goodReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      reviewsToFilter = goodReviews;
      break;
    case 'reviews-bad':
      var badReviews = reviewsToFilter.filter(function(number) {
        return number.rating < 3;
      });
      badReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });
      reviewsToFilter = badReviews;
      break;
    case 'reviews-popular':
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return reviewsToFilter;
};

/**
 * @param {Array.<Object>} reviews
 * @param {Array.<Object>} filter
 */
//Функция описывающая фильтрацию отзывов по конкретному фильтру. Параметры:
//reviews - получает на вход массив reviews. Может получать другой массив в виде аргумента при использовании в другом коде
//filter - Массив отзывов отобраный по текущему фильтру
//Если в параметр filter передан массив отфильтрованых отзывов, фызываем функцию checkReviews с аргументами reviews (массив отзывов) и название текущего фильтра
//
var getFiltredReviews = function(reviews, filter) {
  if (Array.isArray(filter)) {
    for (var i = 0; i < filter.length; i++) {
      var mapToFilter = checkReviews(reviews, filter[i]);
      document.getElementById(filter[i]).nextSibling.innerHTML += '<sup>' + mapToFilter.length + '</sup>';
      if (mapToFilter.length === 0) {
        document.getElementById(filter[i]).nextSibling.classList.add('reviews-filter-item-unactive');
      }
      console.log(mapToFilter.length);
    }
  }
  return checkReviews(reviews, filter);
	};

/**
* @param {string} filter
* @param {Array.<Object>} reviews
* */
//Функция setFilter принимает параметры:
// filter - текущий фильтр для установки
// reviews - массив со веми отзывами, однако в ином случае может принимать другой массив данных для фильтрации
// Внутри функции задается в виде переменной filtredReviews, которая в последствии передается в виде парметра в функцию renderReviews
// При установке фильтра вызывается функция renderReviews для отбора подходящиx под фильтр отзывов с аргументами:
// filtredReviews - в эту переменную вызвается функция getFiltredReviews с параметрами в виде массива reviews и массива отзывов отобраных по установленому фильтру
// reviewsContainer - элемент в разметке с классом .reviews-filter содержащий в себе фильтры.
var setFilter = function(reviews, filter) {
  var filtredReviews = getFiltredReviews(reviews, filter);
  renderReviews(filtredReviews, reviewsContainer);
};

/** @param {Array.<Object>} reviews */
//Функции setFiltrationEnabled принимает на вход виде аргумента массив reviews со веми отзывами, однако в ином случае может принимать другой массив данных для фильтрации
//Внутри функции отбираем все радиобатоны по name="reviews"
//При клике на один из элементов устанавливаем фильтр вызовом функции setFilter. Аргументы передаваемые в setFilter:
//this.id - задает аргумент в виде id радио-баттона с текущим индексом
//reviews - массив отзывов
var setFiltrationEnabled = function(reviews) {
  var filtersForm = document.forms[0];
  var filters = filtersForm.elements.reviews;
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilter(reviews, this.id);
    };
  }
};

getReviews(function(loadedData) {
  var reviews = [];
  reviews = loadedData;
  getFiltredReviews(reviews, arrayOfFilters);
  setFiltrationEnabled(reviews);
  renderReviews(reviews);
});

reviewsFiltersShow();


function reviewsFiltersHide() {
  reviewsFilter.classList.add('invisible');
}

function reviewsFiltersShow() {
  reviewsFilter.classList.remove('invisible');
}
