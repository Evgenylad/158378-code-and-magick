'use strict';
require(['./game', './reviews', './form', './gallery'], function(gameModule, reviewsModule, contactFormModule, gallery) {
  var arrayOfLinks = document.querySelectorAll('.photogallery-image');
  var collectionOfImages = document.getElementsByTagName('img');
  var arrayOfImages = Array.prototype.slice.call(collectionOfImages);
  var arrayOfImageSrc = arrayOfImages.map(function(img) {
    return img.src;
  });

  gallery.saveImages(arrayOfImageSrc);

  gameModule();
  reviewsModule();
  contactFormModule();
  arrayOfLinks.forEach(function(item, i) {
    item.addEventListener('click', function() {
      gallery.showGallery(i);
    });
  });
});
