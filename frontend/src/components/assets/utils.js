// FILE FOR UTILITY FUNCTIONS

export function getNumberOfDays(end) {
  const date1 = new Date (new Date().toLocaleDateString('eng-ca'));
  const date2 = new Date(end);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  console.log(diffInDays);
  return diffInDays;
}
