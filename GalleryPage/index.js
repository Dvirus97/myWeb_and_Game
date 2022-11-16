const screen = document.querySelector("#screen");
const divImage = document.querySelector("#divImage");

let photosUri = [
  "../assets/images/burger1.jpg",
  "../assets/images/burger6.jpg",
  "../assets/images/burger2.jpg",
  "../assets/images/burger4.jpg",
  "../assets/images/burger3.jpg",
  "../assets/images/burger5.jpg",
];

// for (let i = 0; i < photosUri.length; i++) {
//   divImage.innerHTML += `<img src="${photosUri[i]}" class="myImg" alt=""/>`;
//   if (i % 2) {
//     divImage.innerHTML += "<br>";
//   }
// }

const images = document.querySelectorAll(".myImg");

images.forEach((img) => {
  img.addEventListener("click", imgClick);
});

function imgClick() {
  screen.style.display = "block";
  screen.src = this.src;
}

screen.addEventListener("click", () => {
  screen.style.display = "none";
});
