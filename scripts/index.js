const meetings = [];

function generateCalendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[new Date().getMonth()];
  const numberOfDays = getDaysOfCurrentMonth();

  const header = document.querySelector("h1");
  header.innerText = month;

  for (i = 1; i < numberOfDays; i++) {
    const span = document.createElement("span");
    const calendar = document.getElementById("calendar");
    span.innerText = i;
    calendar.appendChild(span);
  }
}

function getDaysOfCurrentMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function calendarSelection() {
  const calendar = document.getElementById("calendar");

  for (elem of calendar.children) {
    elem.addEventListener("click", (e) => {
      for (elem of calendar.children) {
        elem.classList.remove("selected");
      }

      e.target.classList.add("selected");

      const day = e.target.innerText;
      const textField = document.getElementById("meeting-day");
      textField.value = day;

      showMeetingsPerDate()

    });
  }
}

function showMeetingsPerDate() {
    const listElements = document.querySelectorAll("li");
    for (li of listElements) {
      if (li.classList.contains(`day${day}`)) {
          li.style.display = 'block'
      } else {
          li.style.display = 'none'
      }
    }

}

function checkDuplicates(arr, obj) {
  if (arr.length === 0) {
    return true;
  }
  for (i = 0; i < arr.length; i++) {
    if (arr[i].day === obj.day && arr[i].time === obj.time) {
      return false;
    } else {
      return true;
    }
  }
}

function createNewMeeting() {
  const meeting_day = document.getElementById("meeting-day").value;
  const meeting_time = document.getElementById("meeting-time").value;
  const meeting_text = document.getElementById("meeting-text").value;
  const meetObject = {
    day: meeting_day,
    time: meeting_time,
    text: meeting_text,
  };

  if (checkDuplicates(meetings, meetObject)) {
    meetings.push(meetObject);
    createMeetingElem(meetObject);
  }
}

function createMeetingElem(obj) {
  const elem = document.createElement("li");
  elem.innerText = `${obj.time} - ${obj.text}`;
  elem.classList.add(`day${obj.day}`)
  document.querySelector("ul").appendChild(elem);
}

const submit = document.querySelector("button");
submit.addEventListener("click", createNewMeeting);

generateCalendar();
calendarSelection();
