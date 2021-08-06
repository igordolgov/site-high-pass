document.addEventListener('DOMContentLoaded', () => {
  const buttonList1 = document.querySelectorAll('.ourProjects__stepBtn--1');
  const buttonList2 = document.querySelectorAll('.ourProjects__stepBtn--2');

  const list1 = document.querySelectorAll('.ourProjects__list--1');
  const list2 = document.querySelectorAll('.ourProjects__list--2');

  buttonList1.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
      list2.forEach((list) =>{
        list.classList.remove('active');
      });
      buttonList2.forEach((btn) =>{
        btn.classList.remove('btn-full');
        btn.removeAttribute('tabindex');
      });

      list1.forEach((list) =>{
        list.classList.add('active');
      });
      buttonList1.forEach((btn) =>{
        btn.classList.add('btn-full');
        btn.setAttribute('tabindex', '-1');
      });
    });
  });
  buttonList2.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
      list1.forEach((list) =>{
        list.classList.remove('active');
      });
      buttonList1.forEach((btn) =>{
        btn.classList.remove('btn-full');
        btn.removeAttribute('tabindex');
      });

      list2.forEach((list) =>{
        list.classList.add('active');
      });
      buttonList2.forEach((btn) =>{
        btn.classList.add('btn-full');
        btn.setAttribute('tabindex', '-1');
      });
    });
  });
});
