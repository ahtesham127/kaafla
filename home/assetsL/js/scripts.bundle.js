"use strict";

class GoogleMap {

    constructor() {
        this.GOOGLE_API_KEY = 'YOUR_API_KEY';
        this.GOOGLE_MAP_STYLES = [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#1C191A"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ];
        this.markerIcon = 'assets/images/marker.svg';

        this.DOM_ELEMENT;
        this.marker;
        this.map;
    }

    /*!
     * Initialize google map
     * Basic plugin: Google map
     *---------------------------------------------------*/
    initGoogleMap(latLng) {
        this.DOM_ELEMENT = document.getElementById('map');
        this.map = new google.maps.Map(this.DOM_ELEMENT, {
            zoom: 6,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative',

            // Google Map Style
            styles: this.GOOGLE_MAP_STYLES
        });

        this.setMarker(latLng);
        this.customZoomControl();
    }

    /*!
     * Set marker in map.
     *---------------------------------------------------*/
    setMarker(latLng) {
        var draggble = (this.DOM_ELEMENT.getAttribute('data-map-draggable') === 'true');

        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            draggable: draggble,
            icon: this.markerIcon
        });

        if (draggble) {
            setValueOfLatLng(latLng.lat, latLng.lng);
            google.maps.event.addListener(this.marker, 'dragend', function(event) {
                setValueOfLatLng(event.latLng.lat(), event.latLng.lng());
            });
        }

        // Set value in span
        function setValueOfLatLng(lat, lng) {
            var eleLat = document.getElementById('lat');
            var eleLng = document.getElementById('lng');

            eleLat.innerText = lat;
            eleLng.innerText = lng;
        }
    }

    /*!
     * Add custom zoom in & zoom out controls in map.
     *---------------------------------------------------*/
    customZoomControl(map = this.map) {
        var zoomControl = document.createElement('div');
        zoomControl.className = 'zoom-controls';
        zoomControl.style.zIndex = 1;

        // Set position & styles on zoom control
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(zoomControl);
        zoomControl.style.paddingLeft = '16px';
        zoomControl.style.paddingBottom = '6px';

        // Create map zoomIn elements
        var zoomInButton = document.createElement('div');
        zoomInButton.className = "zoom";
        var zoomInIcon = document.createElement('i');
        zoomInIcon.className = 'ion-ios-add';
        zoomInButton.appendChild(zoomInIcon);
        zoomControl.appendChild(zoomInButton);

        // Create map zoomOut elements
        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "zoom";
        var zoomOutIcon = document.createElement('i');
        zoomOutIcon.className = 'ion-ios-remove';
        zoomOutButton.appendChild(zoomOutIcon);
        zoomControl.appendChild(zoomOutButton);

        // Setup the click event listener - zoomIn
        google.maps.event.addDomListener(zoomInButton, 'click', function() {
            map.setZoom(map.getZoom() + 1);
        });

        // Setup the click event listener - zoomOut
        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            map.setZoom(map.getZoom() - 1);
        });
    }
}
"use strict";

//=> Class Definition
var WebConfig = WebConfig || {};

// Global variables
var $window = $(window);
var $body = $('body');
var $loader = $('#loading');
var $header = $('#header');

// Auto discover dropzone
Dropzone.autoDiscover = false;

