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
        body.css('overflow', false);
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
