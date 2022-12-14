const sliderImg = document.querySelector("#sliderImg");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

prevBtn.innerHTML = "<";
nextBtn.innerHTML = ">";
console.log(sliderImg);

let photosUri = [
  "assets/images/burger1.jpg",
  "assets/images/burger2.jpg",
  "assets/images/burger3.jpg",
  "assets/images/burger4.jpg",
  "assets/images/burger5.jpg",
  "assets/images/burger6.jpg",
];
let count = 1;

startPage();
function startPage() {
  shiftSlider();
  nextBtn.addEventListener("click", () => {
    setImageSrc((isNext = true));
  });
  prevBtn.addEventListener("click", () => {
    setImageSrc((isNext = false));
  });
}
function shiftSlider() {
  setInterval(() => {
    setImageSrc((isNext = true));
  }, 2000);
}

function setImageSrc(isNext) {
  if (isNext) {
    count++;
    if (count >= photosUri.length) {
      count = 0;
    }
  } else {
    count--;
    if (count < 0) {
      count = photosUri.length - 1;
    }
  }
  sliderImg.src = photosUri[count];
}
