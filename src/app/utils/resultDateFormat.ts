export function resultDateFormat(date: Date) {
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
