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

  /**@type {HTMLImageElement} current gallery image */
  var preview;

  /**@constructor */
  var Gallery = function(pictures, pictureNumber) {
    var self = this;
    this.galleryPictures = pictures;
    this.picturesAtPhotogallery = this.galleryPictures.length;

    /*================================
    =            LISTENERS           =
    ================================*/

    this._attachListeners = function() {
      controlLeft.addEventListener('click', self.showLeftPicture);
      controlRight.addEventListener('click', self.showRightPicture);

      document.addEventListener('keydown', self.onKeydown);
      controlCross.addEventListener('click', self.onControlCrossClick);
    };

    this._removeListeners = function() {
      controlLeft.removeEventListener('click', self.showLeftPicture);
      controlRight.removeEventListener('click', self.showRightPicture);

      document.removeEventListener('keydown', self.onKeydown);
      controlCross.removeEventListener('click', self.onControlCrossClick);
    };

    this.showLeftPicture = function() {
      if (pictureNumber > 1) {
        pictureNumber = pictureNumber - 2;
        location.hash = '#photo/' + self.galleryPictures[pictureNumber];
      } else {
        pictureNumber = self.picturesAtPhotogallery - 1;
      }
      self.hideGallery();
      location.hash = '#photo/' + self.galleryPictures[pictureNumber];
    };

    this.showRightPicture = function() {
      if (pictureNumber > self.picturesAtPhotogallery - 1) {
        pictureNumber = 0;
      }
      self.hideGallery();
      location.hash = '#photo/' + self.galleryPictures[pictureNumber];
    };

    this.onControlCrossClick = function() {
      location.hash = '';
    };

    this.onKeydown = function(evt) {
      if (evt.keyCode === KEYCODE_ESCAPE) {
        location.hash = '';
      }
    };

    window.addEventListener('hashchange', function() {
      if (location.hash.match(/#photo\/(\S+)/)) {
        var str = location.hash;
        var matchesArray = str.match(/#photo\/(\S+)/);
        pictureNumber = self.getPictureNumber();
        self.showGallery(matchesArray[1], pictureNumber);
      } else {
        self.hideGallery();
      }
    });
    /*=====  End of LISTENERS ======*/

    this.showPicture = function(pic, index) {
      preview.src = pic;
      previewNumberCurrent.textContent = index;
    };

    this.showGallery = function(pic, index) {
      // adding a preview
      preview = new Image();
      preview.classList.add('gallery-fullscreen-image');
      previewContainer.appendChild(preview);

      previewNumberTotal.textContent = this.picturesAtPhotogallery;

      this.galleryActivePicture = pic;
      this.galleryActivePictureIndex = index;
      galleryContainer.classList.remove('invisible');
      self.showPicture(this.galleryActivePicture, this.galleryActivePictureIndex);
      self._attachListeners();
    };
//Hiding gallery
    this.hideGallery = function() {
      previewContainer.removeChild(preview);
      preview = null;

      previewNumberTotal.textContent = '';

      this.galleryActivePicture = null;
      this.galleryActivePictureIndex = null;
      galleryContainer.classList.add('invisible');

      self._removeListeners();
    };
//Getting current picture number from hash
    this.getPictureNumber = function() {
      this.arrayFromHash = location.hash.split('');
      this.pictureNumber = parseInt(this.arrayFromHash.slice(-5, -4), 10);
      return this.pictureNumber;
    };
  };

  return Gallery;

});
