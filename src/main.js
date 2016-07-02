'use strict';
require(['./game', './reviews', './form', './utils/arrayOfImages', './gallery'], function(gameModule, reviewsModule, contactFormModule, arrayOfImagesModule, galleryModule) {
  gameModule();
  reviewsModule();
  contactFormModule();
  arrayOfImagesModule();
  galleryModule();
});
