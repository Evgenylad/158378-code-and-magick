'use strict';
require(['./game', './reviews', './form', './gallery'], function(gameModule, reviewsModule, contactFormModule, Gallery) {
  gameModule();
  reviewsModule();
  contactFormModule();

  var collectionOfLinks = document.querySelectorAll('.photogallery a');

  var arrayOfLinks = Array.prototype.slice.call(collectionOfLinks);

  var arrayOfImageSrc = arrayOfLinks.map(function(link) {
    var img = link.children[0];
    return img.src;
  });
  var newGallery = new Gallery(arrayOfImageSrc);
  newGallery.saveImages(arrayOfImageSrc);

  arrayOfLinks.forEach(function(item, i) {
    item.addEventListener('click', function(ev) {
      ev.preventDefault();
      newGallery.showGallery(i);
    });
  });
});
