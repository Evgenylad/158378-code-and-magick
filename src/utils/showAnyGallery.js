'use strict';
define(function() {
  function showAnyGalleryModule(arrayOfSomeImages, showSomeGallery) {
    arrayOfSomeImages.forEach(function(item, i) {
      item.addEventListener('click', function() {
        showSomeGallery(i);
      });
    });
  }
  return showAnyGalleryModule;
});
