'use strict';
define(function() {

  /** @constant {number} */
  var KEYCODE_ESCAPE = 27;

  var galleryContainer = document.querySelector('.overlay-gallery');
  var previewContainer = galleryContainer.querySelector('.overlay-gallery-preview');

  var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
  var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');
  var controlCross = galleryContainer.querySelector('.overlay-gallery-close');

  var previewNumberTotal = galleryContainer.querySelector('.preview-number-total');
  var previewNumberCurrent = galleryContainer.querySelector('.preview-number-current');

  /** @type {number} */
  var picturesAtPhotogallery;

  /**@type {number}*/
  var galleryActivePicture;

  /**@type {Array.<string>}*/
  var galleryPictures = [];

  /**@type {HTMLImageElement} current gallery image */
  var preview;

  /**
   * @param {Array.<string>} pictures
   * */
  function saveImages(pictures) {
    galleryPictures = pictures;
    picturesAtPhotogallery = galleryPictures.length;
  }


  /*================================
  =            LISTENERS           =
  ================================*/

  var _attachListeners = function() {
    controlLeft.addEventListener('click', showLeftPicture);
    controlRight.addEventListener('click', showRightPicture);

    document.addEventListener('keydown', onKeydown);
    controlCross.addEventListener('click', onControlCrossClick);
  };

  var _removeListeners = function() {
    controlLeft.removeEventListener('click', showLeftPicture);
    controlRight.removeEventListener('click', showRightPicture);

    document.removeEventListener('keydown', onKeydown);
    controlCross.removeEventListener('click', onControlCrossClick);
  };

  var showLeftPicture = function() {
    if(galleryActivePicture > 0) {
      galleryActivePicture--;
    } else {
      galleryActivePicture = picturesAtPhotogallery - 1;
    }
    showPicture(galleryActivePicture);
  };

  var showRightPicture = function() {

    if(galleryActivePicture < picturesAtPhotogallery - 1) {
      galleryActivePicture++;
    } else {
      galleryActivePicture = 0;
    }

    showPicture(galleryActivePicture);
  };

  var onControlCrossClick = function() {
    galleryContainer.classList.add('invisible');
    hideGallery();
  };

  var onKeydown = function(evt) {
    if (evt.keyCode === KEYCODE_ESCAPE) {
      galleryContainer.classList.add('invisible');
      hideGallery();
    }
  };
  /*=====  End of LISTENERS ======*/

  var showPicture = function(pic) {
    preview.src = galleryPictures[pic];
    previewNumberCurrent.textContent = pic + 1;
  };

  function showGallery(pic) {
    // adding a preview
    preview = new Image();
    preview.classList.add('gallery-fullscreen-image');
    previewContainer.appendChild(preview);

    previewNumberTotal.textContent = picturesAtPhotogallery;

    galleryActivePicture = pic;
    galleryContainer.classList.remove('invisible');
    showPicture(galleryActivePicture);
    _attachListeners();
  }

  function hideGallery() {
    previewContainer.removeChild(preview);
    preview = null;

    previewNumberTotal.textContent = '';

    galleryActivePicture = null;
    galleryContainer.classList.add('invisible');

    _removeListeners();
  }

  return {
    saveImages: saveImages,
    showGallery: showGallery
  };
});
