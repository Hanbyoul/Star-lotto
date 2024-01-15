export function resultDateFormat(date: Date) {
  if (typeof date === "string") {
    let baseDate = new Date(date);
    let year = baseDate.getFullYear();
    let month = baseDate.getMonth() + 1;
    let day = baseDate.getDate();
    let hour = baseDate.getHours();
    let minute = baseDate.getMinutes();
    let second = baseDate.getSeconds();

    let formattedDate = `${year}.${month.toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}. ${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;

    return formattedDate;
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayOfWeek = date.getDay();

  let daysInKorean = ["일", "월", "화", "수", "목", "금", "토"];

  let formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}(${daysInKorean[dayOfWeek]})`;

  return formattedDate;
}
