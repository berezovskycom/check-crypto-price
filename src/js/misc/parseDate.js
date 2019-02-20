/* eslint-disable */

function getMonth(number) {
  switch(number) {
    case '01':
      return 'Jan';
      break;
    case '02':
      return 'Feb';
      break;
    case '03':
      return 'Mar';
      break;
    case '04':
      return 'Apr';
      break;
    case '05':
      return 'May';
      break;
    case '06':
      return 'Jun';
      break;
    case '07':
      return 'Jul';
      break;
    case '08':
      return 'Aug';
      break;
    case '09':
      return 'Sep';
      break;
    case '10':
      return 'Oct';
      break;
    case '11':
      return 'Nov';
      break;
    case '12':
      return 'Dec';
      break;
    defaut:
      return number;
  }
}

export function parseCreatedAt(data) {
  var splitted = data.split('-');
  var month = getMonth(splitted[1]);
  return [month, splitted[2], splitted[0]].join(' ');
}

export function parseLastUpdated(da) {
  var date = '2019-02-20T15:02:49.815Z';
  var splitted = date.split('T');
  var time = splitted[1].slice(0,5);
  return parseCreatedAt(splitted[0]) + ' ' + time;
}
