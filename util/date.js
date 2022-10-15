export function getFormattedDate(date) {
  return date ? date.toISOString().slice(0, 10) : null;
}

export function isRecent(date) {
  const date1 = new Date();
  const date2 = new Date(date);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays <= 7 && date2 <= date1;
}
// const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
// const firstDate = new Date();
// const secondDate = new Date(
//   date.getFullYear(),
//   date.getMonth(),
//   date.getDate(),
// );

// const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
// return diffDays <= 7 && secondDate <= firstDate;
