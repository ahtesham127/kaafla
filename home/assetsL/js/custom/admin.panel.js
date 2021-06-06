"use strict";

//=> Class Definition
var AdminPanel = AdminPanel || {};

$(function () {
    AdminPanel = {
        //=> Initialize function to call all functions of the class
        init: function () {
            AdminPanel.statisticsChart();
            AdminPanel.campaignsChart();
            AdminPanel.walletAnalysis();
        },

        /*!
         * Listing statistics chart
         * Basic plugin: Chart js
         *---------------------------------------------------*/
        statisticsChart: function () {
            if ($('#statistics').length) {
                var ctx = document.getElementById("statistics").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ["Activated", "Drafted", "Published", "Deleted"],
                        datasets: [{
                            backgroundColor: [
                                Utils.colors('success'),
                                Utils.colors('info'),
                                Utils.colors('danger'),
                                Utils.colors('light')
                            ],
                            data: [21, 10, 32, 17]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                        },
                        tooltips: {
                            intersect: false,
                            mode: 'nearest'
                        },
                        legend: {
                            position: 'left',
                            labels: {
                                boxWidth: 16,
                                padding: 16
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        elements: {
                            arc: {
                                borderWidth: 0
                            }
                        }
                    }
                });
            }
        },

        /*!
         * Listing ads campaigns chart
         * Basic plugin: Chart js
         *---------------------------------------------------*/
        campaignsChart: function () {
            if ($('#campaigns').length) {
                var ctx = document.getElementById("campaigns").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                        datasets: [
                            {
                                label: 'Instagram',
                                backgroundColor: Utils.colors('danger'),
                                data: [15, 20, 25, 30, 25, 20, 15]
                            },
                            {
                                label: 'Facebook',
                                backgroundColor: '#f6f5f5',
                                data: [15, 20, 25, 30, 25, 20, 15]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: false,
                        },
                        tooltips: {
                            intersect: false,
                            mode: 'nearest'
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 16,
                                padding: 24
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        barRadius: 4,
                        scales: {
                            xAxes: [{
                                barThickness: 20,
                                display: false,
                                gridLines: false,
                                stacked: true
                            }],
                            yAxes: [{
                                display: false,
                                stacked: true,
                                gridLines: false
                            }]
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        }
                    }
                });
            }
        },

        /*!
         * Wallet analysis chart
         * Basic plugin: Chart js
         *---------------------------------------------------*/
        walletAnalysis: function () {
            var $walletAnalysis = $("#walletAnalysis");
            if ($walletAnalysis.length === 0) {
                return false;
            }

            var walletAnalysisChartConfig = {
                type: 'bar',
                data: {
                    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    datasets: [
                        {
                            label: 'Transaction',
                            data: [2, 4, 3, 1, 5, 4, 3, 6, 2, 4, 5, 8],
                            backgroundColor: Utils.colors('danger'),
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    barRadius: 4,
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItems, data) {
                                return moment.months(tooltipItems[0]['index']);
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            barThickness: 20,
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                stepSize: 2,
                                min: 0,
                                max: 10
                            }
                        }]
                    }
                }
            };
            new Chart($walletAnalysis, walletAnalysisChartConfig);
        }
    };

    //=> Call class at document ready
    $(document).ready(AdminPanel.init);
});