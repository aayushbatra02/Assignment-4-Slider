const imageSlider = document.getElementById("image-slider");
const leftArrowButton = document.getElementById("left-arrow-button");
const rightArrowButton = document.getElementById("right-arrow-button");
const sliderDotContainer = document.getElementById("slider-dot-container");
const addSlideButton = document.getElementById("add-slide-button");
const deleteSlideButton = document.getElementById("delete-slide-button");
const confirmDeleteSlideButton = document.getElementById(
  "confirm-delete-slide-button"
);
const confirmationModal = document.getElementById("confirmation-modal");
const confirmationMessage = document.getElementById("confirmation-message");
const cancelButton = document.getElementById("cancel-button");
const cantDeleteMessage = document.getElementById("cant-delete-message");
const deleteMessage = document.getElementById("delete-message");

//JSON Data
const data = {
  images: [
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

const createImages = () => {
  for (let i = 0; i < data.images.length; i++) {
    const image = document.createElement("img");
    image.src = data.images[i];
    image.classList.add("image");
    imageSlider.appendChild(image);
  }
};

createImages();

//create buttons
for (let i = 0; i < data.images.length; i++) {
  const button = document.createElement("button");
  button.classList.add("slider-dot-button");
  sliderDotContainer.appendChild(button);
}

let sliderDotButtons = document.querySelectorAll(".slider-dot-button");

const imageSliderWidth = 70;
let imageNumber = 1;

const addClickToRightArrowButton = () => {
  rightArrowButton.onclick = () => {
    if (imageNumber < data.images.length) {
      imageSlider.style.transform = `translateX(-${
        imageSliderWidth * imageNumber
      }vw)`;
      imageNumber++;
      changeArrowOpacity();
      changeActiveDotButton();
    }
  };
};

addClickToRightArrowButton();

const addClickToLeftArrowButton = () => {
  leftArrowButton.onclick = () => {
    if (imageNumber > 1) {
      imageSlider.style.transform = `translateX(-${
        imageSliderWidth * (imageNumber - 2)
      }vw)`;
      imageNumber--;
      changeArrowOpacity();
      changeActiveDotButton();
    }
  };
};

addClickToLeftArrowButton();

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

rightArrowButton.onmouseover = stopSlider;
rightArrowButton.onmouseout = startSlider;
leftArrowButton.onmouseover = stopSlider;
leftArrowButton.onmouseout = startSlider;

const addClickOnSliderDotButtons = () => {
  sliderDotButtons.forEach((button, i) => {
    button.onclick = () => {
      imageSlider.style.transform = `translateX(-${imageSliderWidth * i}vw)`;
      imageNumber = i + 1;
      changeArrowOpacity();
      changeActiveDotButton();
    };
    button.onmouseover = stopSlider;
    button.onmouseout = startSlider;
  });
};

addClickOnSliderDotButtons();

const checkImage = async (url) => {
  url = url.trim();
  if (url) {
    const res = await fetch(url);
    if (res.status === 200) {
      return true;
    }
  }
  return false;
};

addSlideButton.onclick = async () => {
  stopSlider();
  const url = prompt("Add Image URL");
  const verifiedUrl = await checkImage(url);
  if (verifiedUrl) {
    data.images.push(url);
    const image = document.createElement("img");
    image.src = url;
    image.classList.add("image");
    imageSlider.appendChild(image);
    const button = document.createElement("button");
    button.classList.add("slider-dot-button");
    sliderDotContainer.appendChild(button);
    sliderDotButtons = document.querySelectorAll(".slider-dot-button");
    addClickOnSliderDotButtons();
  }
  startSlider();
};

deleteSlideButton.onclick = () => {
  confirmationModal.style.display = "flex";
  if (data.images.length === 1) {
    cantDeleteMessage.style.display = "block";
  } else {
    deleteMessage.style.display = "block";
  }
  stopSlider();
};

const hideModal = () => {
  confirmationModal.style.display = "none";
  cantDeleteMessage.style.display = "none";
  deleteMessage.style.display = "none";
};

cancelButton.onclick = () => {
  hideModal();
  startSlider();
};

confirmationModal.onclick = () => {
  hideModal();
  startSlider();
};

confirmationMessage.onclick = (e) => {
  //to avoid closing of modal container on click of message box
  e.stopPropagation();
};

confirmDeleteSlideButton.onclick = () => {
  data.images[imageNumber - 1] = null;
  data.images = data.images.filter((image) => image);
  const images = document.querySelectorAll(".image");
  imageSlider.removeChild(images[imageNumber - 1]);
  sliderDotContainer.removeChild(sliderDotButtons[imageNumber - 1]);
  sliderDotButtons = document.querySelectorAll(".slider-dot-button");
  if (imageNumber === data.images.length + 1) {
    console.log("here");
    imageNumber = 1;
    imageSlider.style.transform = `translateX(0vw)`;
  }
  addClickOnSliderDotButtons();
  hideModal();
  changeActiveDotButton();
  startSlider();
};
