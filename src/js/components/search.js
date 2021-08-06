document.addEventListener('DOMContentLoaded', () => {

  const searchWrapper = document.querySelector('.search');
  const searchForm = document.querySelector('.search__form');
  const searchInput = document.querySelector('.search__input');
  const searchButton = document.querySelector('.search__button');
  const searchButtonClose = document.querySelector('.search__buttonClose');

  searchForm.addEventListener('submit', () => {
    searchForm.preventDefault;
  });
  searchButton.addEventListener('click', (e) => {
    searchWrapper.classList.add('active');
    searchForm.classList.add('active');
    searchInput.classList.add('active');
  });

  searchButtonClose.addEventListener('click', () => {
    searchWrapper.classList.remove('active');
    searchForm.classList.remove('active');
    searchInput.classList.remove('active');
  });
});
