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
    if (!response.ok) {
      throw new Error("Veri çekilemedi, bir sorun var!");
    }
    return response.json();
  })
  .then((data) => {
    jsonData = data;
    updateCards("weekly");
  })
  .catch((error) => {
    console.error("Hata yakalandı:", error);
  });

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    const clickedButton = e.currentTarget;

    clickedButton.classList.add("active");
    clickedButton.setAttribute("aria-pressed", "true");

    const timeframe = e.target.dataset.type;
    updateCards(timeframe);
  });
});
