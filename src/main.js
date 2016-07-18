'use strict';
require(['./game', './reviews', './form', './Gallery'], function(gameModule, reviewsModule, contactFormModule, Gallery) {
  gameModule();
  reviewsModule();
  contactFormModule();

  var collectionOfLinks = document.querySelectorAll('.photogallery a');

  var arrayOfLinks = Array.prototype.slice.call(collectionOfLinks);

  var arrayOfImageSrc = arrayOfLinks.map(function(link) {
    var img = link.children[0];
    return img.getAttribute('src');
  });

  var newGallery = new Gallery(arrayOfImageSrc);

  arrayOfLinks.forEach(function(item) {
    item.addEventListener('click', function(evt) {
      evt.preventDefault();
      var imageSrc = evt.target.getAttribute('src');
      location.hash = '#photo/' + imageSrc;
    });
  });

});
