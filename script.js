const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const daysCheckboxes = document.querySelectorAll('.days-range__checkbox');
const getResultBtn = document.querySelector('.days-range__get-result-btn');
const resultField = document.querySelector('.days-range__result-range');

document.addEventListener('DOMContentLoaded', () => {
  getResultBtn.addEventListener('click', getShorthandDaysOfWeek);
});

function getShorthandDaysOfWeek() {
  const daysString = [...daysCheckboxes].map((day) => (day.checked ? day.nextElementSibling.textContent : ''));
  const checkedDaysString = daysString.filter((day) => day)

  let startIdx = -1;
  let endIdx = -1;
  const ranges = [];

  checkedDaysString.forEach((day, idx) => {
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

  resultField.innerText = result.join(', ');
}
