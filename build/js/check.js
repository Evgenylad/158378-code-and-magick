function getMessage(a,b) {

  if (!Array.isArray(a)) {
    switch (typeof a) {
      case "boolean":
        console.log('Я попал в ' + b);
        break;

      case "number":
        console.log('Я прыгнул на ' + a*100 + ' сантиметров');
        break;

      default:
        console.log('Я никуда не попал');
      }
    }

  else if (Array.isArray(a) && !Array.isArray(b)) {
    var total = a.reduce(function(sum, current) {
      return sum + current;
     });
    console.log('Я прошел ' + total + ' шагов');
  }

  else {
    var ab = a.map(function (num, i) {
      return num*b[i];
    });
    var lenght = ab.reduce(function(sum, current) {
      return sum + current;
    });
    console.log('Я прошел ' + lenght + ' метров');
  }
}
