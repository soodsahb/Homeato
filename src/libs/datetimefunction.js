function padWithZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function convertToIST(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);
  const istOptions = { timeZone: "Asia/Kolkata", hour12: false };
  const istDateString = utcDate.toLocaleString("en-US", istOptions);

  const [datePart, timePart] = istDateString.split(", ");
  const [month, day, year] = datePart.split("/");
  const [time, period] = timePart.split(" ");

  const [hours, minutes, seconds] = time.split(":").map(Number);

  const convertedHours = period === "PM" ? hours + 12 : hours;
  const formattedHours = padWithZero(convertedHours);

  const formattedMinutes = padWithZero(minutes);
  const formattedSeconds = padWithZero(seconds);

  return `${month}/${day}/${year} ${formattedHours}:${formattedMinutes}`;
}

export function dbTime(str) {
  const istTime = convertToIST(str);
  console.log(istTime);

  return istTime;
}
