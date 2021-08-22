const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const toggle = document.querySelector('.toggle');
 
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 
// set default dark mode, based on the browser's preferences
if (
  window.matchMedia('(prefers-color-scheme)').media !== 'not all' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.documentElement.classList.add('dark');
  setToggleButtonText();
}
 
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  setToggleButtonText();
});
 
function setToggleButtonText() {
  if (document.documentElement.classList.contains('dark')) {
    toggle.innerText = 'Light mode';
  } else {
    toggle.innerText = 'Dark mode';
  }
}
 
// Clock
setTime();
setInterval(() => setTime(), 1000);
 
function setTime() {
  const time = new Date();
 
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
 
  const day = time.getDate();
  const month = time.getMonth();
  const dayOfTheWeek = time.getDay();
 
  setNeedleDegree(hourElement, (hours % 12) * 60 * 60 + minutes * 60 + seconds, 12 * 60 * 60, 0);
  setNeedleDegree(minuteElement, minutes * 60 + seconds, 60 * 60, hours);
  setNeedleDegree(secondElement, seconds, 60, hours * 60 + minutes);
 
  timeElement.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  dateElement.innerHTML = `${days[dayOfTheWeek]}, ${months[month]} <span class="circle">${day}</span>`;
}
 
function setNeedleDegree(needle, value, maxValue, spin) {
  const degree = spin * 360 + (value * 360) / maxValue;
 
  needle.style.transform = `translate(-50%, -100%) rotate(${degree}deg)`;
}
 