export function getCurrentTime() {
    const currentDate = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Chicago'
    };
    const formattedTime = currentDate.toLocaleString('en-US', options);
    return formattedTime + ' CST';
}
  

export function convertToTime(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Chicago'
    };
    const formattedTime = date.toLocaleString('en-US', options);
    return formattedTime;
  }