function rand255() {
  return Math.floor(Math.random() * 256);
}

function randomRgbColor() {
  const r = rand255();
  const g = rand255();
  const b = rand255();
  return `rgb(${r}, ${g}, ${b})`;
}

$(document).ready(function () {
  $("#btn").click(function () {
    $("body").css("background-color", randomRgbColor());
  });
});
