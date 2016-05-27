function getMessage(a,b) {
  if (typeof a === "boolean") {
    console.log('Я попал в ' + b);
  }

  else if (Object.prototype.toString.call(a) == '[object Array]') {
    var total = a.reduce(function(sum, current) {
      return sum + current;
      });
      console.log('Я прошел ' + total + ' шагов');
  }

  else if (typeof a === "number") {
    console.log('Я прыгнул на ' + a*100 + ' сантиметров');
  }

  else {
    console.log('Я никуда не попал');
  }

};
