const slider = document.getElementById("slider");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const images = document.querySelectorAll(".image");
const buttonContainer = document.getElementById("button-container");

//create buttons
for (let i = 0; i < images.length; i++) {
  const button = document.createElement("button");
  button.classList.add("button");
  buttonContainer.appendChild(button);
}

const sliderButtons = document.querySelectorAll(".button");

const sliderWidth = slider.offsetWidth;
let imageNumber = 1;

rightArrow.addEventListener("click", () => {
  if (imageNumber < images.length) {
    slider.style.transform = `translateX(-${sliderWidth * imageNumber}px)`;
    imageNumber++;
    changeArrowButton();
    changeActiveButton();
  }
});

leftArrow.addEventListener("click", () => {
  if (imageNumber > 1) {
    slider.style.transform = `translateX(-${
      sliderWidth * (imageNumber - 2)
    }px)`;
    imageNumber--;
    changeArrowButton();
    changeActiveButton();
  }
});

const changeArrowButton = () => {
  if (imageNumber === images.length) {
    rightArrow.style.opacity = 0.3;
  } else {
    rightArrow.style.opacity = 1;
  }

  if (imageNumber === 1) {
    leftArrow.style.opacity = 0.3;
  } else {
    leftArrow.style.opacity = 1;
  }
};

const changeActiveButton = () => {
  sliderButtons.forEach((button, i) => {
    if (i === imageNumber - 1) {
      button.style.backgroundColor = "#017AFF";
    } else {
      button.style.backgroundColor = "grey";
    }
  });
};

let sliderInterval;

const startSlider = () => {
  sliderInterval = setInterval(() => {
    if (imageNumber < images.length) {
      slider.style.transform = `translateX(-${sliderWidth * imageNumber}px)`;
      imageNumber++;
      changeArrowButton();
      changeActiveButton();
    } else {
      slider.style.transform = `translateX(0px)`;
      imageNumber = 1;
      changeArrowButton();
      changeActiveButton();
    }
  }, 3000);
};

startSlider();

const stopSlider = () => {
  clearInterval(sliderInterval);
};

slider.addEventListener("mouseover", stopSlider);
slider.addEventListener("mouseout", startSlider);
rightArrow.addEventListener("mouseover", stopSlider);
rightArrow.addEventListener("mouseout", startSlider);
leftArrow.addEventListener("mouseover", stopSlider);
leftArrow.addEventListener("mouseout", startSlider);

sliderButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    slider.style.transform = `translateX(-${sliderWidth * i}px)`;
    imageNumber = i + 1;
    changeArrowButton();
    changeActiveButton();
  });
  button.addEventListener("mouseover", stopSlider);
  button.addEventListener("mouseout", startSlider);
});
