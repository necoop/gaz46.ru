// Анимация автомобиля
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

document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".counter-container");
  const duration = 3500; // Длительность анимации в миллисекундах
  const currentYear = new Date().getFullYear();
  const specialTarget = currentYear - 2001;

  // Обновляем целевую цифру для специального контейнера
  containers[0].setAttribute("data-target", specialTarget);

  // Создаем IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isInBottomThird(entry)) {
          const counter = entry.target.querySelector(".counter");
          const targetNumber = parseInt(entry.target.getAttribute("data-target"), 10);
          startCounter(counter, targetNumber);
          observer.unobserve(entry.target); // Останавливаем наблюдение после начала анимации
        }
      });
    },
    { threshold: 0.1 }
  );

  // Анимация счётчиков преимуществ
  // Функция проверки, находится ли элемент в нижней трети экрана
  function isInBottomThird(entry) {
    const viewportHeight = window.innerHeight;
    const bottomThirdStart = (viewportHeight * 2) / 3;
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
  containers.forEach((container) => observer.observe(container));
});

//  Блокировка вертикального скролла при открытии поп-ап меню
let isScrollBlocked = false;
document.getElementById("nav__icon").addEventListener("click", function () {
  const menuIcon = document.querySelector(".menu__icon");
  menuIcon.classList.toggle("menu__icon__on");
  const popUpMenu = document.getElementById("pop-up__menu");
  popUpMenu.classList.toggle("pop-up__menu__on");
  isScrollBlocked = !isScrollBlocked;
  setScrollBlock(isScrollBlocked);
});

const setScrollBlock = (function () {
  let numberOfBlocks = 0;
  let originalPaddingRight = null;

  return function (isBlocked) {
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth + "px";
    const body = document.body;
    const html = document.documentElement;

    if (isBlocked) {
      numberOfBlocks++;
      if (numberOfBlocks === 1) {
        originalPaddingRight = getComputedStyle(html).paddingRight;
        body.style.overflowY = "hidden";
        html.style.paddingRight = `calc(${originalPaddingRight} + ${scrollWidth})`;
      }
    } else {
      numberOfBlocks--;
      if (numberOfBlocks < 1) {
        body.style.overflowY = "auto";
        html.style.paddingRight = originalPaddingRight;
        originalPaddingRight = null; // Сбрасываем значение, чтобы предотвратить возможные ошибки
      }
    }
  };
})();

// Закрываем Pop-UP меню при нажатии на ссылку
document.getElementById("pop-up__menu").addEventListener("click", function (event) {
  // Используем closest для поиска ближайшего родителя <a>
  const link = event.target.closest("a");
  if (link) {
    console.log("Ссылка нажата:", link.href);
    // Здесь можно добавить любое другое действие, например:
    // isScrollBlocked = false;
    // setScrollBlock(isScrollBlocked);
    const menuIcon = document.querySelector(".menu__icon");
    menuIcon.classList.toggle("menu__icon__on");
    const popUpMenu = document.getElementById("pop-up__menu");
    popUpMenu.classList.toggle("pop-up__menu__on");
    isScrollBlocked = !isScrollBlocked;
    setScrollBlock(isScrollBlocked);
  }
});

// Плавная прокрутка + делаем поправку для ссылок на мобильном (от 991 пикселя) с учётом фиксированного меню навигации
document.addEventListener("DOMContentLoaded", function () {
  // Функция для обработки кликов по якорным ссылкам
  function handleAnchorClick(event) {
    // Отменяем стандартное поведение
    event.preventDefault();

    // Получаем цель (идентификатор якоря)
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Получаем текущую позицию элемента
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

      // Определяем поправку: если ширина окна меньше или равна 991 пиксель, добавляем -110 пикселей
      const offset = window.innerWidth <= 991 ? 110 : 0;

      // Скроллим к элементу с учетом поправки
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth", // Плавный скроллинг
      });
    }
  }

  // Получаем все ссылки на якоря
  const links = document.querySelectorAll('a[href^="#"]');

  // Добавляем обработчик клика к каждой ссылке
  links.forEach((link) => {
    link.addEventListener("click", handleAnchorClick);
  });
});
