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

async function initApp() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Veri çekilemedi, bir sorun var!");
    }

    const data = await response.json();
    jsonData = data;

    updateCards("weekly");
  } catch (error) {
    console.error("Error:", error);
  }
}

initApp();

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    const clickedButton = e.currentTarget;

    clickedButton.classList.add("active");
    clickedButton.setAttribute("aria-pressed", "true");

    const timeframe = clickedButton.dataset.type;
    updateCards(timeframe);
  });
});
