// import external dependencies
import 'jquery';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());

$( document ).ready(function() {

  init();
  var slideIndex = 1;
  var interval = setInterval(() => plusSlides(1), 8000); // Change image every 2 seconds
  evaluate();

  function evaluate() {
    let desktopView = $( window ).width() > 730;

    if (desktopView) {
      console.log('desktop');
      $('.dot').each((i, el) => {
        $(el).show();
      });
      $('.prev').show();
      $('.next').show();

      showSlides(slideIndex);
      $('.dot-index').show();
      clearInterval(interval);
      interval = setInterval(() => plusSlides(1), 8000); // Change image every 2 seconds

    } else {
      clearInterval(interval);
      $('.dot').each((i, el) => {
        $(el).hide();
      });
      $('.prev').hide();
      $('.next').hide();
      $('.mySlides').each((i, el) => {
        $(el).show();
      });
      $('.dot-index').hide();
      console.log('mobile');
    }
  }

  $('.next').click(() => {
    clearInterval(interval);
    interval = setInterval(() => plusSlides(1), 8000); // Change image every 2 seconds
    plusSlides(1);
  });

  $('.prev').click(() => {
    clearInterval(interval);
    interval = setInterval(() => plusSlides(1), 8000); // Change image every 2 seconds
    plusSlides(-1);
  });

  function init(){
    $('.mySlides').each((index) => {
      $('.dots').append(`<span class="dot dot${index + 1}"></span>`);
    });
  }

  //Redraw canvases if window gets resized, limits calls to every 200ms
  var globalResizeTimer = null;

  $(window).resize(function() {
    if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(function() {
      evaluate();
    }, 200);
  });

  $('.dot').each((index, el) => {
     $(el).click(() => {
      currentSlide(index + 1);
      clearInterval(interval);
      interval = setInterval(() => plusSlides(1), 8000); // Change image every 2 seconds
      console.log('click');
     });
  });

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    const slides = $('.mySlides');
    const dots = $('.dot');
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    slides.each((index, el) => {
      $(el).css('display', 'none');
    });

    dots.each((index, el) => {
      $(el).removeClass('active');
    });

    next();

    function next(){
      slides.eq(slideIndex-1).show();
      dots.eq(slideIndex-1).addClass('active');
      $('.dot-index').text(`N˚${slideIndex}`);
    }
  }

  //Hamburger
  $('.hamburger').click(() => {
    $('.mobile-nav').toggleClass('active');
  });

  $(document).click(e => {
    const el = e.target.className;
    if (el === 'hamburger' || el === 'about' || el === 'github' ) return;
    $('.mobile-nav').removeClass('active');
  });

  //Footer
  const year = new Date().getFullYear();
  $('.footer-home-link').text('DERRICK BOZICH ' + year);
});
