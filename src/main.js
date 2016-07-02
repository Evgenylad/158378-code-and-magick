'use strict';
require(['./game', './reviews', './form', './gallery'], function(gameModule, reviewsModule, contactFormModule, galleryModule) {
  gameModule();
  reviewsModule();
  contactFormModule();
  galleryModule();
});
