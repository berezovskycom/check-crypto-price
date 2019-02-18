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

// function getMonth(number) {
//   let month;

//   switch(number) {
//     case '01':
//       month = 'Jan';
//       break;
//     case '02':
//       month = 'Feb';
//       break;
//     case '03':
//       month = 'Mar';
//       break;
//     case '04':
//       month = 'Apr';
//       break;
//     case '05':
//       month = 'May';
//       break;
//     case '06':
//       month = 'Jun';
//       break;
//     case '07':
//       month = 'Jul';
//       break;
//     case '08':
//       month = 'Aug';
//       break;
//     case '09':
//       month = 'Sep';
//       break;
//     case '10':
//       month = 'Oct';
//       break;
//     case '11':
//       month = 'Nov';
//       break;
//     case '12':
//       month = 'Dec';
//       break;
//     defaut:
//       return number;
//   }
//   return month;
// }

export function parseCreatedAt(data) {
  var splitted = data.split('-');
  var month = getMonth(splitted[1]);
  return [month, splitted[2], splitted[0]].join(' ');
}
