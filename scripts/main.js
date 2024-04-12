const imageSlider = document.getElementById("image-slider");
const leftArrowButton = document.getElementById("left-arrow-button");
const rightArrowButton = document.getElementById("right-arrow-button");
const sliderDotContainer = document.getElementById("slider-dot-container");

//JSON Data
const data = {
  "images": [
    "/images/slider/image1.avif",
    "/images/slider/image2.avif",
    "/images/slider/image3.avif",
    "/images/slider/image4.avif",
    "/images/slider/image5.avif",
    "/images/slider/image6.avif",
    "/images/slider/image7.avif",
    "/images/slider/image8.avif",
    "/images/slider/image9.avif",
  ],
};

//create Images
for (let i = 0; i < data.images.length; i++) {
  const image = document.createElement("img");
  image.src = data.images[i];
  image.classList.add("image");
  imageSlider.appendChild(image);
}

// const images = document.querySelectorAll(".image");

//create buttons
for (let i = 0; i < data.images.length; i++) {
  const button = document.createElement("button");
  button.classList.add("slider-dot-button");
  sliderDotContainer.appendChild(button);
}

const sliderDotButtons = document.querySelectorAll(".slider-dot-button");

const imageSliderWidth = 70;
let imageNumber = 1;

rightArrowButton.addEventListener("click", () => {
  if (imageNumber < data.images.length) {
    imageSlider.style.transform = `translateX(-${
      imageSliderWidth * imageNumber
    }vw)`;
    imageNumber++;
    changeArrowOpacity();
    changeActiveDotButton();
  }
});

leftArrowButton.addEventListener("click", () => {
  if (imageNumber > 1) {
    imageSlider.style.transform = `translateX(-${
      imageSliderWidth * (imageNumber - 2)
    }vw)`;
    imageNumber--;
    changeArrowOpacity();
    changeActiveDotButton();
  }
});

const changeArrowOpacity = () => {
  if (imageNumber === data.images.length) {
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
    if (imageNumber < data.images.length) {
      imageSlider.style.transform = `translateX(-${
        imageSliderWidth * imageNumber
      }vw)`;
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

rightArrowButton.addEventListener("mouseover", stopSlider);
rightArrowButton.addEventListener("mouseout", startSlider);
leftArrowButton.addEventListener("mouseover", stopSlider);
leftArrowButton.addEventListener("mouseout", startSlider);

sliderDotButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    imageSlider.style.transform = `translateX(-${imageSliderWidth * i}vw)`;
    imageNumber = i + 1;
    changeArrowOpacity();
    changeActiveDotButton();
  });
  button.addEventListener("mouseover", stopSlider);
  button.addEventListener("mouseout", startSlider);
});
