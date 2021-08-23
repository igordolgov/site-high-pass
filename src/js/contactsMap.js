
document.addEventListener('DOMContentLoaded', () => {
  function init(){
    var myMap = new ymaps.Map("yandexMap", {
        center: [55.76983583656739, 37.631024583937816716],

        zoom: 14,
        controls: [],
    });

    var myPlacemark = new ymaps.Placemark([55.769597545075555,37.63994845785387], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/contacts/mapdote.svg',
        iconImageSize: [12, 12],
    });

    myMap.geoObjects.add(myPlacemark);
  }

  ymaps.ready(init);
});