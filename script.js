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
          ["787","Tuesday","Chattogram","Dhaka","Tuesday"],
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
          ["787","Thursday","Chattogram","Dhaka","Tuesday"],
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
          ["787","Monday","Chattogram","Dhaka","Tuesday"],
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
        child.innerHTML = `
                        <h2 class="duty-heading">Dear LM/ALM,</h2>
                        <h4 class="duty-subheading">Your Today's Trip</h4>
                        <div class="duty-summary">
                            <span class="duty-date">📅 ${todayDate}</span> |
                            <span class="duty-day">🗓️ ${tday}</span> |
                            <span class="duty-train">🚆 Train No: ${roster[i][0]}</span> |
                            <span class="duty-from">From: ${roster[i][2]}</span> |
                            <span class="duty-to">To: ${roster[i][3]}</span> |
                            <span class="duty-status">${status}</span>
                        </div>`;
        parent.appendChild(child);

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
childTwo.innerHTML = `<h4>Your Next 30 Days Schedule</h4>
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
    row.className = "duty-row"; // Add class for styling

    let bgColor = "#f9fafb"; // default
    if (dayStatus === "Scheduled") {
      bgColor = "#90ee90"; // light green
    } else if (dayStatus === "Off Day") {
      bgColor = "rgb(240, 135, 135)"; // light red
    } else if (dayStatus === "Rest") {
      bgColor = "#efce61"; // light yellow
    }

    row.style.backgroundColor = bgColor;

    row.innerHTML = `
  <div class="duty-date">
    <strong>${dateStr}</strong> | <strong>${dayName}</strong>
  </div>
  <div class="duty-info">
    <span><strong>🚆 Train No:</strong> ${nextTrain}</span>
    <span><strong>📋 Status:</strong> ${dayStatus}</span>
    <span><strong>📍 From:</strong> ${fromStation}</span>
    <span><strong>🏁 To:</strong> ${toStation}</span>
  </div>
`;
childTwo.appendChild(row);
   document.getElementById("display").style.display = "block";
}


}







