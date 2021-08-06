
document.addEventListener('DOMContentLoaded', () => {
  function init(){
    // Создание карты.
    var myMap = new ymaps.Map("yndexMap", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76983583656739, 37.631024583937816716],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14,
        controls: [],
    });

    var myPlacemark = new ymaps.Placemark([55.758338081927846, 37.601089758877414], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/mapdote.svg',
        iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
  }

  ymaps.ready(init);
});
