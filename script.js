const dateElement = document.getElementById("datetime");
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = String(now.getDate()).padStart(2, '0');
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const weekday = dayNames[now.getDay()];

  dateElement.textContent = `${day}-${month}-${year} | ${weekday}`;

  const currentHour = now.getHours();
const greetingElement = document.getElementById('greeting');
let greetingText = '';

if (currentHour < 12) {
  greetingText = 'Good Morning! LM/ALM';
} 
else if (currentHour >= 12 && currentHour < 13) {
  greetingText = 'Good Noon! LM/ALM';
} 
else if (currentHour >= 13 && currentHour < 16) {
  greetingText = 'Good Afternoon! LM/ALM';
} 
else if (currentHour >= 16 && currentHour < 20) {
  greetingText = 'Good Evening! LM/ALM';
} 
else {
  greetingText = 'Good Night! LM/ALM';
}

greetingElement.innerHTML=`<h2>${greetingText}</h2>`;
setTimeout(() => {
  greetingElement.innerHTML = '';
}, 5000);


function createRoster() {
  const roaster = [
    [709, "Monday"], [740, "Monday"], ["781/782", "Tuesday"], ["799/800", "Sunday"],
    [2, null], [3, null], [722, "Sunday"], [787, "Tuesday"], [749, null],
    [738, null], ["816", "Wednesday"],["815", "wednesday"], ["707/708", "Monday"], [717, "Tuesday"],
    [718, "Thursday"], [4, null], ["1+RT", null], [739, "Wednesday"], [710, "Monday"],
    [773, "Friday"], [774, "Friday"], ["737/750", "Wednesday"], [704, null],
    [701, "Monday"], [709, "Monday"], [740, "Monday"]
  ];

  const today = new Date();
  const todayDate = today.toLocaleDateString('en-GB');
  const tday = today.toLocaleString('en-us', { weekday: 'long' });

  let todaysDuty = document.getElementById("todaysDuty").value.trim();
  console.log("TodaysDuty input: ", todaysDuty); 


  if (todaysDuty === "707" || todaysDuty === "708") {
    todaysDuty = "707/708";
  } else if (todaysDuty === "781" || todaysDuty === "782") {
    todaysDuty = "781/782";
  } else if (todaysDuty === "799" || todaysDuty === "800") {
    todaysDuty = "799/800";
  } else if (todaysDuty === "737" || todaysDuty === "750") {
    todaysDuty = "737/750";
  }

  let startIndex = -1;

  for (let idx = 0; idx < roaster.length; idx++) {
    if (String(roaster[idx][0]) === todaysDuty) {
      startIndex = idx;
      break;
    }
  }

  if (startIndex === -1) {
    const parent = document.getElementById("display");
    parent.textContent = "";
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Invalid! This is only for Dhaka Shade.";
    parent.appendChild(errorMsg);
    return;
  }

  let [trainNum, offDay] = roaster[startIndex];

  function getNextTrainOverride(trainNum, dayName, isOffday) {
    const trainStr = String(trainNum);
    const trainParts = trainStr.split('/');

    if (trainParts.includes("722") && isOffday) return "709";
    if (trainParts.includes("709") && isOffday) return "749";
    if (trainParts.includes("707") && isOffday) return "773";
    if (trainParts.includes("787") && ["Monday", "Tuesday"].includes(dayName)) return "704";
    if (trainParts.includes("737") && ["Tuesday", "Wednesday", "Thursday"].includes(dayName)) return "4";
    if (trainParts.includes("1") && ["Tuesday", "Wednesday"].includes(dayName)) return "781/782";
    if (trainParts.includes("739") && isOffday) return "781/782";
    if (trainParts.includes("773") && isOffday) return "737/750";
    if (trainParts.includes("774") && isOffday) return "774";
    if (trainParts.includes("710") && isOffday) return "710";
    if (trainParts.includes("739") && ["Sunday", "Monday"].includes(dayName)) return "718";
    if (trainParts.includes("717") && dayName === "Wednesday") return "710";
    if (trainParts.includes("704") && dayName === "Sunday") return "787";

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
    </div>
  `;

  if (trainNum === 722 && tday === "Monday") {
    output += "<p>Note: Next Day Status = Spare</p>";
  }

  output += `<p id="line">Your Next 1 Month Trip is here:</p>`;
  output += `
            <div class="firstdayBox">
              <div class="rowWrap">
                <div class="col">>Date</div>
                <div class="col">Day</div>
                <div class="col">Train No.</div>
                <div class="col">Status</div>
              </div>
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
  <div class="dayBox" style="background: ${status === 'Off Day' ? '#f64545' : '#01ef90'};">
    <div class="rowWrap">
      <div class="col">${dateStr}</div>
      <div class="col">${dayName}</div>
      <div class="col">${nextTrain}</div>
      <div class="col">${status}</div>
    </div>
  </div>
  `;
  }

  output += "</div>";
  parent.innerHTML = output;
}


function viewRoster() {
  const parent = document.getElementById("displayArea");
  const output = `
    <h2>Here Is Your Roster</h2>
    <img src="roster.jpeg" alt="Roster">
    <strong>Note:</strong> Make sure to check all note.

    <div style="margin-top: 20px;" id="note">
      <h3>From Dhaka</h3><br>
      <ul>
        <li>If Sunday 722 is closed, then Tuesday 709 will be open.</li>
        <li>If Monday 709 is closed, then Tuesday 719 will be open.</li>
        <li>If Monday 707/708 is closed, then Tuesday 717 will be open.</li>
        <li>If Monday 767 arrives, then Wednesday 704 will be open.</li>
        <li>If Tuesday 707 arrives, then Wednesday rest: resume from Friday 4 up.</li>
        <li>If Tuesday 1 up (769 is closed), will arrive Wednesday 718/782.</li>
        <li>If Friday 773 is closed, then Saturday 707/750.</li>
      </ul><br>

      <h3>From Sylhet</h3><br>
      <ul>
        <li>If Sunday 769 goes, then Tuesday 710 will arrive.</li>
        <li>If Monday 769 goes, then Wednesday 718 will arrive.</li>
        <li>If Wednesday 717 goes, then Thursday: 710 will arrive.</li>
      </ul><br>

      <h3>From Chattogram</h3><br>
      <ul>
        <li>If Sunday 704 goes, then Monday 767 will arrive.</li>
        <li>If Monday 722 goes, then Tuesday 703 (Spare) will arrive.</li>
      </ul><br>
    </div>
  `;

  parent.innerHTML = output;
  parent.style.display = "block";
}







