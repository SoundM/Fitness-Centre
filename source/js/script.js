'use strict';
// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');
//
// pageHeader.classList.remove('page-header--nojs');
//
// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });

// Якорь
var yak1 = document.querySelector('a[href="#yak1"]');
var place1 = document.getElementById('#yak1');

var goHref = function (place) {
  place.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

yak1.addEventListener('click', function () {
  goHref(place1);
});

// слайдер легкий карусель
var allReviews = document.querySelector('.reviews__menu');
allReviews.classList.remove('no-js');

var slideIndex = 1;
// var slides = document.querySelectorAll('.reviews__item');
var slides = [].slice.call(document.querySelectorAll('.reviews__item'), 0);
var prev = document.querySelector('.reviews__control--left');
var next = document.querySelector('.reviews__control--right');


showSlides(slideIndex);

function showSlides(n) {

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

prev.addEventListener('click', function () {
  plusSlides(-1);
});

next.addEventListener('click', function () {
  plusSlides(1);
});

// кнопки абонементов
var activeButton = 0;
var seasonTicketsButtons = [].slice.call(document.querySelectorAll('.season-tickets__for-a-period-of-link'), 0);
var wrapperTicketsButtons = document.querySelector('.season-tickets__for-a-period-of-menu');

showButton(activeButton);

function showButton(n) {
  for (var i = 0; i < seasonTicketsButtons.length; i++) {
    seasonTicketsButtons[i].classList.remove('season-tickets__for-a-period-of-link--active');
  }
  seasonTicketsButtons[n].classList.add('season-tickets__for-a-period-of-link--active');
}

wrapperTicketsButtons.addEventListener('click', function (event) {
  for (var j = 0; j < seasonTicketsButtons.length + 1; j++) {
    if (event.target.classList.contains('season-tickets__for-a-period-of-link') && event.target === seasonTicketsButtons[j]) {
      showButton(j);
    }
  }
});

// слайдер
var allTrainers = document.querySelector('.trainers__menu');
allTrainers.classList.remove('no-js');

var multiItemSlider = (function () {
  return function (selector) {
    var mainElement = document.querySelector(selector); // основный элемент блока
    var sliderSection = document.querySelector('.trainers');
    var sliderMenu = mainElement.querySelector('.trainers__menu'); // обертка для .trainers-item
    // var sliderItems = mainElement.querySelectorAll('.trainers__item'); // элементы (.trainers-item)
    var sliderItems = [].slice.call(document.querySelectorAll('.trainers__item'), 0); // для IE
    // var sliderControls = mainElement.querySelectorAll('.trainers__control'); // элементы управления
    var sliderControls = [].slice.call(document.querySelectorAll('.trainers__control'), 0); // для IE
    var sliderControlLeft = mainElement.querySelector('.trainers__control--left'); // кнопка "LEFT"
    var sliderControlRight = mainElement.querySelector('.trainers__control--right'); // кнопка "RIGHT"
    var sectionWidth = parseFloat(getComputedStyle(sliderSection).width);
    var menuWidth = parseFloat(getComputedStyle(sliderMenu).width); // ширина обёртки
    var itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    var positionLeftItem = 0; // позиция левого активного элемента
    var transform = 0; // значение транфсофрмации .trainers__menu
    var step = itemWidth / menuWidth * 100; // величина шага (для трансформации)
    var items = []; // массив элементов
    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({item: item, position: index, transform: 0});
    });

    var position = {
      getMin: 0,
      getMax: items.length - 1,
    };

    var transformItem = function (direction) {
      if (direction === 'right') {
        if ((positionLeftItem + menuWidth / itemWidth - 1) >= position.getMax) {
          return;
        }
        if (!sliderControlLeft.classList.contains('trainers__control--show')) {
          sliderControlLeft.classList.add('trainers__control--show');
        }
        if (sliderControlRight.classList.contains('trainers__control--show') && (positionLeftItem + menuWidth / itemWidth) >= position.getMax) {
          sliderControlRight.classList.remove('trainers__control--show');
        }
        positionLeftItem++;
        transform -= step;
      }
      if (direction === 'left') {
        if (positionLeftItem <= position.getMin) {
          return;
        }
        if (!sliderControlRight.classList.contains('trainers__control--show')) {
          sliderControlRight.classList.add('trainers__control--show');
        }
        if (sliderControlLeft.classList.contains('trainers__control--show') && positionLeftItem - 1 <= position.getMin) {
          sliderControlLeft.classList.remove('trainers__control--show');
        }
        positionLeftItem--;
        transform += step;
      }
      sliderMenu.style.transform = 'translateX(' + transform + '%)';
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (e) {
      if (e.target.classList.contains('trainers__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('trainers__control--right') ? 'right' : 'left';
        if (sectionWidth >= 1200) {
          transformItem(direction);
          transformItem(direction);
          transformItem(direction);
          transformItem(direction);
        }
        if (sectionWidth >= 768) {
          transformItem(direction);
          transformItem(direction);
        }
        if (sectionWidth >= 320) {
          transformItem(direction);
        }
      }
    };

    var setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика controlClick для событя click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    };

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    };
  };
}());

var trainers = multiItemSlider('.trainers');
