export default function convertUTCDateToLocalDate(date) {
  // var dateOne = new Date(`${date} UTC`);
  // var newDate = dateOne.toString();
  // var d = new Date(newDate.replace(/-/g, '/'));
  return date;
}

// export default function convertUTCDateToLocalDate(date) {
//     var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();
//     newDate.setHours(hours - offset);
//     return newDate;
// }
