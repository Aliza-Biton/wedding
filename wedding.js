const startDate = new Date('2025-05-11'); // כ"ב ניסן
const endDate = new Date('2025-08-19');   // כ"ה אב
const emojis = ['😴', '😑', '😐', '🤨', '😏', '🙂', '😊', '😇', '🤗', '😝', '😃', '😄', '😁', '🤩', '🔥'];
const today = new Date();
let confettiTriggered = false;

let currentPlaceholder = null; // משתנה גלובלי

const hebrewDates = [
  'י"ג אייר', 'י"ד אייר', 'ט"ו אייר', 'ט"ז אייר', 'י"ז אייר', 'י"ח אייר', 'י"ט אייר', 'כ\' אייר',
  'כ"א אייר', 'כ"ב אייר', 'כ"ג אייר', 'כ"ד אייר', 'כ"ה אייר', 'כ"ו אייר', 'כ"ז אייר', 'כ"ח אייר', 'כ"ט אייר',
  'א\' סיון', 'ב\' סיון', 'ג\' סיון', 'ד\' סיון', 'ה\' סיון', 'ו\' סיון', 'ז\' סיון', 'ח\' סיון', 'ט\' סיון', 'י\' סיון',
  'י"א סיון', 'י"ב סיון', 'י"ג סיון', 'י"ד סיון', 'ט"ו סיון', 'ט"ז סיון', 'י"ז סיון', 'י"ח סיון', 'י"ט סיון', 'כ\' סיון',
  'כ"א סיון', 'כ"ב סיון', 'כ"ג סיון', 'כ"ד סיון', 'כ"ה סיון', 'כ"ו סיון', 'כ"ז סיון', 'כ"ח סיון', 'כ"ט סיון', 'ל\' סיון',
  'א\' תמוז', 'ב\' תמוז', 'ג\' תמוז', 'ד\' תמוז', 'ה\' תמוז', 'ו\' תמוז', 'ז\' תמוז', 'ח\' תמוז', 'ט\' תמוז', 'י\' תמוז',
  'י"א תמוז', 'י"ב תמוז', 'י"ג תמוז', 'י"ד תמוז', 'ט"ו תמוז', 'ט"ז תמוז', 'י"ז תמוז', 'י"ח תמוז', 'י"ט תמוז', 'כ\' תמוז',
  'כ"א תמוז', 'כ"ב תמוז', 'כ"ג תמוז', 'כ"ד תמוז', 'כ"ה תמוז', 'כ"ו תמוז', 'כ"ז תמוז', 'כ"ח תמוז', 'כ"ט תמוז',
  'א\' אב', 'ב\' אב', 'ג\' אב', 'ד\' אב', 'ה\' אב', 'ו\' אב', 'ז\' אב', 'ח\' אב', 'ט\' אב', 'י\' אב',
  'י"א אב', 'י"ב אב', 'י"ג אב', 'י"ד אב', 'ט"ו אב', 'ט"ז אב', 'י"ז אב', 'י"ח אב', 'י"ט אב', 'כ\' אב',
  'כ"א אב', 'כ"ב אב', 'כ"ג אב', 'כ"ד אב', 'כ"ה אב'
];

const totalDays = hebrewDates.length;


function getHebrewDate(i) {
  return hebrewDates[i] || 'תאריך לא מוגדר';
}

function daysRemaining(i) {
  return totalDays - i;
}

for (let d = new Date(startDate), i = 0; d <= endDate; d.setDate(d.getDate() + 1), i++) {
  const isPast = d < today;
  const isToday = d.toDateString() === today.toDateString();
  const isFuture = d > today;

  const box = document.createElement('div');
  box.className = 'day-box';
  if (isToday) box.classList.add('today');
  else if (isPast) box.classList.add('past');
  else box.classList.add('future');

  const inner = document.createElement('div');
  inner.className = 'inner';

  const front = document.createElement('div');
  front.className = 'front';

  const right = document.createElement('div');
  right.className = 'right-half';

  const left = document.createElement('div');
  left.className = 'left-half';

  const hebrewDate = getHebrewDate(i);
  const remainingDays = daysRemaining(i);

  // חצי ימני - תאריך + אימוג'י
  left.innerHTML = `
    <div style="font-size: 1.2em; margin-bottom: 5px;">${hebrewDate}</div>
    <div style="font-size: 2.5em;">${emojis[Math.floor(i / 7) % emojis.length]}</div>
  `;

  // חצי שמאלי - מספר ימים
  right.innerHTML = `
      <div style="font-size: 1.2em; margin-bottom: 13px;">עוד-</div>
    <div class="days-left">${remainingDays - 1}</div>
  `;

  // הוספת מחלקה days-43 אוטומטית ליום עם 43 ימים
  if (remainingDays - 1 === 43) {
    setTimeout(() => {
      console.log('Adding days-43 class');
      // הוספת מחלקה days-43 לימים שנותרו 43
      const daysLeftDiv = right.querySelector('.days-left');
      console.log('Adding days-43 class');
      if (daysLeftDiv) {
        console.log('Adding days-43 class');
        daysLeftDiv.classList.add('days-43')
      };
    }, 0);
  }



  front.appendChild(right);
  front.appendChild(left);

  const back = document.createElement('div');
  back.className = 'back';
  back.innerText = remainingDays - 1;

  inner.appendChild(front);
  inner.appendChild(back);
  box.appendChild(inner);



  box.addEventListener('click', () => {
    if (!isPast && !isToday) {
      alert('סבלנות... היום הזה עוד לא הגיע!');
      return
    }

    const openBox = document.querySelector('.day-box.open');
    if (openBox && openBox !== box) {
      openBox.classList.remove('open');
    }

    box.classList.toggle('open');
    if (isPast || isToday) {
      const wasActive = box.classList.contains('active');

      // סגור את כל שאר הקופסאות
      document.querySelectorAll('.day-box.active').forEach(el => {
        el.classList.remove('active', 'flip', 'open');
      });

      if (!wasActive) {
        // הכנס את המשפט לגב הריבוע
        back.innerHTML = `
          <div style="padding: 10px;">
              <button id="close-btn" style="position: absolute; top: 5px; left: 5px; background: transparent; border: none; font-size: 1.2em; cursor: pointer;">✖</button>
            <h3 style="margin-bottom: 0.5em;">${getHebrewDate(i)}</h3>
            <p style="font-size: 1em;">${messages[i] || "אין משפט מוגדר"}</p>
          </div>
        `;
        setTimeout(() => {
          const closeBtn = box.querySelector('#close-btn');
          closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation(); // כדי למנוע פתיחה/סגירה חוזרת
            box.classList.remove('active', 'flip', 'open');
            if (currentPlaceholder) {
              currentPlaceholder.remove();
              currentPlaceholder = null;
            }
          });
        }, 0);
        if (currentPlaceholder) {
          currentPlaceholder.remove();
          currentPlaceholder = null;
        }
        const placeholder = document.createElement('div');
        placeholder.className = 'day-boxplaceholder';
        placeholder.style.width = `${box.offsetWidth}px`;
        placeholder.style.height = `${box.offsetHeight}px`;
        currentPlaceholder = placeholder;

        box.parentNode.insertBefore(placeholder, box);


        box.classList.add('flip', 'active');
        confetti({
          particleCount: 380,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }
  });
  calendar.appendChild(box);
}
