'use strict';
define(function() {

  /** @constant {number} */
  var KEYCODE_ESCAPE = 27;

  var galleryContainer = document.querySelector('.overlay-gallery');
  var previewContainer = galleryContainer.querySelector('.overlay-gallery-preview');

  var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
  var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');
  var controlCross = galleryContainer.querySelector('.overlay-gallery-close');

  /** @type {number} */
  var picturesAtPhotogallery = 6;

  /**@type {number}*/
  var galleryActivePicture;

  /**@type {Array.<string>}*/
  var galleryPictures = [];

  /**@param {Array.<string>} pictures
   * @return {Array.<string>}
   * */

  function saveImages(pictures) {
    galleryPictures = pictures;
    return galleryPictures;
  }

  var _attachListeners = function() {
    _galleryMoveLeft();
    _galleryMoveRight();
    _galleryHide();
  };

  var removeEventListeners = function() {
    controlLeft.removeEventListener('click', showLeftPicture);
    controlRight.removeEventListener('click', showRightPicture);
  };

  var _galleryMoveLeft = function() {
    controlLeft.addEventListener('click', showLeftPicture);
  };

  var _galleryMoveRight = function() {
    controlRight.addEventListener('click', showRightPicture);
  };

  var _galleryHide = function() {
    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === KEYCODE_ESCAPE) {
        galleryContainer.classList.add('invisible');
        removeEventListeners();
      }
    });

    controlCross.addEventListener('click', function() {
      galleryContainer.classList.add('invisible');
      removeEventListeners();
    });
  };

  var showLeftPicture = function() {
    if(galleryActivePicture > 0) {
      preview.parentNode.removeChild(preview);
      galleryActivePicture--;
      showPicture(galleryActivePicture);
    }
    return galleryActivePicture;
  };

  var showRightPicture = function() {
    if(galleryActivePicture < picturesAtPhotogallery) {
      preview.parentNode.removeChild(preview);
      galleryActivePicture++;
      showPicture(galleryActivePicture);
    }
    return galleryActivePicture;
  };

  var preview;
  var showPicture = function(pic) {
    preview = new Image();
    preview.classList.add('gallery-fullscreen-image');
    previewContainer.appendChild(preview);
    preview.src = galleryPictures[pic];
  };

  function showGallery(pic) {
    galleryActivePicture = pic;
    galleryContainer.classList.remove('invisible');
    showPicture(galleryActivePicture);
    _attachListeners();
  }

  return {
    saveImages: saveImages,
    showGallery: showGallery
  };
});
