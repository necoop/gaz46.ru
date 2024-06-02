ymaps.ready(init);

      function init() {
        var places = [
          {
            coordinates: [51.217653, 35.308879],
            hintContent: "Газовая заправка",
            balloonContent: "Заправка автомобильных и бытовых баллонов",
          },
          {
            coordinates: [51.71468, 36.0771],
            hintContent: "Газовая заправка",
            balloonContent: "Заправка автомобильных и бытовых баллонов",
          },
          {
            coordinates: [51.429899, 34.879685],
            hintContent: "Газовая заправка",
            balloonContent: "Заправка автомобильных и бытовых баллонов",
          },
        ];

        // Рассчитываем центр карты
        var center = calculateCenter(places);

        // Создаем карту
        var myMap = new ymaps.Map("map", {
          center: center, // Устанавливаем центр карты
          zoom: 8, // Масштаб карты
          controls: ["zoomControl"], // Удаляем все элементы управления кроме зума
        });

        // Отключаем изменение масштаба по скроллу
        myMap.behaviors.disable("scrollZoom");

        // Добавляем метки на карту
        places.forEach(function (place) {
          var placemark = new ymaps.Placemark(
            place.coordinates,
            {
              hintContent: place.hintContent,
              balloonContent: place.balloonContent,
            },
            {
              preset: "islands#redIcon", // Устанавливаем красный цвет маркера
            }
          );
          myMap.geoObjects.add(placemark);
        });
      }

      function calculateCenter(places) {
        var sumLat = 0;
        var sumLon = 0;
        places.forEach(function (place) {
          sumLat += place.coordinates[0];
          sumLon += place.coordinates[1];
        });
        return [sumLat / places.length, sumLon / places.length];
      }