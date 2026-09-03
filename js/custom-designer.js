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

  // Initialize Swiper
  var swiper = new Swiper('.marquee-swiper', {
    spaceBetween: 60,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
  });

  const marqueeEl = document.querySelector('.marquee-swiper');

  marqueeEl.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
  });

  marqueeEl.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
  });

  var swiper = new Swiper('.testimonial__swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    freeMode: true,
    slideToClickedSlide: true,
    runCallbacksOnInit: true,
    pagination: {
      el: '.testimonial__pagination',
      clickable: true,
    },
  });

  const reviewModal = document.getElementById('reviewVideoModal');
  const reviewVideo = document.getElementById('reviewVideo');

  reviewModal.addEventListener('shown.bs.modal', function () {
    reviewVideo.currentTime = 0;
    reviewVideo.play();
  });

  reviewModal.addEventListener('hidden.bs.modal', function () {
    reviewVideo.pause();
    reviewVideo.currentTime = 0;
  });

  const approachContents = document.querySelectorAll(
    '.stillpoint__approach__sec .approach__item',
  );

  function updateActiveApproach() {
    const viewportCenter = window.innerHeight / 2;

    let closestContent = null;
    let closestDistance = Infinity;

    approachContents.forEach((content) => {
      const rect = content.getBoundingClientRect();

      const contentCenter = rect.top + rect.height / 2;

      const distance = Math.abs(viewportCenter - contentCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestContent = content;
      }
    });

    // Remove active from all
    approachContents.forEach((content) => {
      content.classList.remove('active');
    });

    // Add active only to closest center content
    if (closestContent) {
      closestContent.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveApproach);
  window.addEventListener('resize', updateActiveApproach);

  updateActiveApproach();
});

jQuery(document).ready(function ($) {
  var $section = $('#returnWithin');

  if (!$section.length) return;

  var $triggers = $section.find('.return-within__trigger');

  var $images = $section.find('.return-within__image');

  var $number = $section.find('.return-within__number');

  var $title = $section.find('.return-within__title');

  var $description = $section.find('.return-within__description');

  var $circleTitle = $section.find('.return-within__circle-title');

  var activeIndex = -1;

  var ticking = false;

  function changeContent(index) {
    if (index === activeIndex) return;

    activeIndex = index;

    var $trigger = $triggers.eq(index);

    var number = $trigger.data('number');

    var title = $trigger.data('title');

    var description = $trigger.data('description');

    $section.find('.return-within__text').css({
      opacity: 0,
      transform: 'translateY(10px)',
    });

    setTimeout(function () {
      $number.text(number);

      $title.text(title);

      $description.text(description);

      $circleTitle.text(title);

      $section.find('.return-within__text').css({
        opacity: 1,
        transform: 'translateY(0)',
      });
    }, 150);

    $images.removeClass('is-active');

    $images.eq(index).addClass('is-active');
  }

  function updateScroll() {
    ticking = false;

    // if (window.innerWidth <= 991) return;

    var viewportHeight = window.innerHeight;

    var newIndex = 0;

    $triggers.each(function (index) {
      var rect = this.getBoundingClientRect();

      if (rect.top < viewportHeight * 0.5) {
        newIndex = index;
      }
    });

    changeContent(newIndex);
  }

  $(window).on('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);

      ticking = true;
    }
  });

  $(window).on('resize', function () {
    updateScroll();
  });
  changeContent(0);
  updateScroll();
});
