function getMessage(a,b) {
  if (typeof a === "boolean") {
    console.log('Я попал в ' + b);
  }

  else if (typeof a.isArray) {
    for (var i = 0, sum = 0; i < a.length; sum += a[i++]);
    console.log('Я прошел ' + sum + ' шагов');
  }

  else if (typeof a === "number") {
    console.log('Я прыгнул на ' + a*100 + ' сантиметров');
  }

  else {
    console.log('Я никуда не попал');
  }

};
