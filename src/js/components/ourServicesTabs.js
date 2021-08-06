document.addEventListener('DOMContentLoaded', () => {
  const buttonList1 = document.querySelector('.ourServices-switch__button--1');
  const buttonList2 = document.querySelector('.ourServices-switch__button--2');

  const list1 = document.querySelector('.ourServices__list--1');
  const list2 = document.querySelector('.ourServices__list--2');

  const executedWorks1 = document.querySelector('.executedWorks--1');
  const executedWorks2 = document.querySelector('.executedWorks--2');


  const wrapper = document.querySelector('.ourServices-item-promo__wrapper');

  buttonList1.addEventListener('click', ()=>{
    list2.classList.remove('active');
    buttonList2.classList.remove('active');
    buttonList2.removeAttribute('tabindex');
    executedWorks2.classList.remove('active');
    wrapper.classList.remove('active');

    list1.classList.add('active');
    buttonList1.classList.add('active');
    buttonList1.setAttribute('tabindex', "-1");
    executedWorks1.classList.add('active');
  });
  buttonList2.addEventListener('click', ()=>{
    list1.classList.remove('active');
    buttonList1.classList.remove('active');
    buttonList1.removeAttribute('tabindex');
    executedWorks1.classList.remove('active');

    list2.classList.add('active');
    buttonList2.classList.add('active');
    buttonList2.setAttribute('tabindex', "-1");
    executedWorks2.classList.add('active');
    wrapper.classList.add('active');
  });
});
