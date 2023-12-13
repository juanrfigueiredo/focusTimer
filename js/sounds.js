// Sound Instances
const cafeAudio = new Audio("./assets/Cafeteria.wav");
const rainAudio = new Audio("./assets/Chuva.wav");
const forestAudio = new Audio("./assets/Floresta.wav");
const fireplaceAudio = new Audio("./assets/Lareira.wav");

// Retrieve all cards
const soundCards = document.querySelectorAll(".card");
const soundButtons = document.querySelectorAll(".card button");

// Function to stop all playing sounds
export function stopAllSounds() {
  cafeAudio.pause();
  rainAudio.pause();
  forestAudio.pause();
  fireplaceAudio.pause();
}

// Sound Controller Object
const SoundController = {
  toggleNatureSound: () => {
    forestAudio.paused ? forestAudio.play() : forestAudio.pause();
  },
  toggleRainSound: () => {
    rainAudio.paused ? rainAudio.play() : rainAudio.pause();
  },
  toggleCafeSound: () => {
    cafeAudio.paused ? cafeAudio.play() : cafeAudio.pause();
  },
  toggleFireplaceSound: () => {
    fireplaceAudio.paused ? fireplaceAudio.play() : fireplaceAudio.pause();
  },
};

// Register Events Function
export const registerEvents = () => {
  // Set audio to loop
  rainAudio.loop = true;
  cafeAudio.loop = true;
  forestAudio.loop = true;
  fireplaceAudio.loop = true;

  // Event listeners for each sound card
  soundCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      const soundAction = SoundController[action];
      if (typeof soundAction === "function") {
        card.classList.toggle("active");
        soundAction();
      }
    });
  });

  // Event listeners for each sound button
  soundButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      const soundAction = SoundController[action];
      if (typeof soundAction === "function") {
        soundAction();
      }
    });
  });
};
