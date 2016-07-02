'use strict';
define(function() {
  function galleryModule() {
    /** @constant {number} */
    var PICTURES_AT_PHOTOGALLERY = 6;

    var galleryContainer = document.querySelector('.overlay-gallery');
    var previewContainer = galleryContainer.querySelector('.overlay-gallery-preview');
    var photogallery = document.querySelector('.photogallery');
    var collectionOfImages = photogallery.getElementsByTagName('img');
    var arrayOfImages = Array.prototype.slice.call(collectionOfImages);
    var arrayOfImageSrc = arrayOfImages.map(function(img) {
      return img.src;
    });

    var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
    var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');

    /**@type {number}*/
    var galleryActivePicture = 0;

    /**@param {Array.<string>}*/
    var galleryPictures = [];

    /**@param {Array.<string>} pictures*/
    var loadImages = function(pictures) {
      galleryPictures = pictures;
      return galleryPictures;
    };

    /**@type {number} pic*/
    var showGallery = function(pic) {
      galleryActivePicture = pic;
      galleryContainer.classList.remove('invisible');
      showPicture(loadImages(arrayOfImageSrc), galleryActivePicture);
      if(_galleryMoveLeft()) {
        showPicture(loadImages(arrayOfImageSrc), galleryActivePicture);
      }
      if(_galleryMoveRight()) {
        showPicture(loadImages(arrayOfImageSrc), galleryActivePicture);
      }
    };

    var hideGallery = function() {
      galleryContainer.classList.add('invisible');
    };

    var _galleryMoveLeft = function() {
      controlLeft.addEventListener('click', function() {
        if(galleryActivePicture >= 0) {
          console.log(galleryActivePicture);
          galleryActivePicture--;
        }
        return galleryActivePicture;
      });
    };

    var _galleryMoveRight = function() {
      controlRight.addEventListener('click', function() {
        if(galleryActivePicture <= PICTURES_AT_PHOTOGALLERY) {
          console.log(galleryActivePicture);
          galleryActivePicture++;
        }
        return galleryActivePicture;
      });
    };

    var showPicture = function(pictures, pic) {
      console.log(pictures);
      galleryPictures = pictures;
      var preview = new Image();
      preview.classList.add('gallery-fullscreen-image');
      previewContainer.appendChild(preview);
      preview.src = galleryPictures[pic];
    };

    arrayOfImages.forEach(function(item) {
      item.addEventListener('click', function() {
        showGallery(galleryActivePicture);
      });
    });

  }
  return galleryModule;
});
