const buttons = document.querySelectorAll(".main-timeframe");
const hoursElements = document.querySelectorAll(".side-hours");
const historyElements = document.querySelectorAll(".side-history");

let jsonData = [];

const updateCards = function (timeframe) {
  jsonData.forEach((item, index) => {
    const currentHours = item.timeframes[timeframe].current;
    const previousHours = item.timeframes[timeframe].previous;

    const periodText = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    };

    hoursElements[index].textContent = `${currentHours}hrs`;
    historyElements[
      index
    ].textContent = `${periodText[timeframe]} - ${previousHours}hrs`;
  });
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.log("Veri çekilemedi!");
    return response.json();
  })
  .then((data) => {
    jsonData = data;
    updateCards("weekly");
  });

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    e.target.classList.add("active");

    const timeframe = e.target.dataset.type;

    updateCards(timeframe);
  });
});
