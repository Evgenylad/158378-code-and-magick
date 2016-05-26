function getMessage(a:*, b:*=):string {
  if (a = boolean) {
    return('Я попал в ' + b);
  }
  else {
    return('Я никуда не попал');
  }
};
