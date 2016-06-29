'use strict';
define(function() {
  function _checkField(input) {
    var inputLength = input.value.length;
    if (inputLength < 1 && input.required) {
      return false;
    } else {
      return true;
    }
  }
  return _checkField;
});
