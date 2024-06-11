
export function resultDateFormat(date: Date) {

/**
 * @date
 * SaveList 에서는 타입이 Date로 처리된다. 클라이언트단에서 직접 날짜를 생성,반환하기 때문
 * 
 * 
 * 반면에 
 * Winner , LottoList 컴포넌트에서는 type이 string 처리된다.
 * API response Data를 JSON으로 변환 과정에서 string 처리된다.
 * JSON 사양에는 Date 타입이 존재하지 않기 때문에 날짜를 직렬화하면 표준화된 ISO 8601 형태의 문자열로 변환된다.
 * 
 * 따라서 return 변수명을 컴포넌트의 사용처명으로 구분을 하던지
 * 주석으로 사용처 코멘트를 붙히던지
 * 구분이 필요함.
 * 
 * 중복된 코드도 거슬림... 수정 필요
 */
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
      .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
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
