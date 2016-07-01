'use strict';
define(function() {
  function galleryModule() {
    var galleryContainer = document.querySelector('.overlay-gallery');
    var previewContainer = galleryContainer.querySelector('.overlay-gallery-preview');
    var photogallery = document.querySelector('.photogallery');
    var galleryItem;
    var thumbnails;
    var collectionOfImages = photogallery.getElementsByTagName('img');
    var arrayOfImages = Array.prototype.slice.call(collectionOfImages);
    var arrayOfImageSrc = arrayOfImages.map(function(img) {
      return img.src;
    });

    /**@type {number}*/
    var galleryActivePicture = 0;

    /**@type {number} pic*/
    var setGalleryActivePictures = function(pic) {
      thumbnails = previewContainer.querySelectorAll('.gallery-thumbnails-image');
      thumbnails[pic].classList.add('active');
      previewContainer.querySelector('.active').style.border = '4px solid #ffffff';
      galleryItem.src = thumbnails[pic].src;
      console.log(previewContainer.querySelector('.active'));
    };

    /**@param {Array.<string>}*/
    var galleryPictures = [];

    /**@param {Array.<string>} pictures*/
    var showGallery = function(pictures) {
      galleryPictures = pictures;
      galleryPictures.forEach(function(pic) {
        var preview = new Image();
        preview.classList.add('gallery-thumbnails-image');
        previewContainer.appendChild(preview);
        preview.src = pic;
        preview.width = '100';
        preview.height = '100';
      });
      galleryActivePicture = 0;
      setGalleryActivePictures(galleryActivePicture);
      galleryContainer.classList.remove('invisible');
    };

    var hideGallery = function() {
      galleryContainer.classList.add('invisible');
    };

    arrayOfImages.forEach(function(item) {
      item.classList.add('gallery-item');
      galleryItem = item;
      item.addEventListener('click', function() {
        showGallery(arrayOfImageSrc);
      });
    });

  }
  return galleryModule;
});
