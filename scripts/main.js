const image = document.getElementById("image");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const navBtn = document.querySelectorAll(".nav-btn");

let selectedImage = 0;

const disableButton = () => {
  console.log(selectedImage);
  if (selectedImage === 0) {
    leftArrow.classList.add("disable");
  } else {
    leftArrow.classList.remove("disable");
  }

  if (selectedImage === 8) {
    rightArrow.classList.add("disable");
  } else {
    rightArrow.classList.remove("disable");
  }
};

const nextImage = () => {
  if (selectedImage < 8) {
    selectedImage++;
    image.setAttribute("src", `./images/slider/image-${selectedImage}.jpg`);
    changeActiveButton();
  }
  disableButton();
};

const prevImage = () => {
  if (selectedImage > 0) {
    selectedImage--;
    image.setAttribute("src", `./images/slider/image-${selectedImage}.jpg`);
    changeActiveButton();
  }
  disableButton();
};

const changeActiveButton = () => {
  for (let i = 0; i < navBtn.length; i++) {
    if (i === selectedImage) {
      navBtn[i].classList.add("active");
    } else {
      navBtn[i].classList.remove("active");
    }
  }
};

const navigateToImage = () => {};

//adding click on nav buttons
for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", () => {
    selectedImage = i;
    image.setAttribute("src", `./images/slider/image-${i}.jpg`);
    changeActiveButton();
    disableButton();
  });
}

rightArrow.addEventListener("click", nextImage);
leftArrow.addEventListener("click", prevImage);
