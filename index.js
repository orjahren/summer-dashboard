"use strict";
const currentYear = new Date().getFullYear();
const mainHeading = document.getElementById("mainTitle");
if (mainHeading) {
  mainHeading.textContent = `Summer dashboard ${currentYear}`;
}
const pageTitle = document.getElementById("pageTitle");
if (pageTitle) {
  pageTitle.textContent = `Summer dashboard ${currentYear}`;
}

const fadderukaStartDate = new Date("Aug 11, 2025 00:00:00");
const interval = setInterval(function () {
  var distance = fadderukaStartDate.getTime() - new Date().getTime();
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdownP").innerHTML =
    days + "d " + hours + "t " + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(setInterval);
    console.warn("Fadderuka has started");
  }
}, 1000);
const defaultduedate = fadderukaStartDate;
const newBucketListItem = (newName) =>
  localStorage.setItem(
    "db",
    JSON.stringify(
      JSON.parse(localStorage.getItem("db")).concat([
        {
          name: newName,
          done: false,
          due: defaultduedate,
          doneDate: null,
          startedDate: new Date(),
        },
      ])
    )
  ) || generateLists();

const generateLists = () => {
  const generateCheckbox = (item) =>
    `<li><input type="checkbox" id="${item.name}" name="${
      item.name
    }" class="checkboxes" ${item.done && "checked disabled"}>${
      item.name
    }<label for="${item.name}>${item.name}</label></li>`;

  document.getElementById("doneUl").innerHTML = "";
  document.getElementById("todoUl").innerHTML = "";

  const parsedDb = JSON.parse(localStorage.getItem("db"));
  parsedDb.forEach((item) => {
    document.getElementById(item.done ? "doneUl" : "todoUl").innerHTML +=
      generateCheckbox(item);
  });
  const allCheckboxes = document.getElementsByClassName("checkboxes");
  for (let i = 0; i < allCheckboxes.length; i++) {
    allCheckboxes[i].addEventListener("change", (event) => {
      parsedDb.forEach((item) => {
        if (item.name === event.target.name) {
          item.done = !item.done;
          item.doneDate = item.done ? new Date() : null;
          localStorage.setItem("db", JSON.stringify(parsedDb));
          generateLists();
        }
      });
    });
  }
};

generateLists();
