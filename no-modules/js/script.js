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
    }

    //инициализация fancybox:
    Fancybox.bind('[data-fancybox]', {});

    //цены на сайты, переключение на мобильных:
    let pricesSwitches = $('.prices-section__mobile-switch'),
        pricesBlocks = $('.prices-section__item');

    pricesSwitches.on('click', function(e) {
        e.preventDefault();

        let pressedPricesSwitch = $(this),
            blockId = pressedPricesSwitch.data('price-block');

        pricesSwitches.removeClass('active');
        pressedPricesSwitch.addClass('active');
        pricesBlocks.each(function() {
            if ($(this).data('price-block') == blockId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    //анимировакнная промотка к якорям:
    let anchorLinks = $('.anchors-header__menu-link');

    anchorLinks.on('click', function(e) {
        e.preventDefault();
        let link = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(link).offset().top
        }, 1000);
    });

    //раскрытие шагов в блоке "как мы работаем":
    let howWeWorkToggles = $('.how-we-work__step-head, .how-we-work__step-toggle'),
        howWeWorkSteps = $('.how-we-work__step');

    howWeWorkToggles.on('click', function(e) {
        e.preventDefault();
        console.log(e.target);

        let step = $(this).closest('.how-we-work__step');

        if (step.hasClass('open')) {
            step.removeClass('open');
            step.find('.how-we-work__step-body').slideUp(200);
        } else if (!step.hasClass('open')) {
            howWeWorkSteps.removeClass('open');
            howWeWorkSteps.find('.how-we-work__step-body').slideUp(200);
            step.addClass('open');
            step.find('.how-we-work__step-body').slideDown(200);
        }

        return false;
    });
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
