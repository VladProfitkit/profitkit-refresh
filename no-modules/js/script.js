$(document).ready(function() {
    let body = $('body'),
        mobileMenuOpenBtn = $('.refresh-header__mobile-menu-toggle'),
        mobileMenuCloseBtn = $('.refresh-header__mobile-menu-close'),
        mobileMenu = $('.refresh-header__mobile-menu-block');

    const openMobileMenu = function() {
        mobileMenu.addClass('open');
        body.css('overflow', 'hidden');
    }

    const closeMobileMenu = function() {
        mobileMenu.removeClass('open');
        body.css('overflow', 'visible');
    }

    mobileMenuOpenBtn.on('click', function() {
        openMobileMenu();
    });

    mobileMenuCloseBtn.on('click', function() {
        closeMobileMenu();
    });

    body.on('mousedown', function(e) {
        if (mobileMenu.hasClass('open')) {
            if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
                closeMobileMenu();
            }
        }
    });

    //слайдер портфолио:
    let protfolioSlider = $('.portfolio__slides');

    if (protfolioSlider.length) {
        protfolioSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
            let currentSlideSpan = protfolioSlider.parent().find('.portfolio__nav-counter-current'),
                totalSlidesSpan = protfolioSlider.parent().find('.portfolio__nav-counter-total'),
                currentSlideNumber = (currentSlide ? currentSlide : 0) + 1,
                totalSlidesNumber = slick.slideCount;

            currentSlideSpan.text(currentSlideNumber);
            totalSlidesSpan.text(totalSlidesNumber);
        });

        protfolioSlider.slick({
            speed: 200,
            infinite: false,
            variableWidth: true,
            swipeToSlide: true,
            touchThreshold: 200,
            prevArrow: protfolioSlider.parent().find('.portfolio__nav-btn--prev'),
            nextArrow: protfolioSlider.parent().find('.portfolio__nav-btn--next'),
        });
    }

    //слайдер с отзывами:
    let reviewsSlider = $('.clients-reviews__slider');

    if (protfolioSlider.length) {
        reviewsSlider.slick({
            dots: true,
            speed: 200,
            swipeToSlide: true,
            touchThreshold: 200,
            prevArrow: reviewsSlider.parents('.reviews-slider').find('.clients-reviews__nav-btn--prev'),
            nextArrow: reviewsSlider.parents('.reviews-slider').find('.clients-reviews__nav-btn--next'),
            appendDots: reviewsSlider.parents('.reviews-slider').find('.clients-reviews__slider-dots'),
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 5,
                }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  variableWidth: true,
                  arrows: false,
                  dots: false,
                }
              }
            ]
        });

        Fancybox.bind('[data-fancybox]', {

        });
    }
});

$(window).on('load resize', function() {
    let bannerZoneDescription = $('.banner-zone__description--service'),
        portfolioSlideImg = $('.portfolio__slide-img');

    if ($(window).width() <= 767) {
        //текст под баннером на странице услуги:
        bannerZoneDescription.readmore({
          speed: 200,
          collapsedHeight: 50,
          heightMargin: 10,
          moreLink: '<a class="banner-zone__description-expand closed" href="javascipt:;">Читать полностью</a>',
          lessLink: '<a class="banner-zone__description-expand open" href="javascipt:;">Свернуть</a>',
        });

        //автоподмена картинок в портфолио:
        portfolioSlideImg.each(function() {
          let portfolioSlideImgMobSrc = $(this).data('mobile-src');
          $(this).attr('src', portfolioSlideImgMobSrc);
        });
    } else {
        //текст под баннером на странице услуги:
        bannerZoneDescription.readmore('destroy');

        //автоподмена картинок в портфолио:
        portfolioSlideImg.each(function() {
          let portfolioSlideImgDeskSrc = $(this).data('desktop-src');
          $(this).attr('src', portfolioSlideImgDeskSrc);
        });
    }
});
