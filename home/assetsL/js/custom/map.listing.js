"use strict";

//=> Global variables
var MapConfig = MapConfig || {};
var map;
var listing = [];
var markerList = [];
var Google = new GoogleMap();
var mapBox = new InfoBox();
var openInfoBox = 'open-infobox';
var $listingCard = $('#listing_data .listing-card');

//=> Class Definition
$(function () {
    MapConfig = {
        //=> Initialize function to call all functions of the class
        init: function () {
            MapConfig.generateListing();
            MapConfig.addCustomMarker();
            MapConfig.cardHoverIndicateMarker();
            MapConfig.markerGrouping();
            Google.customZoomControl(map);
        },

        /*!
         * Getting listing data form HTML page.
         * Generate list to bind in data in map
         *---------------------------------------------------*/
        generateListing: function () {
            // Get map data from HTML page script
            map = PageConfig.getMap();

            // Each loop for listing card & push in array
            $listingCard.each(function () {
                var $this = $(this);
                var lat = parseFloat($this.data('lat-lng').split(',')[0]);
                var lng = parseFloat($this.data('lat-lng').split(',')[1]);

                var list = {
                    image: $this.find('.listing-image img').attr('src'),
                    title: $this.find('.listing-title').text(),
                    url: $this.find('.listing-title').attr('href'),
                    description: $this.find('.listing-desc p').text(),
                    rating: $this.find('.listing-rating .listing-rating-number').text(),
                    starIcon: '<i class="ion-md-star"></i>',
                    latLng: {lat: lat, lng: lng},
                    markerIcon: $this.data('marker-icon')
                };

                list.html = addHTML(list);
                listing.push(list);
            });

            // Add HTML to list for bind in infobox
            function addHTML(list) {
                return '<div class="listing-map-container">' +
                    '<a href="javascript:void(0);" class="infoBox-close"><i class="ion-ios-close-circle"></i></a>' +
                    '<a href="'+ list.url +'" class="listing-map-image">' +
                    '<img src="'+ list.image +'" alt="'+ list.title +'">' +
                    '</a>' +
                    '<div class="listing-content">' +
                    '<div class="listing-content-head">' +
                    '<div class="listing-rating">' +
                    '<span class="listing-rating-number">' + list.rating + '</span>' + list.starIcon +
                    '</div>' +
                    '<div class="listing-desc">' +
                    '<a href="'+ list.url +'" class="listing-title text-truncate">' + list.title + '</a>' +
                    '<p>' + list.description + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div></div>';
            }
        },

        /*!
         * Add custom marker in map.
         *---------------------------------------------------*/
        addCustomMarker: function () {
            var show = 'show';
            var box = document.createElement("div");
            box.className = 'map-box';

            var currentInfobox;

            var boxOptions = {
                content: box,
                disableAutoPan: false,
                alignBottom : true,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-122, -25),
                zIndex: null,
                boxStyle: {
                    width: "280px"
                },
                closeBoxMargin: "0",
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(25, 25),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false,
            };

            for (var i = 0; i < listing.length; i++) {
                var position = new google.maps.LatLng(listing[i].latLng),
                    marker = new Marker(position, map, {marker: i}, listing[i].markerIcon);

                markerList.push(marker);

                google.maps.event.addDomListener(marker, 'click', (function(marker, i) {
                    return function (listener) {
                        mapBox.setOptions(boxOptions);
                        box.innerHTML = listing[i].html;
                        box.className = show;
                        mapBox.close();
                        mapBox.open(map, marker);
                        currentInfobox = i + 1;

                        google.maps.event.addListener(mapBox, 'domready', function () {
                            $('.infoBox-close').click(function (e) {
                                e.preventDefault();
                                mapBox.close();
                                $('.map-marker').removeClass(openInfoBox);
                            });

                        });

                    }
                })(marker, i));
            }
        },

        /*!
         * On hover of a list card linked the marker.
         * Show animation on marker
         *---------------------------------------------------*/
        cardHoverIndicateMarker: function () {
            var hover = 'hover-infobox';
            $listingCard.on('mouseover', function () {
                var $this = $(this);
                var markerId = $this.data('marker-id');

                if(markerId !== undefined) {
                    var active = markerList[markerId - 1].div;
                    $(active).addClass(hover);

                    $this.on('mouseout', function () {
                        $(active).removeClass(hover);
                    })
                }
            });
        },

        /*!
         * Cluster the marker group and showing calculation
         * of marker
         *---------------------------------------------------*/
        markerGrouping: function () {
            var markerStyles = [
                {
                    url: '',
                    height: 36,
                    width: 36
                }
            ];

            var options = {
                imagePath: 'images/',
                styles : markerStyles,
                minClusterSize : 2
            };

            var markerGroup = new MarkerClusterer(map, markerList, options);
            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }
    };

    //=> Call class at document ready
    $(document).ready(MapConfig.init);
});


//=> Constructor for marker
function Marker(latlng, map, marker, icon) {
    this.latlng = latlng;
    this.markerObj = marker;
    this.markerIcon = icon;
    this.setMap(map);
}

Marker.prototype = new google.maps.OverlayView();

//=> Google map prototype for draw
Marker.prototype.draw = function() {
    var _this = this;
    var div = this.div;
    if (!div) {
        div = this.div = document.createElement('div');
        div.className = 'map-marker';

        // Set HTML in map marker
        div.innerHTML = '<div class="marker-container">' +
            '<div class="marker-icon"><i class="'+ this.markerIcon +'"></i></div>' +
            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36px" height="48px" viewBox="0 0 36 48" enable-background="new 0 0 36 48" xml:space="preserve">' +
            '<path fill="#eb354e" d="M18,0C8.076,0,0,8.132,0,18.13C0,32.336,17.306,47.384,18,48c0.694-0.618,18-15.664,18-29.87C36,8.132,27.924,0,18,0z' +
            ' M18,28c-5.514,0-10-4.486-10-10S12.486,8,18,8c5.514,0,10,4.486,10,10S23.514,28,18,28z"/>' +
            '<circle class="marker-circle" cx="18" cy="18" r="15"/>' +
            '</svg>' +
            '</div>' +
            '<div class="marker-shadow"></div>';

        // Clicked marker highlight
        google.maps.event.addDomListener(div, "click", function(event) {
            $('.map-marker').removeClass(openInfoBox);
            google.maps.event.trigger(_this, "click");
            $(this).addClass(openInfoBox);
        });

        if (typeof(_this.markerObj.marker) !== 'undefined') {
            div.dataset.marker = _this.markerObj.marker;
        }

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    if (point) {
        div.style.left = (point.x) + 'px';
        div.style.top = (point.y) + 'px';
    }
}

Marker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null; $(this).removeClass(openInfoBox);
    }
};

Marker.prototype.getPosition = function() { return this.latlng; };




