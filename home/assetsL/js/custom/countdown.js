"use strict";

//=> Class Definition
var ComingSoonCountdown = ComingSoonCountdown || {};

$(function () {
    ComingSoonCountdown = {

        //=> Initialize function for countdown
        init: function () {
            if ($countdown.length === 0) {
                return false;
            }
            var todayDate = moment().startOf('day');

            // Countdown date replace with your date
            var COUNTDOWNDATE = todayDate.clone().add(30, 'day').format('MMM DD, YYYY h:mm:ss');
            var finalDate = new Date(COUNTDOWNDATE);

            $countdown.countdown(finalDate, function (event) {
                $(this).html(
                    event.strftime(
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%D</div>' +
                        '<span class="timer-text">Days</span>' +
                        '</div>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%H</div>' +
                        '<span class="timer-text">Hours</span>' +
                        '</div>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%M</div>' +
                        '<span class="timer-text">Minutes</span>' +
                        '</div>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%S</div>' +
                        '<span class="timer-text">Seconds</span>' +
                        '</div>'
                    )
                );
            });
        }
    };

    //=> Countdown variable
    var $countdown = $("#countdown");

    //=> Call class at document ready
    $(document).ready(ComingSoonCountdown.init);
});