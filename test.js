function getShorthandDaysOfWeek(days) {
  const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const selectedDays = days.split(',').map(day => day.trim());

  let startIdx = -1;
  let endIdx = -1;
  const ranges = [];

  selectedDays.forEach((day, idx) => {
    const dayIdx = weekdays.indexOf(day);
    if (dayIdx > -1) {
      if (startIdx === -1) {
        startIdx = dayIdx;
        endIdx = dayIdx;
      } else if (dayIdx === endIdx + 1) {
        endIdx = dayIdx;
      } else {
        ranges.push({ startIdx, endIdx });
        startIdx = dayIdx;
        endIdx = dayIdx;
      }
    }
  });

  if (startIdx !== -1) {
    ranges.push({ startIdx, endIdx });
  }

  const result = [];

  ranges.forEach(range => {
    if (range.startIdx === range.endIdx) {
      result.push(weekdays[range.startIdx]);
    } else if (range.endIdx - range.startIdx === range.endIdx % 7 - range.startIdx) {
      result.push(`${weekdays[range.startIdx]} - ${weekdays[range.endIdx]}`);
    } else {
      const days = [];
      for (let i = range.startIdx; i <= range.endIdx; i++) {
        days.push(weekdays[i]);
      }
      result.push(days.join(', '));
    }
  });

  return result.join(', ');
}
