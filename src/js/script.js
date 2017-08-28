// Плавный скролл до верха
var t;
function up() {
  var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -100);
    t = setTimeout('up()', 20);
  } else clearTimeout(t);
  return false;
}

document.querySelector('.page-up__button').addEventListener('click', function(e) {
  e.preventDefault();
  up();
});


// Валидация формы
document.getElementById('email').addEventListener('keydown', function () {
  if (this.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    this.classList.add('error');
  } else {
    this.classList.remove('error');
  }
});


// Сортировка
var sort_link = document.querySelectorAll('.header__sort-link');

[].forEach.call(sort_link, function (elem) {
  elem.addEventListener('click', function (event) {
    event.preventDefault();

    [].forEach.call(sort_link, function (link) {
      link.classList.remove('active');
    });

    this.classList.add('active');
    this.classList.toggle('up');
  });
});
