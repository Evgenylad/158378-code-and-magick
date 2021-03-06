'use strict';
define(['./utils/Review', './utils/getData'], function(Review, getData) {
  function reviewsModule() {

    var reviewsFilter = document.querySelector('.reviews-filter');
    var reviewsContainer = document.querySelector('.reviews-list');
    var reviewsBlock = document.querySelector('.reviews');

    /** @constant {number} */
    var RECENT_PERIOD = 4;

    /** @constant {number} */
    var PAGE_SIZE = 3;

    /** @type {number} */
    var pageNumber = 0;

    /** @type {Array.<Object>} */
    var reviews = [];

    /** @type {Array.<Object>} */
    var filteredReviews = [];

    /** @enum {string} */
    var Filter = {
      'ALL': 'reviews-all',
      'RECENT': 'reviews-recent',
      'GOOD': 'reviews-good',
      'BAD': 'reviews-bad',
      'POPULAR': 'reviews-popular'
    };

    /** @constant {Filter} */
    var DEFAULT_FILTER = Filter.ALL;

    /** @enum {string} */
    var Rating = {
      'GOOD': 3,
      'BAD': 2
    };

    var currentReviews = [];

    /** @param {Array.<Object>} loadedReviews */
    //Функция renderReviews получает на вход массив reviews и обрабатывает каждый элемент массива,
    //создавая под каждый элемент (review) отдельную запись в списке отзывов reviewsContainer
    var renderReviews = function(reviewsToRender, page, replace) {
      if (replace) {
        reviewsContainer.innerHTML = '';
      }

      if (reviewsToRender.length < 1) {
        addNothinFoundDiv();
      }

      if (reviewsToRender.length < PAGE_SIZE) {
        document.querySelector('.reviews-controls-more').classList.add('invisible');
      } else {
        document.querySelector('.reviews-controls-more').classList.remove('invisible');
      }
      var from = page * PAGE_SIZE;
      var to = from + PAGE_SIZE;
      reviewsToRender.slice(from, to).forEach(function(reviewData) {
        var newReview = new Review(reviewData);
        reviewsContainer.appendChild(newReview.element);
        currentReviews.push(newReview);
      });
    };

    /**
     * @param {Array} reviewsFiltered
     * @param {number} page
     * @param {number} pageSize
     * @return {boolean}
     */
    var isNextPageAvailable = function(reviewsFiltered, page, pageSize) {
      return page < Math.floor(reviewsFiltered.length / pageSize);
    };

    var setMoreReviewsButtonEnabled = function() {
      var moreReviewsButton = document.querySelector('.reviews-controls-more');
      moreReviewsButton.addEventListener('click', function() {
        if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
          cleanCurrentReviews();
          pageNumber++;
          renderReviews(filteredReviews, pageNumber);
          if (!isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
            moreReviewsButton.classList.add('invisible');
          }
        }
      });
    };
    //Создадим функцию, которая будет получать на вход массив reviews и проверять каждый элемент
    //на предмет соответствия критериям заданным описании фильтра.
    //Для этого в фунцкцию также нужно передавать фильтр, который будет проверять функция.

    var getFilteredReviews = function(loadedReviews, filter) {
      var reviewsToFilter = reviews.slice(0); // создаем копию массива, чтобы не повредить reviews при фильтрации
      switch(filter) {
      /*  case Filter.ALL:
          break;
    */
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
      var reviewsToCount = getFilteredReviews(reviews, filtersLabel);
      var reviewsListLength = reviewsToCount.length;
      var sup = document.createElement('sup');
      filter.labels[0].appendChild(sup);
      sup.textContent = reviewsListLength;
      if(reviewsListLength < 1) {
        filter.classList.add('reviews-filter-item-blocked');
        filter.setAttribute('disabled', 'disabled');
      }
    };

    //Очищаем массив currentReviews
    var cleanCurrentReviews = function() {
      currentReviews.forEach(function(newReview) {
        newReview.element.remove();
      });
      return currentReviews;
    };

    //Фильтруем reviews и отрисовываем список при клике на кнопку
    var setFilter = function(filter) {
      cleanCurrentReviews();
      filteredReviews = getFilteredReviews(reviews, filter);
      pageNumber = 0;
      renderReviews(filteredReviews, pageNumber, true);
    };

    //Создадим функцию обработчик событий при клике, которая проверяет все радио-баттон собраные в переменную .filters
    //и включает фильтр для выбраного в данный момент по id. Фильтрация происходит в момент вызова setFilter.
    var setFilterEnabled = function() {
      var filters = document.getElementsByName('reviews');
      reviewsFilter.addEventListener('click', function(evt) {
        if (evt.target.id) {
          cleanCurrentReviews();
          setFilter(evt.target.id);
        }
      });
      for (var i = 0; i < filters.length; i++) {
        amountOfComments(filters[i]);
      }
    };

    function reviewsFiltersHide() {
      reviewsFilter.classList.add('invisible');
    }

    function reviewsFiltersShow() {
      reviewsFilter.classList.remove('invisible');
    }

    reviewsFiltersHide();


    reviewsBlock.classList.add('reviews-list-loading'); //Adding preLoader

    //При вызове функции getReviews в качестве аргумента передается функция,
    //которая инициирует новую переменную reviews и записывает в нее загруженный массив отзывов.
    //Кроме того, вызывается функция renderReviews, в которую передается аргумент reviews (массив отзывов).
    getData(function(loadedReviews) {
      reviews = loadedReviews;
      setFilterEnabled();
      setFilter(DEFAULT_FILTER);
      reviewsBlock.classList.remove('reviews-list-loading'); //Removing preLoader in case of success
      if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
        renderReviews(reviews, pageNumber, true);
      }
      reviewsFiltersShow();
      setMoreReviewsButtonEnabled();
    }, function() {
      reviewsBlock.classList.remove('reviews-list-loading'); //Removing preLoader in case of error
      reviewsBlock.querySelector('.reviews').classList.add('reviews-load-failure');
    });
  }

  return reviewsModule;
});
