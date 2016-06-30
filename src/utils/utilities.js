'use strict';
define(function() {
  return {
    checkField: function(input) {
      var inputLength = input.value.length;
      if (inputLength < 1 && input.required) {
        return false;
      } else {
        return true;
      }
    }
  };
});
