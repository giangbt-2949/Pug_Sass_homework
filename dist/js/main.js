
let navbar = document.querySelector('.navbar');
let navBtn = document.getElementById('nav-btn');

navBtn.addEventListener('click', () => {
  if(navbar.classList.contains('navbar-show')){
    navbar.classList.remove('navbar-show');
  } else {
    navbar.classList.add('navbar-show');
  }
});