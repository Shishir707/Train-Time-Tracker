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

function showRoster() {
  const roaster = [
    [709, "Monday"], [740, "Monday"], ["781/782", "Tuesday"], ["799/800", "Sunday"],
    [2, null], [3, null], [722, "Sunday"], [787, "Tuesday"], [749, null],
    [738, null], ["816/815", "Wednesday"], ["707/708", "Monday"], [717, "Tuesday"],
    [718, "Thursday"], [4, null], ["1+RT", null], [739, "Wednesday"], [710, "Monday"],
    [773, "Friday"], [774, "Friday"], ["737/750", "Wednesday"], [704, null],
    [701, "Monday"], [709, "Monday"], [740, "Monday"]
  ];

  const today = new Date();
  const todayDate = today.toLocaleDateString('en-GB');
  const tday = today.toLocaleString('en-us', { weekday: 'long' });

  const todaysDuty = document.getElementById("todaysDuty").value;
  let startIndex = -1;

  for (let idx = 0; idx < roaster.length; idx++) {
    if (String(roaster[idx][0]) === todaysDuty) {
      startIndex = idx;
      break;
    }
  }

  if (startIndex === -1) {
    alert("Invalid! This is only for Dhaka Shade.");
    return;
  }

  let [trainNum, offDay] = roaster[startIndex];

  function getNextTrainOverride(trainNum, dayName, isOffday) {
    const trainStr = String(trainNum);
    if (trainStr === "722" && isOffday) return "709";
    if (trainStr === "709" && isOffday) return "749";
    if (trainStr === "707/708" && isOffday) return "773";
    if (trainStr === "787" && ["Monday", "Tuesday"].includes(dayName)) return "704";
    if (trainStr === "737" && ["Tuesday", "Wednesday", "Thursday"].includes(dayName)) return "4";
    if (trainStr === "1" && ["Tuesday", "Wednesday"].includes(dayName)) return "781/782";
    if (trainStr === "739" && isOffday) return "781/782";
    if (trainStr === "773" && isOffday) return "737/750";
    if (trainStr === "710" && isOffday) return "710";
    if (trainStr === "739" && ["Sunday", "Monday"].includes(dayName)) return "718";
    if (trainStr === "717" && dayName === "Wednesday") return "710";
    if (trainStr === "704" && dayName === "Sunday") return "787";
    return null;
  }

  const isTodayOffday = (offDay === tday);
  const overrideTrain = getNextTrainOverride(trainNum, tday, isTodayOffday);

  if (overrideTrain) {
    for (let idx = 0; idx < roaster.length; idx++) {
      if (String(roaster[idx][0]) === overrideTrain) {
        startIndex = idx + 1;
        break;
      }
    }
  } else {
    startIndex += 1;
  }

  const parent = document.getElementById("display");
  parent.textContent = "";

  let output = `
    <div class="start">
      <h2>Dear LM/ALM,</h2>
      <p>Your Next Trip:</p>
      <p> Date | Day | Tr. No | Offday Info</p>
      <p>> ${todayDate} | ${tday} | ${trainNum} | ${offDay || 'No Offday'}</p>
  `;

  if (trainNum === 722 && tday === "Monday") {
    output += "<p>Note: Next Day Status = Spare</p>";
  }

  output += "<p>Your Next 1 Month Trip is here:</p>";
  output += `
            <div class="dayBox">
            <strong>  >Date        |     Day        |    Train No.      |       Status</strong>
            </div>`;

  for (let i = 0; i < 30; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i + 1);
    const dateStr = day.toLocaleDateString('en-GB');
    const dayName = day.toLocaleString('en-us', { weekday: 'long' });

    const index = (startIndex + i) % roaster.length;
    const [nextTrain, nextOffday] = roaster[index];

    const status = (nextOffday === dayName) ? "Off Day" : "On-duty";

    output += `
      <div class="dayBox">
        <strong>  ${dateStr}        |     ${dayName}        |    ${nextTrain}      |       ${status}</strong>
      </div>
    `;
  }

  output += "</div>";
  parent.innerHTML = output;
}




