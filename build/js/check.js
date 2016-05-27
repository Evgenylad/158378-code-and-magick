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
        return('Я прыгнул на ' + a*100 + ' сантиметров');
      break;

    default:
    if (Array.isArray(a) && !Array.isArray(b)) {
      var total = a.reduce(function(sum, current) {
        return sum + current;
       });
       return('Я прошел ' + total + ' шагов');
      }
    else {
      var ab = a.map(function (num, i) {
        return num*b[i];
      });
      var length = ab.reduce(function(sum, current) {
        return sum + current;
      });
        return('Я прошел ' + length + ' метров');
    }
  }
}