$(function () {
    WebConfig = {
        //=> Initialize function to call all functions of the class
        init: function () {
            WebConfig.initAppScrollbars();
            WebConfig.replaceRetinaImages();
            WebConfig.scrollAnimation();
            WebConfig.scrollToElement();
            WebConfig.searchForm();
            WebConfig.initOwl();
            WebConfig.testimonialsOwl();
            WebConfig.wowAnimationInit();
            WebConfig.showPassword();
            WebConfig.nestedModals();
            WebConfig.workSteps();
            WebConfig.scrollCounter();
            WebConfig.listSidebarFilter();
            WebConfig.stickyListSidebar();
            WebConfig.initDateTimePicker();
            WebConfig.initRating();
            WebConfig.initDropzone();
            WebConfig.pricingForm();
            WebConfig.imageGrid();
        },

        /*!
         * Initialize website scrollbars
         *---------------------------------------------------*/
        initAppScrollbars: function () {
            $('[data-scrollable="true"]').each(function () {
                var el = $(this);
                var height = el.data('height');
                if (height) {
                    el.css('max-height', height);
                }
                WebConfig.initPerfectScrollbar(this);
            });
        },

        /*!
         * Initialize ps scrollbar
         * Basic plugin: PerfectScrollbar
         *---------------------------------------------------*/
        initPerfectScrollbar: function (element) {
            var ps = new PerfectScrollbar(element, {
                wheelPropagation: false,
                minScrollbarLength: 40,
                suppressScrollX: true
            });
        },

        /*!
         * Replace normal images with 2x images
         * For that you have add retina class on the particular
         * image which you want to replace
         *---------------------------------------------------*/
        replaceRetinaImages: function () {
            if (window.devicePixelRatio > 1) {
                var $images = $('.retina');
                var $scrollImage = $('[data-image-src]');

                $images.each(function () {
                    var $this = $(this);
                    var oldSrc = $this.attr('src');

                    //
                    // Replace 1x image with 2x
                    // Ex: hero.png replace with hero@2x.png
                    //
                    var newSrc = oldSrc.replace(".", "@2x.");

                    //
                    // Assign new 2x src to the image
                    //
                    $this.attr('src', newSrc);
                });

                $scrollImage.each(function () {
                    var $this = $(this);
                    var oldSrc = $this.data('image-src');

                    //
                    // Replace 1x image with 2x
                    // Ex: hero.png replace with hero@2x.png
                    //
                    var newSrc = oldSrc.replace(".", "@2x.");

                    //
                    // Assign new 2x src to the image
                    //
                    $this.attr('data-image-src', newSrc);
                    $this.css('background-image', "url(" + newSrc + ")");
                });
            }
        },

        /*!
         * Adding and removing class on elements on scroll
         *---------------------------------------------------*/
        scrollAnimation: function () {
            var $scrollTop = $('.scroll-top');
            var introHeight = $window.height();

            $header.toggleClass('scrolled', $window.scrollTop() > 80);
            $scrollTop.toggleClass('show', $window.scrollTop() > introHeight);
        },

        /*!
         * Clicking on element scroll to element
         *---------------------------------------------------*/
        scrollToElement: function () {
            $('.target').on('click', function() {
                WebConfig.scrollToID(this);
            });
        },

        /*!
         * Get ID for url & scroll to element
         *---------------------------------------------------*/
        scrollToID(_this, top = 0) {
            if (location.pathname.replace(/^\//,'') === _this.pathname.replace(/^\//,'') &&
                location.hostname === _this.hostname) {
                var target = $(_this.hash);
                target = target.length ? target : $('[name=' + _this.hash.slice(1) +']');

                var scrollValue = target.offset().top - top;
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: scrollValue
                    }, 500);
                    return false;
                }
            }
        },

        /*!
         * Search form functionality
         *---------------------------------------------------*/
        searchForm: function () {
            var $dropdownItem = $('.search-input .dropdown-item');

            $dropdownItem.on('click', function () {
                var $this = $(this);
                var $input = $this.parent().parent().find('.form-control');
                var text = $this.text();

                $input.val(text);
            });
        },

        /*!
         * Initialize website owl carousel
         * Basic plugin: Owl carousel
         *---------------------------------------------------*/
        initOwl: function () {
            var $categories = $('#categories');
            if ($categories.length) {
                $categories.owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    autoplay: true,
                    responsive:{
                        0: { items: 1 },
                        420: { items: 2 },
                        580: { items: 3 },
                        992: { items: 4 },
                        1200: { items: 5 }
                    }
                })
            }

            var $imagesList = $('#images_list');
            if ($imagesList.length) {
                $imagesList.owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: false,
                    dots: false,
                    center: true,
                    autoplay: true,
                    responsive:{
                        0: { items: 1 },
                        480: { items: 2 },
                        768: { items: 3 }
                    }
                });
            }
        },

        /*!
         * Initialize image grid
         * Basic plugin: Masonry
         *---------------------------------------------------*/
        imageGrid: function () {
            var $grid = $('.image-grid');
            if ($grid.length) {
                var $imgGrid = $grid.imagesLoaded( function() {
                    $imgGrid.masonry({
                        percentPosition: true,
                        itemSelector: '.image-grid-item',
                    });
                });
            }
        },

        /*!
         * Initialize testimonial owl carousel & sync to carousel
         * Basic plugin: Owl carousel
         *---------------------------------------------------*/
        testimonialsOwl: function () {
            var sync1 = $("#testimonials");
            var sync2 = $("#testimonial_thumb");
            var slidesPerPage = sync2.find('.owl-item').length; //globaly define number of elements per page
            var syncedSecondary = true;

            if (sync1.length === 0 || sync2.length === 0) {
                return false;
            }

            sync1.owlCarousel({
                margin: 10,
                items: 1,
                slideSpeed: 2000,
                nav: true,
                autoplay: false,
                dots: false,
                loop: true,
                responsiveRefreshRate: 200,
                navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
            }).on('changed.owl.carousel', syncPosition);

            sync2.on('initialized.owl.carousel', function() {
                    sync2.find(".owl-item").eq(0).addClass("current");
                }).owlCarousel({
                    margin: 5,
                    items: slidesPerPage,
                    dots: false,
                    nav: false,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    mouseDrag: false,
                    responsiveRefreshRate: 100
                }).on('changed.owl.carousel', syncPosition2);

            function syncPosition(el) {
                //if you set loop to false, you have to restore this next line
                //var current = el.item.index;

                //if you disable loop you have to comment this block
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }

                //end block

                sync2.find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                var onscreen = sync2.find('.owl-item.active').length - 1;
                var start = sync2.find('.owl-item.active').first().index();
                var end = sync2.find('.owl-item.active').last().index();

                if (current > end) {
                    sync2.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    sync2.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
                if (syncedSecondary) {
                    var number = el.item.index;
                    sync1.data('owl.carousel').to(number, 100, true);
                }
            }

            sync2.on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = $(this).index();
                sync1.data('owl.carousel').to(number, 300, true);
            });
        },

        /*!
         * Initialize website wow animation
         * Basic plugin: Wow
         *---------------------------------------------------*/
        wowAnimationInit: function () {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated'
            });
            wow.init();
        },

        /*!
         * Show/Hide password text
         *---------------------------------------------------*/
        showPassword: function () {
            $('.icon-eye').on('click', function() {
                var $this = $(this);
                var $pwd = $this.prev();
                var none = 'd-none';
                var $open = $this.find('.eye-open');
                var $close = $this.find('.eye-close');

                $(this).toggleClass('active');
                if( $pwd.attr('type') === 'password' ) {
                    $pwd.attr('type', 'text');
                    $open.addClass(none);
                    $close.removeClass(none);
                } else {
                    $pwd.attr('type', 'password');
                    $open.removeClass(none);
                    $close.addClass(none);
                }
            });
        },

        /*!
         *  For nested modals
         * ------------------------------------------------------------ */
        nestedModals: function () {
            $(document).on('hidden.bs.modal', function() {
                if ($('.modal:visible').length) {
                    $body.addClass('modal-open');
                    if ($window.width() > 1200) {
                        $body.css('padding-right', '17px');
                    }
                }
            });
        },

        /*!
         * Initialize work step owl carousel for mobile
         * Basic plugin: Owl carousel
         *---------------------------------------------------*/
        workSteps: function () {
            var $steps = $('#work_steps');
            var workStep = 'work-step';

            if ($steps.length === 0) {
                return false;
            }

            if (Utils.breakpoints('lg') > $window.width()) {
                var steps = $steps.find('.' + workStep);
                var owlHTML = '';

                $steps.removeClass('row').addClass('owl-carousel owl-theme');
                $.each(steps, function (index, step) {
                    owlHTML += '<div class="item"><div class="'+ workStep +'">'
                    owlHTML += step.innerHTML;
                    owlHTML += '</div></div>'
                });

                $steps.html(owlHTML);
                if ($steps.hasClass('owl-theme')) {
                    $steps.owlCarousel({
                        items: 1,
                        loop: true,
                        margin: 30,
                        nav: false,
                        autoplay: true
                    });
                }
            }
        },

        /*!
         * On scroll increase numeric value
         *---------------------------------------------------*/
        scrollCounter: function () {
            var counted = 0;
            var $counter = $('#counter');

            if ($counter.length === 0) {
                return false;
            }

            $window.scroll(function() {
                var topOffset = $counter.offset().top - window.innerHeight;
                if (counted === 0 && $window.scrollTop() > topOffset) {
                    $('.count').each(function() {
                        var $this = $(this),
                            countTo = $this.attr('data-count');
                        $({
                            countNum: $this.text()
                        }).animate({
                                countNum: countTo
                            },
                            {
                                duration: 2000,
                                easing: 'swing',
                                step: function() {
                                    $this.text(Math.floor(this.countNum));
                                },
                                complete: function() {
                                    $this.text(this.countNum);
                                }
                            });
                    });
                    counted = 1;
                }
            });
        },

        /*!
         * Initialize on ui range for sidebar filter
         * Basic plugin: No UI Slider
         *---------------------------------------------------*/
        listSidebarFilter: function () {
            var locationRange = 'location_range';
            if ($('#' + locationRange).length) {
                var rangeSlider1 = document.getElementById(locationRange);
                noUiSlider.create(rangeSlider1, {
                    start: [10],
                    connect: [true, false],
                    step: 1,
                    range: {
                        'min': [0],
                        'max': [30]
                    }
                });

                var locationSliderValueElement = document.getElementById('location');
                rangeSlider1.noUiSlider.on('update', function (values, handle) {
                    locationSliderValueElement.innerHTML = parseInt(values[handle]) + 'km';
                });
            }

            var priceRange = 'price_range';
            if ($('#' + priceRange).length) {
                var rangeSlider2 = document.getElementById(priceRange);
                noUiSlider.create(rangeSlider2, {
                    start: [20, 40],
                    step: 1,
                    connect: [false, true, false],
                    range: {
                        'min': [0],
                        'max': [100]
                    }
                });

                var priceSliderValueElement = document.getElementById('price');
                rangeSlider2.noUiSlider.on('update', function (values, handle) {
                    priceSliderValueElement.innerHTML = '$' + parseInt(values[0]) + ' - ' + '$' + parseInt(values[1]);
                });
            }
        },

        /*!
         * Sticky sidebar for listing details
         * Basic plugin: Scroll to Fixed
         *---------------------------------------------------*/
        stickyListSidebar: function () {
            var $listingLinkSidebar = $('#listing_link_sidebar');
            var $listingContent = $('#listing_content');
            var limit = $listingContent.height() + $('#intro_section').outerHeight() - 80;
            var top = $('#header').height() + 30;
            var active = 'active';

            if ($listingLinkSidebar.length) {
                $listingLinkSidebar.scrollToFixed({
                    marginTop: top,
                    limit: limit,
                    dontSetWidth: true,
                    removeOffsets: true
                });

                var $listingLink = $('#listing_link .listing-link');
                // Clicking on element toggle active class
                $listingLink.on('click', function (e) {
                    e.stopPropagation();
                    var $this = $(this);

                    $listingLink.removeClass(active);
                    $this.addClass(active);
                    WebConfig.scrollToID(this, top);
                });

                // Window scrolling adding/removing active class
                $window.on('scroll', function () {
                    var $elements = $('#listing_content > div[id]');
                    var scrollDistance = $(window).scrollTop();

                    $elements.each(function (i) {
                        var $this = $(this);
                        if ($this.position().top - 2 <= scrollDistance) {
                            $listingLink.removeClass(active);
                            $listingLink.eq(i).addClass(active);
                        }
                    });
                });
            }
        },

        /*!
         * Initialize date time picker
         * Basic plugin: Date time picker
         *---------------------------------------------------*/
        initDateTimePicker: function () {
            var $date = $('.date-time-picker');
            var $time = $('.time-picker');
            var open = 'open';
            var calendar = 'calendar-view';
            var time = 'time-view';

            if ($date.length) {
                // Set date time picker
                $date.datetimepicker({
                    icons: {
                        time: 'ion-ios-clock',
                        date: 'ion-ios-calendar',
                        up: "ion-ios-arrow-up",
                        down: "ion-ios-arrow-down",
                        next: 'ion-ios-arrow-forward',
                        previous: 'ion-ios-arrow-back',
                        today: 'ion-ios-today',
                        clear: 'ion-ios-trash',
                        close: 'ion-ios-remove'
                    }
                });

                // Customize date time picker on input focua
                $date.on('focus', function () {
                    var $this = $(this);
                    var $widget = $this.next();
                    var $collapse = $widget.find('.collapse');
                    var $toggle = $widget.find('[data-action="togglePicker"');

                    $collapse.removeClass('in');
                    $collapse.eq(0).addClass(open);
                    $toggle.addClass(calendar);
                    $toggle.html('Select time');

                    $toggle.on('click', function () {
                        var _this = $(this);

                        $collapse.removeClass(open);
                        if (_this.hasClass(calendar)) {
                            $collapse.eq(1).addClass(open);
                            _this.addClass(time).removeClass(calendar);
                            $toggle.html('Select date');
                        } else {
                            $collapse.eq(0).addClass(open);
                            _this.addClass(calendar).removeClass(time);
                            $toggle.html('Select time');
                        }
                    });
                });
            }

            if ($time.length) {
                // Set time picker
                $time.datetimepicker({
                    format: 'LT',
                    icons: {
                        time: 'ion-ios-clock',
                        date: 'ion-ios-calendar',
                        up: "ion-ios-arrow-up",
                        down: "ion-ios-arrow-down",
                        next: 'ion-ios-arrow-forward',
                        previous: 'ion-ios-arrow-back',
                        today: 'ion-ios-today',
                        clear: 'ion-ios-trash',
                        close: 'ion-ios-remove'
                    }
                });
            }
        },

        /*!
         * Initialize star for rating
         * Basic plugin: Stars
         *---------------------------------------------------*/
        initRating: function () {
            var $rating = $('.rating');

            if ($rating.length) {
                $rating.stars({
                    stars: 5,
                    emptyIcon  : 'ion-md-star-outline',
                    filledIcon : 'ion-md-star',
                    color: Utils.colors('warning')
                });
            }
        },

        /*!
         * Initialize work step owl carousel for mobile
         * Basic plugin: Owl carousel
         *---------------------------------------------------*/
        initDropzone: function () {
            var $dropify = $('.dropzone');

            if ($dropify.length) {
                var drop = new Dropzone(".dropzone", {});
            }
        },

        /*!
         * Pricing form
         * Basic plugin: jQuery Repeater, jQuery UI
         *---------------------------------------------------*/
        pricingForm: function () {
            var $repeater = $('.repeater');

            if ($repeater.length) {
                $repeater.repeater();
                $('#price_form_list').sortable({
                    forcePlaceholderSize: true,
                    forceHelperSize: false,
                    placeholder : 'sortableHelper',
                    zIndex: 999990,
                    opacity: 0.6,
                    tolerance: "pointer",
                    start: function(e, ui ){
                        ui.placeholder.height(ui.helper.outerHeight());
                    }
                });
            }
        }
    };

    //=> Call class at document ready
    $(document).ready(WebConfig.init);

    //=> Window resize
    $window.on('resize', function () {
        WebConfig.scrollAnimation();
    });

    //=> On scroll animation
    $window.on('scroll', function () {
        WebConfig.scrollAnimation();
    });

});

