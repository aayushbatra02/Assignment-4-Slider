const imageSlider = document.getElementById("image-slider");
const leftArrowButton = document.getElementById("left-arrow-button");
const rightArrowButton = document.getElementById("right-arrow-button");
const images = document.querySelectorAll(".image");
const sliderDotContainer = document.getElementById("slider-dot-container");

//create buttons
for (let i = 0; i < images.length; i++) {
  const button = document.createElement("button");
  button.classList.add("slider-dot-button");
  sliderDotContainer.appendChild(button);
}

const sliderDotButtons = document.querySelectorAll(".slider-dot-button");

const imageSliderWidth = imageSlider.offsetWidth;
let imageNumber = 1;

rightArrowButton.addEventListener("click", () => {
  if (imageNumber < images.length) {
    imageSlider.style.transform = `translateX(-${imageSliderWidth * imageNumber}px)`;
    imageNumber++;
    changeArrowOpacity();
    changeActiveDotButton();
  }
});

leftArrowButton.addEventListener("click", () => {
  if (imageNumber > 1) {
    imageSlider.style.transform = `translateX(-${
      imageSliderWidth * (imageNumber - 2)
    }px)`;
    imageNumber--;
    changeArrowOpacity();
    changeActiveDotButton();
  }
});

const changeArrowOpacity = () => {
  if (imageNumber === images.length) {
    rightArrowButton.style.opacity = 0.3;
  } else {
    rightArrowButton.style.opacity = 1;
  }

  if (imageNumber === 1) {
    leftArrowButton.style.opacity = 0.3;
  } else {
    leftArrowButton.style.opacity = 1;
  }
};

const changeActiveDotButton = () => {
  sliderDotButtons.forEach((button, i) => {
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
      imageSlider.style.transform = `translateX(-${imageSliderWidth * imageNumber}px)`;
      imageNumber++;
      changeArrowOpacity();
      changeActiveDotButton();
    } else {
      imageSlider.style.transform = `translateX(0px)`;
      imageNumber = 1;
      changeArrowOpacity();
      changeActiveDotButton();
    }
  }, 3000);
};

startSlider();

const stopSlider = () => {
  clearInterval(sliderInterval);
};

imageSlider.addEventListener("mouseover", stopSlider);
imageSlider.addEventListener("mouseout", startSlider);
rightArrowButton.addEventListener("mouseover", stopSlider);
rightArrowButton.addEventListener("mouseout", startSlider);
leftArrowButton.addEventListener("mouseover", stopSlider);
leftArrowButton.addEventListener("mouseout", startSlider);

sliderDotButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    imageSlider.style.transform = `translateX(-${imageSliderWidth * i}px)`;
    imageNumber = i + 1;
    changeArrowOpacity();
    changeActiveDotButton();
  });
  button.addEventListener("mouseover", stopSlider);
  button.addEventListener("mouseout", startSlider);
});
