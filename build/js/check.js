function getMessage(a,b) {
  if (typeof a === "boolean") {
    console.log('Я попал в ' + b);
  }

  else if (Array.isArray(a)) {
    var total = a.reduce(function(sum, current) {
      return sum + current;
      });
      console.log('Я прошел ' + total + ' шагов');
  }
  else if (Array.isArray(a) && Array.isArray(b)) {
    var ab = a.map(function (num, i) {
      return num*b[i];
    });
    var lenght = ab.reduce(function(sum, current) {
      return sum + current;
      });
      console.log('Я прошел ' + lenght + ' метров');
  }

  else if (typeof a === "number") {
    console.log('Я прыгнул на ' + a*100 + ' сантиметров');
  }

  else {
    console.log('Я никуда не попал');
  }

};
