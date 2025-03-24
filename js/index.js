console.log('loading index.js file...')

// Initialize when document is ready
$(document).ready(function(){
  // Set up main desktop slider
  $('.slider-container').slick({
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="slick-next">Next</button>',
    lazyLoad: 'progressive',
    swipe: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ],
    customPaging: function(slider, i) {
      return '<button class="custom-dot"></button>';
    }
  });

  // Set up mobile slider with touch optimization
  $('.mobile-slider').slick({
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    lazyLoad: 'progressive',
    swipe: true,
    touchThreshold: 10,
    customPaging: function(slider, i) {
      return '<button class="custom-dot"></button>';
    }
  });

  // Handle content animations
  function animateContent($slide) {
    const elements = [
      '.country-name, .mobile-country-name',
      '.destination-title, .mobile-destination-title',
      '.description, .mobile-description',
      '.learn-more, .mobile-learn-more'
    ];
    
    elements.forEach((selector, index) => {
      setTimeout(() => {
        $slide.find(selector).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }, (index + 1) * 200);
    });
  }

  // Reset animations before changing slides
  $('.slider-container, .mobile-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    const $nextSlide = $(slick.$slides[nextSlide]);
    const elements = '.country-name, .destination-title, .description, .learn-more, .mobile-country-name, .mobile-destination-title, .mobile-description, .mobile-learn-more';
    
    $nextSlide.find(elements).css({
      'opacity': '0',
      'transform': 'translateY(20px)'
    });
  });

  // Start animations after slide change
  $('.slider-container, .mobile-slider').on('afterChange', function(event, slick, currentSlide) {
    const $currentSlide = $(slick.$slides[currentSlide]);
    animateContent($currentSlide);
  });

  // Add smooth hover effects
  $('.learn-more, .mobile-learn-more').hover(
    function() {
      $(this).css('transform', 'scale(1.05)');
    },
    function() {
      $(this).css('transform', 'scale(1)');
    }
  );

  // Trigger initial animations
  setTimeout(() => {
    $('.slick-current').each(function() {
      animateContent($(this));
    });
  }, 100);
});