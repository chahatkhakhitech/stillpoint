jQuery(document).ready(function ($) {
  var header = $('.header');
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 1) {
      header.addClass('header-sticky');
    } else {
      header.removeClass('header-sticky');
    }
  });

  loadSvgImages();

  function loadSvgImages() {
    $('img.svg').each(function () {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      if (typeof imgURL == 'undefined' || imgURL == '') {
        imgURL = $img.attr('mentall-data-src');
      }
      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find('svg');
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          $img.replaceWith($svg);
        },
        'xml',
      );
    });
  }

  var swiper = new Swiper('.industrial__carousel', {
    slidesPerView: 2.7,
    paginationClickable: true,
    loop: true,
    autoplay: true,
    spaceBetween: 30,
    freeMode: true,
    slideToClickedSlide: true,
    runCallbacksOnInit: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1366: {
        slidesPerView: 3,
      },
    },

    on: {
      init: function (sw) {
        $('.current-slide').html(sw.realIndex + 1);
        $('.total-slides').html(sw.slides.length);
      },
      slideChange: function (sw) {
        $('.current-slide').html(sw.realIndex + 1);
        $('.total-slides').html(sw.slides.length);
      },
    },
  });
});
