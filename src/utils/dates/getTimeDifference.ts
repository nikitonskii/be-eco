export function getTimeDifference(timestamp1: Date, timestamp2: Date): string {
  // Convert the timestamps to milliseconds
  if (!timestamp1 || !timestamp2) {
    throw new TypeError('Parameter is not a Date');
  }

  const date1 = new Date(timestamp1).getTime();
  const date2 = new Date(timestamp2).getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(date1 - date2);

  // Calculate minutes and seconds
  const minutes = Math.floor(timeDifference / 60000);
  const seconds = ((timeDifference % 60000) / 1000).toFixed(0);
  const milliseconds = timeDifference % 1000;

  // Format the result as "00minutes:00seconds"
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
    .toString()
    .padStart(3, '0')} ms`;

  return formattedTime;
}
