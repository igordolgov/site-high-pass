document.addEventListener('DOMContentLoaded', () => {


  const nav = document.querySelector('.nav');
  const burgerWrapper = document.querySelector('.burger');
  const burgerButton = document.querySelector('.burger__button');
  const burgerButtonClose = document.querySelector('.burger__buttonClose');
  const navList = document.querySelector('.nav__list');

  burgerButton.addEventListener('click', (e) => {
    nav.classList.add('active');
    burgerWrapper.classList.add('active');
    navList.classList.add('active');
  });
  burgerButtonClose.addEventListener('click', (e) => {
    nav.classList.remove('active');
    burgerWrapper.classList.remove('active');
    navList.classList.remove('active');
  });

});