//=> Loader
$window.on('load', function () {
    $body.addClass('loaded');
    $loader.fadeOut(1000);
    $('.pswp').removeClass().addClass('pswp');
});

"use strict";

//=> Class Definition
var Sidebar = Sidebar || {};

// Global variables
var $body = $('body');

$(function () {
    Sidebar = {
        //=> Initialize function to call all functions of the class
        init: function () {
            Sidebar.openSidebar();
            Sidebar.sidebarNavigation();
        },

        /*!
         * Open and close sidebar
         *---------------------------------------------------*/
        openSidebar: function () {
            var $hamburger = $('#hamburger');
            var openSidebar = 'open-sidebar';
            var closeSidebar = '#close_sidebar';
            var overlay = '<div id="overlay"></div>'

            Sidebar.appendSidebar();

            $hamburger.on('click', function () {
                $body.addClass(openSidebar);
                $body.append(overlay);
            });

            $body.on( 'click', closeSidebar, function () {
                $body.removeClass(openSidebar);
                $('#overlay').remove();
                $body.find('#sidebar').find('.show > .nav-sub-menu').slideUp(350);
                $('.nav-has-sub').removeClass('show');
            });
        },

        /*!
         * Show and hide navigation on click
         *---------------------------------------------------*/
        sidebarNavigation: function () {
            var navLink = '.nav-has-sub > a';
            var $sidebar = $('#sidebar');
            var nav = '#sidebar > #nav';
            var show = 'show';
            $sidebar.find('.show > .nav-sub-menu').slideDown(350);

            if ($sidebar.length) {
                WebConfig.initPerfectScrollbar(nav);
            }

            $body.on('click', navLink, function (e) {
                e.stopPropagation();
                var $this = $(this);

                if ($this.parent().hasClass(show)) {
                    $this.parent().removeClass(show);
                    $this.next().slideUp(350);
                } else {
                    $this.parent().parent().find('.show > .nav-sub-menu').slideUp(350);
                    $('.nav-has-sub').removeClass(show);
                    $this.parent().addClass(show);
                    $this.next().slideToggle(350);
                }
            });
        },

        /*!
         * Header navigation set in sidebar for mobile view
         *---------------------------------------------------*/
        appendSidebar: function () {
            var $sidebar = $('#sidebar');
            var $headerNav = $('#header #nav');

            if ($sidebar.length === 0 && $headerNav.length && Utils.breakpoints('xl') > $window.width()) {
                var sidebarHTML = '<aside id="sidebar">' +
                    '<div class="sidebar-header">' +
                    '<a href="javascript:void(0);" id="close_sidebar">&times;</a>' +
                    '</div>' +
                    '<nav id="nav">';
                sidebarHTML += $headerNav.html();
                sidebarHTML += '</nav></aside>';
                $('#wrapper').append(sidebarHTML);
                $body.find('#sidebar').find('ul').removeClass('navbar-nav').find('a').removeAttr('class');
                WebConfig.initPerfectScrollbar('#nav');
            }
        }
    };

    //=> Call class at document ready
    $(document).ready(Sidebar.init);
});

