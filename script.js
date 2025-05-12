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
let greetingText = "";

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

greetingElement.innerHTML=`<h2> ${greetingText} </h2>`;
setTimeout(() => {
  greetingElement.innerHTML = '';
}, 5000);


function createRoste() {
  const roaster = [
    [709, "Monday"], [740, "Monday"], ["781/782", "Tuesday"], ["799/800", "Sunday"],
    [2, null], [3, null], [722, "Sunday"], [787, "Tuesday"], [749, null],
    [738, null], ["816/815", "Wednesday"],["707/708", "Monday"], [717, "Tuesday"],
    [718, "Thursday"], [4, null], ["1+RT", null], [739, "Wednesday"], [710, "Monday"],
    [773, "Friday"], [774, "Friday"], ["737/750", "Wednesday"], [704, null],
    [701, "Monday"], [709, "Monday"], [740, "Monday"]
  ];

  const today = new Date();
  const todayDate = today.toLocaleDateString('en-GB');
  const tday = today.toLocaleString('en-us', { weekday: 'long' });

  let todaysDuty = document.getElementById("todaysDuty").value.trim()
  
  if (todaysDuty === "") {
  Swal.fire({
    icon: "warning",
    title: "Empty Input!",
    text: "Please Enter Your Train Number to Continue."
  });
  return;
  }

  Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your Schedule Is Ready.",
  showConfirmButton: false,
  timer: 1000
  });
  if (todaysDuty === "707" || todaysDuty === "708") {
    todaysDuty = "707/708";
  } else if (todaysDuty === "781" || todaysDuty === "782") {
    todaysDuty = "781/782";
  } else if (todaysDuty === "799" || todaysDuty === "800") {
    todaysDuty = "799/800";
  } else if (todaysDuty === "737" || todaysDuty === "750") {
    todaysDuty = "737/750";
  } else if (todaysDuty === "816" || todaysDuty === "815"){
    todaysDuty = "816/815"
  }

  let startIndex = -1;

  for (let idx = 0; idx < roaster.length; idx++) {
    if (String(roaster[idx][0]) === todaysDuty) {
      startIndex = idx;
      break;
    }
  }

  if (startIndex === -1) {
    Swal.fire({
    icon: "error",
    title: "Sorry!",
    html: "📌 Note: This schedule is prepared only for <strong>Dhaka Shed staff</strong>."
  });
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
  Swal.fire({
    icon: "info",
    title: "Special Notice for Train 722",
    html: `
      Please report to <strong>Spare</strong> via trains <strong>701, 721, 703, or 813</strong>.<br>
      <strong>Important:</strong> Do <u>not</u> proceed with <strong>815</strong> or <strong>741</strong>—take proper rest.
    `,
    confirmButtonText: "Understood",
    confirmButtonColor: "#3085d6"
  });
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
        <li>If Monday 709 is closed, then Tuesday 749 will be open.</li>
        <li>If Monday 707/708 is closed, then Tuesday 773 will be open.</li>
        <li>If Monday 787 arrives, then Wednesday 704 will be open.</li>
        <li>If Tuesday 737 arrives, then Wednesday rest: resume from Friday 4 DN.</li>
        <li>If Tuesday 1 up /(739 is closed), will arrive Wednesday 718/782.</li>
        <li>If Friday 773 is closed, then Saturday 737/750.</li>
      </ul><br>

      <h3>From Sylhet</h3><br>
      <ul>
        <li>If Sunday 739 goes, then Tuesday 710 will arrive.</li>
        <li>If Monday 739 goes, then Wednesday 718 will arrive.</li>
        <li>If Wednesday 717 goes, then Thursday 710 will arrive.</li>
      </ul><br>

      <h3>From Chattogram</h3><br>
      <ul>
        <li>If Sunday 704 goes, then Monday 787 will arrive.</li>
        <li>If Monday 722 goes, then Tuesday 703 (Spare) will arrive.</li>
      </ul><br>
    </div>
  `;

  parent.innerHTML = output;
  parent.style.display = "block";
}

function createRoster(){
  const roster = [["709","Saturday","Dhaka","Sylhet","Monday"],
          ["740","Sunday","Sylhet","Dhaka","Monday"],
          ["781/782","Monday","Dhaka","Kishorganj","Tuesday"],
          ["799/800","Tuesday","Dhaka","Jamalpur","Sunday"],
          ["2","Wednesday","Dhaka","Akhaura",null],
          ["3","Thursday","Akhaura","Dhaka",null],
          ["722","Friday","Dhaka","Chattogram","Sunday"],
          ["787","Saturday","Chattogram","Dhaka","Tuesday"],
          ["749","Sunday","Dhaka","Kishorganj",null],
          ["738","Monday","Kishorganj","Dhaka",null],
          ["816","Tuesday","Dhaka","Chattogram","Wednesday"],
          ["815","Wednesday","Chattogram","Dhaka",null],
          ["707/708","Thursday","Dhaka","Dewanganj","Monday"],
          ["717","Friday","Dhaka","Sylhet","Tuesday"],
          ["718","Saturday","Sylhet","Dhaka","Thursday"],
          ["4","Sunday","Dhaka","Akhaura",null],
          ["1+RT","Monday","Akhaura","Dhaka",null],
          ["739","Tuesday","Dhaka","Sylhet","Wednesday"],
          ["710","Wednesday","Sylhet","Dhaka","Monday"],
          ["773","Thursday","Dhaka","Sylhet","Friday"],
          ["774","Friday","Sylhet","Dhaka","Friday"],
          ["774","Saturday","Sylhet","Dhaka","Friday"],
          ["737/750","Sunday","Dhaka","Kishorganj","Wednesday"],
          ["704","Monday","Dhaka","Chattogram",null],
          ["701","Tuesday","Chattogram","Dhaka","Monday"],
          ["709","Wednesday","Sylhet","Dhaka","Monday"],
          ["740","Thursday","Sylhet","Dhaka","Monday"],
          ["781/782","Friday","Dhaka","Kishoganj","Tuesday"],
          ["799/800","Saturday","Dhaka","Jamalpur","Sunday"],
          ["2","Sunday","Dhaka","Akhaura",null],
          ["3","Monday","Akhaura","Dhaka",null],
          ["722","Tuesday","Dhaka","Chattogram","Sunday"],
          ["787","Wednesday","Chattogram","Dhaka","Tuesday"],
          ["749","Thursday","Dhaka","Kishorganj",null],
          ["738","Friday","Kishorganj","Dhaka",null],
          ["816","Saturday","Dhaka","Chattogram","Wednesday"],
          ["815","Sunday","Chattogram","Dhaka",null],
          ["707/708","Monday","Dhaka","Dewanganj","Monday"],
          ["773","Tuesday","Dhaka","Sylhet","Friday"],
          ["774","Wednesday","Sylhet","Dhaka","Friday"],
          ["737/750","Thursday","Dhaka","Kishorganj","Wednesday"],
          ["704","Friday","Dhaka","Chattogram",null],
          ["701","Saturday","Chattogram","Dhaka","Monday"],
          ["709","Sunday","Dhaka","Sylhet","Monday"],
          ["740","Monday","Sylhet","Dhaka","Monday"],
          ["781/782","Tuesday","Dhaka","Kishoganj","Tuesday"],
          ["799/800","Wednesday","Dhaka","Jamalpur","Sunday"],
          ["2","Thursday","Dhaka","Akhaura",null],
          ["3","Friday","Akhaura","Dhaka",null],
          ["722","Saturday","Dhaka","Chattogram","Sunday"],
          ["787","Sunday","Chattogram","Dhaka","Tuesday"],
          ["749","Monday","Dhaka","Kishorganj",null],
          ["738","Tuesday","Kishorganj","Dhaka",null],
          ["816","Wednesday","Dhaka","Chattogram","Wednesday"],
          ["815","Thursday","Chattogram","Dhaka",null],
          ["707/708","Friday","Dhaka","Dewanganj","Monday"],
          ["717","Saturday","Dhaka","Sylhet","Tuesday"],
          ["718","Sunday","Sylhet","Dhaka","Thursday"],
          ["4","Monday","Dhaka","Akhaura",null],
          ["1+RT","Tuesday","Akhaura","Dhaka",null],
          ["781/782","Wednesday","Dhaka","Kishorganj","Tuesday"],
          ["799/800","Thursday","Dhaka","Jamalpur","Sunday"],
          ["2","Friday","Dhaka","Akhaura",null],
          ["3","Saturday","Akhaura","Dhaka",null],
          ["722","Sunday","Dhaka","Chattogram","Sunday"],
          ["N/A","Tuesday","N/A","N/A","Rest"],
          ["709","Tuesday","Sylhet","Dhaka","Monday"],
          ["740","Wednesday","Sylhet","Dhaka","Monday"],
          ["781/782","Thursday","Dhaka","Kishoganj","Tuesday"],
          ["799/800","Friday","Dhaka","Jamalpur","Sunday"],
          ["2","Saturday","Dhaka","Akhaura",null],
          ["3","Sunday","Akhaura","Dhaka",null],
          ["722","Monday","Dhaka","Chattogram","Sunday"],
          ["787","Tuesday","Dhaka","Chattogram","Tuesday"],
          ["749","Wednesday","Dhaka","Kishorganj",null],
          ["738","Thursday","Kishorganj","Dhaka",null],
          ["816","Friday","Dhaka","Chattogram","Wednesday"],
          ["815","Saturday","Chattogram","Dhaka",null],
          ["707/708","Sunday","Dhaka","Dewanganj","Monday"],
          ["717","Monday","Dhaka","Sylhet","Tuesday"],
          ["718","Tuesday","Sylhet","Dhaka","Thursday"],
          ["4","Wednesday","Dhaka","Akhaura",null],
          ["1+RT","Thursday","Akhaura","Dhaka",null],
          ["739","Friday","Dhaka","Sylhet","Wednesday"],
          ["710","Saturday","Sylhet","Dhaka","Monday"],
          ["773","Sunday","Dhaka","Sylhet","Friday"],
          ["774","Monday","Sylhet","Dhaka","Friday"],
          ["737/750","Tuesday","Dhaka","Kishorganj","Wednesday"],
          ["N/A","Tuesday","N/A","N/A","Rest"],
          ["N/A","Tuesday","N/A","N/A","Rest"],
          ["4","Friday","Dhaka","Akhaura",null],
          ["1+RT","Saturday","Akhaura","Dhaka",null],
          ["739","Sunday","Dhaka","Sylhet","Wednesday"],
          ["710","Monday","Sylhet","Dhaka","Monday"],
          ["710","Tuesday","Sylhet","Dhaka","Monday"],
          ["773","Wdnesday","Dhaka","Sylhet","Friday"],
          ["774","Thursday","Sylhet","Dhaka","Friday"],
          ["737/750","Friday","Dhaka","Kishorganj","Wednesday"],
          ["704","Saturday","Dhaka","Chattogram",null],
          ["701","Sunday","Chattogram","Dhaka","Monday"],
          ["709","Monday","Sylhet","Dhaka","Monday"],
          ["749","Tuesday","Dhaka","Kishorganj",null],
          ["738","Wednesday","Kishorganj","Dhaka",null],
          ["816","Thursday","Dhaka","Chattogram","Wednesday"],
          ["815","Friday","Chattogram","Dhaka",null],
          ["707/708","Saturday","Dhaka","Dewanganj","Monday"],
          ["717","Sunday","Dhaka","Sylhet","Tuesday"],
          ["718","Monday","Sylhet","Dhaka","Thursday"],
          ["4","Tuesday","Dhaka","Akhaura",null],
          ["1+RT","Wednesday","Akhaura","Dhaka",null],
          ["739","Thursday","Dhaka","Sylhet","Wednesday"],
          ["710","Friday","Sylhet","Dhaka","Monday"],
          ["773","Saturday","Dhaka","Sylhet","Friday"],
          ["774","Sunday","Sylhet","Dhaka","Friday"],
          ["737/750","Monday","Dhaka","Kishorganj","Wednesday"],
          ["704","Tuesday","Dhaka","Chattogram",null],
          ["701","Wednesday","Chattogram","Dhaka","Monday"],
          ["709","Thursday","Dhaka","Sylhet","Monday"],
          ["740","Friday","Sylhet","Dhaka","Monday"],
          ["781/782","Saturday","Dhaka","Kishoganj","Tuesday"],
          ["799/800","Sunday","Dhaka","Jamalpur","Sunday"],
          ["2","Monday","Dhaka","Akhaura",null],
          ["3","Tuesday","Akhaura","Dhaka",null],
          ["722","Wednesday","Dhaka","Chattogram","Sunday"],
          ["787","Thursday","Dhaka","Chattogram","Tuesday"],
          ["749","Friday","Dhaka","Kishorganj",null],
          ["738","Saturday","Kishorganj","Dhaka",null],
          ["816","Sunday","Dhaka","Chattogram","Wednesday"],
          ["815","Monday","Chattogram","Dhaka",null],
          ["707/708","Tuesday","Dhaka","Dewanganj","Monday"],
          ["717","Wednesday","Dhaka","Sylhet","Tuesday"],
          ["710","Thursday","Sylhet","Dhaka","Monday"],
          ["773","Friday","Dhaka","Sylhet","Friday"],
          ["737/750","Saturday","Dhaka","Kishorganj","Wednesday"],
          ["704","Sunday","Dhaka","Chattogram",null],
          ["787","Monday","Dhaka","Chattogram","Tuesday"],
          ["N/A","Tuesday","N/A","N/A","Rest"],
          ["704","Wednesday","Dhaka","Chattogram",null],
          ["701","Thursday","Chattogram","Dhaka","Monday"],
          ["709","Friday","Dhaka","Sylhet","Monday"],
          ["740","Saturday","Sylhet","Dhaka","Monday"],
          ["781/782","Sunday","Dhaka","Kishorganj","Tuesday"],
          ["799/800","Monday","Dhaka","Jamalpur","Sunday"],
          ["2","Tuesday","Dhaka","Akhaura",null],
          ["3","Wednesday","Akhaura","Dhaka",null],
          ["722","Thursday","Dhaka","Chattogram","Sunday"],
          ["787","Friday","Chattogram","Dhaka","Tuesday"],
          ["749","Saturday","Dhaka","Kishorganj",null],
          ["738","Sunday","Kishorganj","Dhaka",null],
          ["816","Monday","Dhaka","Chattogram","Wednesday"],
          ["815","Tuesday","Chattogram","Dhaka",null],
          ["707/708","Wednesday","Dhaka","Dewanganj","Monday"],
          ["717","Thursday","Dhaka","Sylhet","Tuesday"],
          ["718","Friday","Sylhet","Dhaka","Thursday"],
          ["4","Saturday","Dhaka","Akhaura",null],
          ["1+RT","Sunday","Akhaura","Dhaka",null],
          ["739","Monday","Dhaka","Sylhet","Wednesday"],
          ["N/A","Tuesday","N/A","N/A","Rest"],
          ["718","Wednesday","Sylhet","Dhaka","Thursday"],
          ["4","Thursday","Dhaka","Akhaura",null],
          ["1+RT","Friday","Akhaura","Dhaka",null],
          ["739","Saturday","Dhaka","Sylhet","Wednesday"],
          ["710","Sunday","Sylhet","Dhaka","Monday"],
          ["773","Monday","Dhaka","Sylhet","Friday"],
          ["774","Tuesday","Sylhet","Dhaka","Friday"],
          ["737/750","Wednesday","Dhaka","Kishorganj","Wednesday"],
          ["704","Thursday","Dhaka","Chattogram",null],
          ["701","Friday","Chattogram","Dhaka","Monday"]];

// Get today's date
const today = new Date();
const todayDate = today.toLocaleDateString('en-GB');
const weekdayOptions = { weekday: 'long' };
const tday = today.toLocaleDateString('en-GB', weekdayOptions);
console.log(`Today's Date: ${todayDate}`);
console.log(`Day: ${tday}`);

const parent = document.getElementById("display");
parent.textContent = "";
var child = document.createElement("div");
        child.classList.add("innerStyle");
var childTwo = document.createElement("div");
        childTwo.classList.add("innerStyle");
var childThree = document.createElement("div");
        childThree.classList.add("innerStyle");      

// Prompt for today's duty number
let todaysDuty = document.getElementById("todaysDuty").value.trim()

let index = -1;
let status = "";

// Find today's match in the roster
for (let i = 0; i < roster.length; i++) {
    if (tday === roster[i][1] && todaysDuty === roster[i][0]) {
        if (tday === roster[i][4]) {
            status = "Off Day";
        } else if (roster[i][4] === "Rest") {
            status = "Today is Your Offday";
        } else {
            status = "Scheduled";
        }
        console.log(`>> ${todayDate} | ${tday} | ${roster[i][0]} | ${roster[i][2]} | ${roster[i][3]} | ${status}`);
        child.innerHTML =`<h2>Dear LM/ALM,</h2><br><br>
                          <h4>Your Today's Trip</h4>
                          <Strong>>> ${todayDate} | ${tday.padEnd(11)} | ${roster[i][0].padEnd(11)} | ${roster[i][2].padEnd(12)} | ${roster[i][3].padEnd(12)} | ${status}</Strong>
                          `
              parent.appendChild(child)
        index = i;
        break;
    }
}

if (index === -1) {
  Swal.fire({
    icon: "error",
    title: "Sorry!",
    html: "📌 Note: This schedule is prepared only for <strong>Dhaka Shed staff</strong>."
  });
  return;
}

// Print next 30 days
childTwo.innerHTML = `<h4>Your Next 30 Days Schedule</h4><br>
                  <strong>Date |  Day  |Train No.| From | To | Status</strong>
                  <p>-------------------------------------------------------</p>
                  `
    parent.appendChild(childTwo)

for (let j = 0; j < 30; j++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + j + 1);
    const dateStr = nextDay.toLocaleDateString('en-GB');
    const dayName = nextDay.toLocaleDateString('en-GB', weekdayOptions);

    const roster_index = (index + j + 1) % roster.length;
    const [nextTrain, , fromStation, toStation, offDay] = roster[roster_index];

    let dayStatus = "Scheduled";
    if (dayName === offDay) {
        dayStatus = "Off Day";
    } else if (offDay === "Rest") {
        dayStatus = "Rest";
    }

    const row = document.createElement("div");
    row.innerHTML = `<strong>${dateStr}|${dayName}|${nextTrain}|${fromStation}|${toStation}|${dayStatus}</strong>`;
    childTwo.appendChild(row); 
}


}







