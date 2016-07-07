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
  var Gallery = function(pictures) {
    var self = this;

    this.galleryData = {
      galleryPictures: pictures,
      galleryActivePicture: 0
    };

    this.picturesAtPhotogallery = this.galleryData.galleryPictures.length;

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
      if(self.galleryData.galleryActivePicture > 0) {
        self.galleryData.galleryActivePicture--;
      } else {
        self.galleryData.galleryActivePicture = self.picturesAtPhotogallery - 1;
      }
      self.showPicture(self.galleryData.galleryActivePicture);
    };

    this.showRightPicture = function() {

      if(self.galleryData.galleryActivePicture < self.picturesAtPhotogallery - 1) {
        self.galleryData.galleryActivePicture++;
      } else {
        self.galleryData.galleryActivePicture = 0;
      }

      self.showPicture(self.galleryData.galleryActivePicture);
    };

    this.onControlCrossClick = function() {
      galleryContainer.classList.add('invisible');
      self.hideGallery();
    };

    this.onKeydown = function(evt) {
      if (evt.keyCode === KEYCODE_ESCAPE) {
        galleryContainer.classList.add('invisible');
        self.hideGallery();
      }
    };
    /*=====  End of LISTENERS ======*/

    this.showPicture = function(pic) {
      preview.src = this.galleryData.galleryPictures[pic];
      previewNumberCurrent.textContent = pic + 1;
    };

    this.showGallery = function(pic) {
      // adding a preview
      preview = new Image();
      preview.classList.add('gallery-fullscreen-image');
      previewContainer.appendChild(preview);

      previewNumberTotal.textContent = this.picturesAtPhotogallery;

      this.galleryData.galleryActivePicture = pic;
      galleryContainer.classList.remove('invisible');
      self.showPicture(this.galleryData.galleryActivePicture);
      self._attachListeners();
    };

    this.hideGallery = function() {
      previewContainer.removeChild(preview);
      preview = null;

      previewNumberTotal.textContent = '';

      this.galleryData.galleryActivePicture = null;
      galleryContainer.classList.add('invisible');

      self._removeListeners();
    };
  };

  return Gallery;

});
