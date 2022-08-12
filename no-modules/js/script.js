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

    //раскрытие аккордеонов:
    let accordionToggles = $('.accordion__head, .accordion__toggle');

    accordionToggles.on('click', function(e) {
        e.preventDefault();
        console.log(e.target);

        let step = $(this).closest('.accordion'),
            accordions = step.parent('.accordions').children();

        if (step.hasClass('open')) {
            step.removeClass('open');
            step.find('.accordion__body').slideUp(200);
        } else if (!step.hasClass('open')) {
            accordions.removeClass('open');
            accordions.find('.accordion__body').slideUp(200);
            step.addClass('open');
            step.find('.accordion__body').slideDown(200);
        }

        return false;
    });

    //слайдер с партнерами:
    let partnersSlider = $('.partners__slider');

    if (partnersSlider.length) {
        partnersSlider.slick({
            speed: 200,
            dots: true,
            swipeToSlide: true,
            touchThreshold: 200,
            prevArrow: partnersSlider.parents('.partners').find('.partners__nav-btn--prev'),
            nextArrow: partnersSlider.parents('.partners').find('.partners__nav-btn--next'),
            appendDots: partnersSlider.parents('.partners').find('.partners__slider-dots'),
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 6,
                }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 5,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4,
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

    //модалки:
    let popupCallBtn = $('[data-modal-id]'),
        crmPopupCloseBtn = $('.new-modal__close, .new-modal__success-btn, .portfolio-detail__back-btn'),
        crmPopupBackdrop = $('.new-modal__backdrop');

    const openNewModal = function (btn) {
        let hashAddress = btn.data('modal-id');

        $(hashAddress).show();
        body.addClass('modal-open');
    }

    const closeNewModal = function (btn) {
        btn.closest('.new-modal').hide();
        body.removeClass('modal-open');
    }

    popupCallBtn.on('click', function(e) {
        if ($('.new-modal:visible').length) {
            $('.new-modal').hide();
        }

        e.preventDefault();
        openNewModal($(this));

        if ($('.new-modal:visible .slick-initialized').length) {
            $('.new-modal:visible .slick-initialized').slick('unslick').slick(portfolioDetailSliderSettings());
        }
    });

    crmPopupCloseBtn.on('click', function(e) {
        e.preventDefault();
        closeNewModal($(this));
    });

    crmPopupBackdrop.on('click', function(e) {
        let backdrop = $(this);

        if (!$('.new-modal__content').is(e.target) && $('.new-modal__content').has(e.target).length === 0) {
            closeNewModal(backdrop);
        }
    });

    //имитация submit'а формы в модалке:
    let modalForm = $('.new-modal__form');

    modalForm.on('submit', function(e) {
        e.preventDefault();
        $(this).hide();
        $(this).parent().children('.new-modal__success').show();
    });

    //слайдер в модалке портфолио:
    let portfolioDetailSlider = $('.portfolio-detail__slider'),
        portfolioDetailSliderSettings = function getSliderSettings() {
        return {
            infinite: true,
            speed: 200,
            dots: true,
            swipeToSlide: true,
            touchThreshold: 200,
            prevArrow: portfolioDetailSlider.parent().find('.portfolio-detail__slider-nav-btn--prev'),
            nextArrow: portfolioDetailSlider.parent().find('.portfolio-detail__slider-nav-btn--next'),
            appendDots: portfolioDetailSlider.parent().find('.portfolio-detail__slider-nav-dots'),
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    };

    if (portfolioDetailSlider.length) {
        portfolioDetailSlider.slick(portfolioDetailSliderSettings());
    }

    //раскрытие фильтров на странице "поортфолио":
    let filterHeads = $('.new-filters__filter-head'),
        filters = $('.new-filters__filter');

    filterHeads.on('click', function() {
        let filter = $(this).closest('.new-filters__filter');

        if (filter.hasClass('new-filters__filter--open')) {
            filter.removeClass('new-filters__filter--open');
            if ($(window).width() <= 575) {
                body.removeClass('modal-open');
            }
        } else {
            filter.addClass('new-filters__filter--open');
            if ($(window).width() <= 575) {
                body.addClass('modal-open');
            }
        }
    });

    filters.each(function() {
        let filter = $(this);

        body.on('mousedown', function(e) {
            if (filter.hasClass('new-filters__filter--open')) {
                if (!filter.is(e.target) && filter.has(e.target).length === 0) {
                    filter.removeClass('new-filters__filter--open');
                    if ($(window).width() <= 575) {
                        body.removeClass('modal-open');
                    }
                }
            }
        });
    });

    //выбор и отмена выбора опций в фильтроах на странице "портфолио":
    let optionLabels = $('.new-filters__option-label');

    optionLabels.on('click', function(e) {
        let optionCheckbox = $(this).closest('.new-filters__option').find('input[type="checkbox"]'),
            removeSelectionBtn = $(this).find('.new-filters__option-label-reset');

        if (optionCheckbox.prop('checked') == true) {
            if (!removeSelectionBtn.is(e.target) && removeSelectionBtn.has(e.target).length === 0) {
                e.preventDefault();
            }
        }
    });

    //кастомный scrollbar в выпадающем списке опций в фильтре:
    $('.new-filters__filter-options').overlayScrollbars({});

    //отметка фильтра с выбранными/снятыми значениями в портфолио:
    let filterCheckboxes = $('.new-filters__option-checkbox'),
        filtersResetBtn = $('.new-filters__reset'),
        allFilters = $('.new-filters'),
        allFilterCheckboxes = allFilters.find('.new-filters__option-checkbox');

    const renewFilterSelection = function(element) {
        let filterBlock = element.closest('.new-filters__filter'),
            thisFilterCheckboxes = filterBlock.find('.new-filters__option-checkbox'),
            selected = false;

        thisFilterCheckboxes.each(function() {
            if ($(this).is(':checked')) {
                selected = true;
            }
        });

        if (selected == true) {
            filterBlock.addClass('new-filters__filter--selected');
        } else {
            filterBlock.removeClass('new-filters__filter--selected');
        }

        ifResetBtnNeedsToBeSeen();
    }

    const ifResetBtnNeedsToBeSeen = function() {
        let somethingIsChecked = false;

        allFilterCheckboxes.each(function() {
            if ($(this).is(':checked')) {
                somethingIsChecked = true;
            }
        });

        if (somethingIsChecked) {
            filtersResetBtn.show();
        } else {
            filtersResetBtn.hide();
        }
    }

    filterCheckboxes.on('change', function() {
        renewFilterSelection($(this));
    });

    filterHeads.each(function () {
        renewFilterSelection($(this));
    });

    //сброс фильтов в портфолио по кнопке reset:
    filtersResetBtn.on('click', function(e) {
        e.preventDefault();
        allFilterCheckboxes.prop('checked', false);
        filters.removeClass('new-filters__filter--selected');
        $(this).hide();

    });
});

$(window).on('load scroll', function() {
    let header = $('.refresh-header'),
        main = $('main');

    if (!header.hasClass('fixed')) {
        let headerHeight = header.outerHeight(),
            scrollFromTop = $(document).scrollTop();

        if (scrollFromTop > headerHeight) {
            header.addClass('fixed');
            main.css('paddingTop', headerHeight);
        }
    } else {
        let mainPaddingTop = parseInt(main.css('paddingTop')),
            scrollFromTop = $(document).scrollTop();

        if (scrollFromTop < mainPaddingTop) {
            header.removeClass('fixed');
            main.css('paddingTop', 0);
        }
    }
});

$(window).on('load resize', function() {
    let bannerZoneDescription = $('.banner-zone__description--service'),
        portfolioSlideImg = $('.portfolio__slide-img');

    if ($(window).width() <= 767) {
        //текст под баннером на странице услуги:
        if (bannerZoneDescription.length) {
            bannerZoneDescription.readmore({
                speed: 200,
                collapsedHeight: 50,
                heightMargin: 10,
                moreLink: '<a class="banner-zone__description-expand closed" href="javascipt:;">Читать полностью</a>',
                lessLink: '<a class="banner-zone__description-expand open" href="javascipt:;">Свернуть</a>',
            });
        }

        //автоподмена картинок в блоке портфолио:
        if (portfolioSlideImg.length) {
            portfolioSlideImg.each(function() {
                let portfolioSlideImgMobSrc = $(this).data('mobile-src');
                $(this).attr('src', portfolioSlideImgMobSrc);
            });
        }
    } else {
        //текст под баннером на странице услуги:
        if (bannerZoneDescription.length) {
            bannerZoneDescription.readmore('destroy');
        }

        //автоподмена картинок в блоке портфолио:
        if (portfolioSlideImg.length) {
            portfolioSlideImg.each(function() {
                let portfolioSlideImgDeskSrc = $(this).data('desktop-src');
                $(this).attr('src', portfolioSlideImgDeskSrc);
            });
        }
    }
});