//=> Window resize
$window.on('resize', function () {
    Sidebar.appendSidebar();
});
"use strict";

//=> Class Definition
var Utils = Utils || {};

$(function () {
    Utils = {

        // Chart js global variables
        CHART_GRID_LINE_COLOR: '#E4E9EC',
        CHART_JS_AXES_PADDING: 10,
        CHART_JS_BORDER_DASH: [8, 8],

        /*!
         * Colors function return app colors
         * @color
         *---------------------------------------------------*/
        colors: function (color) {
            if (color && colors[color]) {
                return colors[color];
            }
        },

        /*!
         * Breakpoints function return app breakpoint value
         * @breakpoint
         *---------------------------------------------------*/
        breakpoints: function(breakpoint) {
            if (breakpoint && breakpoints[breakpoint]) {
                return breakpoints[breakpoint];
            }
        },

        /*!
         * Datepicker arrows function return arrow template
         *---------------------------------------------------*/
        datepickerArrows: function () {
            return {
                leftArrow: '<i class="ion-ios-arrow-back"></i>',
                rightArrow: '<i class="ion-ios-arrow-forward"></i>'
            };
        },

        /*!
         * Timepicker arrows function return arrow template
         *---------------------------------------------------*/
        timepickerArrows: function () {
            return {
                up: 'ion-ios-arrow-up',
                down: 'ion-ios-arrow-down'
            };
        }
    };

    //=> Utils variables
    var colors = {
        primary:    '#8917E6',
        secondary:  '#646162',
        success:    '#7acb00',
        info:       '#165be6',
        warning:    '#ffd014',
        danger:     '#eb354e',
        light:      '#dfdddd',
        dark:       '#1C191A'
    };

    var breakpoints = {
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576,
        xs: 0
    };
});
