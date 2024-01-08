export default function banPeriod(currentDay: Date) {
  const dayOfWeek = currentDay.getDay(); // 일요일 - 0, 월요일 - 1, ..., 토요일 - 6
  const hour = currentDay.getHours(); // 0 - 23

  // 토요일 20시부터 일요일 00시까지 로직을 실행하지 않음
  if (dayOfWeek === 6 && hour >= 20) {
    console.log("현재 시간에는 이 기능을 사용할 수 없습니다.");
    return false;
  }
  return true;
}
