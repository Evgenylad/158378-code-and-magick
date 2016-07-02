'use strict';
define(['./utils/arrayOfImages', './utils/showAnyGallery'], function(arrayOfImagesModule, showAnyGalleryModule) {
  function galleryModule() {

    /** @constant {number} */
    var KEYCODE_ESCAPE = 27;

    var arrayOfLinks = document.querySelectorAll('.photogallery-image');

    var galleryContainer = document.querySelector('.overlay-gallery');
    var previewContainer = galleryContainer.querySelector('.overlay-gallery-preview');

    var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
    var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');
    var controlCross = galleryContainer.querySelector('.overlay-gallery-close');

    /** @type {number} */
    var picturesAtPhotogallery = 6;

    /**@type {number}*/
    var galleryActivePicture = 0;

    /**@type {Array.<string>}*/
    var galleryPictures = [];

    /**@param {Array.<string>} pictures
     * @return {Array.<string>}
     * */
    var saveImages = function(pictures) {
      galleryPictures = pictures;
      return galleryPictures;
    };

    var _attachListeners = function() {
      _galleryMoveLeft();
      _galleryMoveRight();
      _galleryHide();
    };

    var _galleryMoveLeft = function() {
      controlLeft.addEventListener('click', function() {
        if(galleryActivePicture > 0) {
          galleryActivePicture--;
          showPicture(saveImages(arrayOfImagesModule().arrayOfImageSrc), galleryActivePicture);
        }
        return galleryActivePicture;
      });
    };

    var _galleryMoveRight = function() {
      controlRight.addEventListener('click', function() {
        if(galleryActivePicture < picturesAtPhotogallery) {
          galleryActivePicture++;
          showPicture(saveImages(arrayOfImagesModule().arrayOfImageSrc), galleryActivePicture);
        }
        return galleryActivePicture;
      });
    };

    var _galleryHide = function() {
      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === KEYCODE_ESCAPE) {
          galleryContainer.classList.add('invisible');
        }
      });

      controlCross.addEventListener('click', function() {
        galleryContainer.classList.add('invisible');
      });
    };


    var showPicture = function(pictures, pic) {
      previewContainer.innerHTML = '';
      galleryPictures = pictures;
      var preview = new Image();
      preview.classList.add('gallery-fullscreen-image');
      previewContainer.appendChild(preview);
      preview.src = galleryPictures[pic];
    };

    showAnyGalleryModule(arrayOfLinks, function showGallery(pic) {
      galleryActivePicture = pic;
      galleryContainer.classList.remove('invisible');
      showPicture(saveImages(arrayOfImagesModule().arrayOfImageSrc), galleryActivePicture);
      _attachListeners();
    });

  }
  return galleryModule;
});
