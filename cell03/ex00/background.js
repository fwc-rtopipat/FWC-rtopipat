function rand255() {
  return Math.floor(Math.random() * 256);
}

function randomRgbColor() {
  const r = rand255();
  const g = rand255();
  const b = rand255();
  return `rgb(${r}, ${g}, ${b})`;
}

const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  document.body.style.backgroundColor = randomRgbColor();
});
