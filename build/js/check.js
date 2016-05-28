function getMessage(a,b) {
  switch (typeof a) {
    case "boolean":
      if (a) {
        return('Я попал в ' + b);
      }
      else {
        return('Я никуда не попал');
      }
      break;

    case "number":
      if (a) {
        return('Я прыгнул на ' + a*100 + ' сантиметров');
      }
      else {
        break;
      }
    case "string":
      break;

    default:
    if (Array.isArray(a) && !Array.isArray(b)) {
      var total = a.reduce(function(sum, current) {
        return sum + current;
       });
       return('Я прошел ' + total + ' шагов');
      }
    else if (Array.isArray(a) && Array.isArray(b)){
      var ab = a.map(function (num, i) {
        return num*b[i];
      });
      var length = ab.reduce(function(sum, current) {
        return sum + current;
      });
        return('Я прошел ' + length + ' метров');
    }
    else {
      break;
    }
  }
}
