const initialState = {
  minutes: 0,
  seconds: 0,
};

let countdownState = {
  minutes: 0,
  seconds: 0,
  isRunning: false,
  intervalId: null,
};

const display = {
  minutesElement: document.querySelector("#minutes"),
  secondsElement: document.querySelector("#seconds"),
  render: (minutes, seconds) => {
    display.minutesElement.textContent = minutes.toString().padStart(2, "0");
    display.secondsElement.textContent = seconds.toString().padStart(2, "0");
  },
};

const timerElement = document.querySelector("#timer");

const timerController = {
  toggleRunning: () => {
    countdownState.isRunning = timerElement.classList.toggle("running");
    timerController.countdown(countdownState.minutes, countdownState.seconds);
  },
  countdown: (minutes, seconds) => {
    if (!countdownState.isRunning) return;

    clearInterval(countdownState.intervalId);

    countdownState.minutes = minutes ?? initialState.minutes;
    countdownState.seconds = seconds ?? initialState.seconds;

    if (countdownState.seconds > 0) {
      countdownState.seconds--;
    } else if (countdownState.minutes > 0) {
      countdownState.seconds = 59;
      countdownState.minutes--;
    }

    display.render(countdownState.minutes, countdownState.seconds);

    countdownState.intervalId = setInterval(() => {
      if (countdownState.seconds > 0 || countdownState.minutes > 0) {
        timerController.countdown(
          countdownState.minutes,
          countdownState.seconds
        );
      } else {
        countdownState.isRunning = false;
        timerElement.classList.remove("running");
      }
    }, 1000);
  },
  reset: () => {
    countdownState.isRunning = false;
    countdownState.minutes = initialState.minutes;
    countdownState.seconds = initialState.seconds;
    clearInterval(countdownState.intervalId);

    timerElement.classList.remove("running");
    display.render(initialState.minutes, initialState.seconds);
  },
  increaseFiveMinutes: () => {
    if (countdownState.minutes + 5 <= 60) countdownState.minutes += 5;
    display.render(countdownState.minutes, countdownState.seconds);
  },
  decreaseFiveMinutes: () => {
    if (countdownState.minutes - 5 >= 0) countdownState.minutes -= 5;
    display.render(countdownState.minutes, countdownState.seconds);
  },
};

export function initializeTimer(minutes, seconds) {
  initialState.minutes = minutes; countdownState.minutes = minutes;
  initialState.seconds = seconds; countdownState.seconds = seconds;
  countdownState.isRunning = false;
  display.render(minutes, seconds);
}

export function registerControlEvents() {
  const controlButtons = document.querySelectorAll("#controls");
  controlButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      const fn = timerController[action];
      if (typeof fn === "function") {
        fn();
      }
    });
  });
}
