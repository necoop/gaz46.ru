document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const car = document.getElementById("auto");
    const wheel1 = document.getElementById("wheel1");
    const wheel2 = document.getElementById("wheel2");

    if (car) {
      car.classList.add("car-moving");
    }

    if (wheel1) {
      wheel1.classList.add("wheels-rolling");
    }

    if (wheel2) {
      wheel2.classList.add("wheels-rolling");
    }
  }, 2000);
});
