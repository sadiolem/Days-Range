document.addEventListener('DOMContentLoaded', () => {
  const getResultBtn = document.querySelector('.days-range__get-result-btn');

  getResultBtn.addEventListener('click', getCheckedDays);

  function getCheckedDays() {
    const daysCheckboxes = document.querySelectorAll('.days-range__checkbox');
    const daysString = [...daysCheckboxes].map((day) => (day.checked ? day.nextElementSibling.textContent : ''));
    const checkedDays = daysString.filter((day) => day);

    getDaysRange(daysString, checkedDays);
  }

  function getDaysRange(daysString, checkedDays) {
    const result = document.querySelector('.days-range__result-range');

    if (!checkedDays.length) result.textContent = '';

    if (checkedDays.length <= 2) {
      checkedDays.forEach((day, i, arr) => {
        if (arr.indexOf(day) === 1) return;

        if (arr.length === 1) {
          result.textContent = day;
          return;
        }

        result.textContent = `${day}, ${arr[i + 1]}`;
      });
    } else {
      if (result.textContent) result.textContent = '';

      daysString.forEach((day) => {
        if (!day) return;

        if (day === checkedDays[checkedDays.length - 1]) {
          result.textContent += day;
          return;
        }

        result.textContent += `${day}, `;
      });
    }

    let counter = 0;
    let daysRange;

    daysString.forEach((day, i, arr) => {
      if (day) {
        counter += 1;

        if (i > 1 && counter >= 3) {
          if (checkedDays.length === 6 && !arr[3]) {
            const firstRange = `${arr[0]} - ${arr[2]}`;
            const secondRange = `, ${arr[i - (counter - 1)]} - ${day}`;

            result.textContent = firstRange + secondRange;

            return;
          }

          daysRange = arr.slice(i - (counter - 1), i + 1);
          result.textContent = `${arr[i - (counter - 1)]} - ${day}`;
        }
      } else {
        counter = 0;
      }
    });

    if (daysRange) {
      const daysNotInRange = daysString.filter((day) => !daysRange.includes(day));

      daysNotInRange.forEach((day) => {
        if (day) result.textContent += `, ${day}`;
      });
    }
  };
});
