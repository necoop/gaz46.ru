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


document.addEventListener("DOMContentLoaded", function() {
  const containers = document.querySelectorAll('.counter-container');
  const duration = 3500; // Длительность анимации в миллисекундах
  const currentYear = new Date().getFullYear();
  const specialTarget = currentYear - 2001;

  // Обновляем целевую цифру для специального контейнера
  containers[0].setAttribute('data-target', specialTarget);

  // Создаем IntersectionObserver
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting && isInBottomThird(entry)) {
              const counter = entry.target.querySelector('.counter');
              const targetNumber = parseInt(entry.target.getAttribute('data-target'), 10);
              startCounter(counter, targetNumber);
              observer.unobserve(entry.target); // Останавливаем наблюдение после начала анимации
          }
      });
  }, { threshold: 0.1 });

  // Функция проверки, находится ли элемент в нижней трети экрана
  function isInBottomThird(entry) {
      const viewportHeight = window.innerHeight;
      const bottomThirdStart = viewportHeight * 2 / 3;
      const elementTop = entry.boundingClientRect.top;
      return elementTop >= bottomThirdStart;
  }

  // Функция для анимации счетчика
  function startCounter(counter, targetNumber) {
      let startTime = null;
      function animateCounter(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const easing = easeOutCubic(progress / duration);
          const currentNumber = Math.min(Math.round(easing * targetNumber), targetNumber);
          counter.textContent = currentNumber;
          if (progress < duration) {
              requestAnimationFrame(animateCounter);
          } else {
              counter.textContent = targetNumber; // Обеспечиваем точное достижение целевого значения
          }
      }
      requestAnimationFrame(animateCounter);
  }

  // Кубическая функция замедления
  function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
  }

  // Начинаем наблюдение за каждым контейнером
  containers.forEach(container => observer.observe(container));
});



document.getElementById('nav__icon').addEventListener('click', function() {
  var menuIcon = document.querySelector('.menu__icon');
  menuIcon.classList.toggle('menu__icon__on');
});