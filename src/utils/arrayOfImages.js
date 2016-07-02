'use strict';
define(function() {
  function arrayOfImagesModule() {
    var collectionOfImages = document.getElementsByTagName('img');
    var arrayOfImages = Array.prototype.slice.call(collectionOfImages);
    var arrayOfImageSrc = arrayOfImages.map(function(img) {
      return img.src;
    });
    return {
      arrayOfImages: arrayOfImages,
      arrayOfImageSrc: arrayOfImageSrc
    };
  }
  return arrayOfImagesModule;
});
