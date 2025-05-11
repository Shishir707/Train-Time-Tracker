const currentHour = new Date().getHours();
const greetingElement = document.getElementById('greeting');
let greetingText = '';

if (currentHour < 12) {
  greetingText = 'Good Morning! LM/ALM';
} else if (currentHour >= 12 && currentHour < 16) {
  greetingText = 'Good Noon! LM/ALM';
} else if (currentHour >= 16 && currentHour < 20) {
  greetingText = 'Good Afternoon! LM/ALM';
} else {
  greetingText = 'Good Night! LM/ALM';
}
greetingElement.innerHTML = `<h2>${greetingText}</h2>`;
setTimeout(() => {
  greetingElement.innerHTML = '';}, 5000);

