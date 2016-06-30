'use strict';
require(['./game', './reviews', './form'], function(gameModule, reviewsModule, contactFormModule) {
  gameModule();
  reviewsModule();
  contactFormModule();
});
