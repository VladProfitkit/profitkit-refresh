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
});

$(window).on('load resize', function() {
    let bannerZoneDescription = $('.banner-zone__description--service');

    if ($(window).width() <= 767) {
        bannerZoneDescription.readmore({
          speed: 200,
          collapsedHeight: 50,
          heightMargin: 10,
          moreLink: '<a class="banner-zone__description-expand closed" href="javascipt:;">Читать полностью</a>',
          lessLink: '<a class="banner-zone__description-expand open" href="javascipt:;">Свернуть</a>',
        });
    } else {
        bannerZoneDescription.readmore('destroy');
    }
});
