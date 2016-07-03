'use strict';
require(['./game', './reviews', './form', './gallery'], function(gameModule, reviewsModule, contactFormModule, gallery) {
  gameModule();
  reviewsModule();
  contactFormModule();

  var collectionOfLinks = document.querySelectorAll('.photogallery a');

  var arrayOfLinks = Array.prototype.slice.call(collectionOfLinks);

  var arrayOfImageSrc = arrayOfLinks.map(function(link) {
    var img = link.children[0];
    return img.src;
  });

  gallery.saveImages(arrayOfImageSrc);

  arrayOfLinks.forEach(function(item, i) {
    item.addEventListener('click', function(ev) {
      ev.preventDefault();
      gallery.showGallery(i);
    });
  });
});
