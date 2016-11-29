(function () {
    'use strict';

    angular.module('app.universityDetails', []);
    angular
        .module('app.universityDetails')
        .controller('UniversityDetailsCtrl', UniversityDetailsCtrl);

    UniversityDetailsCtrl.$inject = ['$stateParams', '$http'];

    /* @ngInject */
    function UniversityDetailsCtrl($stateParams, $http) {
        var vm = this;
        vm.property = 'Controller';
        vm.univId = $stateParams.univId;
        vm.locationId = $stateParams.univLocation;
        vm.minTempDetails = [];
        vm.maxTempDetails = [];
        vm.meanTempDetails = [];
        vm.avgSnowfall = [];
        vm.avgRainfall = [];
        vm.title4 = "";
        vm.generalDetailsFetched = false;

        vm.fetchFallClimateDetails = function () {
            return $http.get(GET_UNIVERSITY_CLIMATE("FL_CL_" + vm.locationId)).success(function (data) {
                vm.fallClimate = data.results.bindings[0];
                vm.minTempDetails.push({
                    label: 'fall',
                    value: vm.fallClimate.minTemp.value.substring(0, 4)
                });
                vm.maxTempDetails.push({
                    label: 'fall',
                    value: vm.fallClimate.maxTemp.value.substring(0, 4)
                });
                vm.meanTempDetails.push({
                    label: 'fall',
                    value: vm.fallClimate.meanTemp.value.substring(0, 4)
                });
                vm.avgRainfall.push({
                    label: 'fall',
                    value: vm.fallClimate.total_rainfall.value.substring(0, 4)
                });
                vm.avgSnowfall.push({
                    label: 'fall',
                    value: vm.fallClimate.total_snowfall.value.substring(0, 4)
                });
            })
        }
        vm.fetchSummerClimateDetails = function () {
            return $http.get(GET_UNIVERSITY_CLIMATE("SU_CL_" + vm.locationId)).success(function (data) {
                vm.summerClimate = data.results.bindings[0];
                vm.minTempDetails.push({
                    label: 'Summer',
                    value: vm.summerClimate.minTemp.value.substring(0, 4)
                });
                vm.maxTempDetails.push({
                    label: 'Summer',
                    value: vm.summerClimate.maxTemp.value.substring(0, 4)
                });
                vm.meanTempDetails.push({
                    label: 'Summer',
                    value: vm.summerClimate.meanTemp.value.substring(0, 4)
                });
                vm.avgRainfall.push({
                    label: 'Summer',
                    value: vm.summerClimate.total_rainfall.value.substring(0, 4)
                });
                vm.avgSnowfall.push({
                    label: 'Summer',
                    value: vm.summerClimate.total_snowfall.value.substring(0, 4)
                });
            })
        }
        vm.fetchSpringClimateDetails = function () {
            return $http.get(GET_UNIVERSITY_CLIMATE("SP_CL_" + vm.locationId)).success(function (data) {
                vm.springClimate = data.results.bindings[0];
                vm.minTempDetails.push({
                    label: 'Spring',
                    value: vm.springClimate.minTemp.value.substring(0, 4)
                });
                vm.maxTempDetails.push({
                    label: 'Spring',
                    value: vm.springClimate.maxTemp.value.substring(0, 4)
                });
                vm.meanTempDetails.push({
                    label: 'Spring',
                    value: vm.springClimate.meanTemp.value.substring(0, 4)
                });
                vm.avgRainfall.push({
                    label: 'Spring',
                    value: vm.springClimate.total_rainfall.value.substring(0, 4)
                });
                vm.avgSnowfall.push({
                    label: 'Spring',
                    value: vm.springClimate.total_snowfall.value.substring(0, 4)
                });

            })
        }
        vm.fetchWinterClimateDetails = function () {
            return $http.get(GET_UNIVERSITY_CLIMATE("WI_CL_" + vm.locationId)).success(function (data) {
                vm.winterClimate = data.results.bindings[0];
                vm.minTempDetails.push({
                    label: 'winter',
                    value: vm.winterClimate.minTemp.value.substring(0, 4)
                });
                vm.maxTempDetails.push({
                    label: 'winter',
                    value: vm.winterClimate.maxTemp.value.substring(0, 4)
                });
                vm.meanTempDetails.push({
                    label: 'winter',
                    value: vm.winterClimate.meanTemp.value.substring(0, 4)
                });
                vm.avgRainfall.push({
                    label: 'winter',
                    value: vm.winterClimate.total_rainfall.value.substring(0, 4)
                });
                vm.avgSnowfall.push({
                    label: 'winter',
                    value: vm.winterClimate.total_snowfall.value.substring(0, 4)
                });
            })
        }
        
        vm.fetchGeneralUniversitiyDetails = function(){
            return $http.get(GET_GENERAL_UNIVERSITY_DETAILS(vm.univId)).success(function(data){
                console.log(data);
                var univGeneralDetails = data.results.bindings[0];
                vm.name = univGeneralDetails.uname.value;
                vm.street = univGeneralDetails.street.value;
                vm.state = univGeneralDetails.state.value;
                vm.zip = univGeneralDetails.zip.value;
                vm.internetWebsite = univGeneralDetails.internetWebsite.value;
                vm.admissionOfficeWebsite = univGeneralDetails.admissionOfficeWebsite.value;
                vm.applicationWebsite = univGeneralDetails.applicationWebsite.value;
                vm.financialAidOfficeWebsite = univGeneralDetails.financialAidOfficeWebsite.value;
                vm.title4 = univGeneralDetails.opeTitle.value;
                vm.sector = univGeneralDetails.sector.value;
                vm.level = univGeneralDetails.level.value;
                vm.generalDetailsFetched = true;
                console.log(vm.title4);
            })
        }

        activate();

        function activate() {
            $.when(vm.fetchFallClimateDetails(), vm.fetchSummerClimateDetails(), vm.fetchSpringClimateDetails(), vm.fetchWinterClimateDetails()).done(function () {
                FusionCharts.ready(function () {
                    var minTempChart = new FusionCharts({
                        "type": "column2d",
                        "renderAt": "minTempChartContainer",
                        "width": "400",
                        "height": "200",
                        "dataFormat": "json",
                        "canvasBgAlpha": "0",
                        "showAlternateHgridColor": "1",
                        "bgImage": "http://upload.wikimedia.org/wikipedia/commons/7/79/Misc_fruit.jpg",
                        "bgImageAlpha": "25",
                        "bgImageDisplayMode": "stretch",
                        "dataSource": {
                            "chart": {
                                "caption": "Seasonal Minimum Temperature",
                                "xAxisName": "Season",
                                "yAxisName": "Temperatue in Fahrenheits",
                                "canvasBgAlpha": "0",
                                "showAlternateHgridColor": "1",
                                "bgImage": "images/temperature.png",
                                "bgImageAlpha": "8",
                                "bgImageDisplayMode": "stretch",
                            },
                            "data": vm.minTempDetails
                        }
                    });
                    var maxTempChart = new FusionCharts({
                        "type": "column2d",
                        "renderAt": "maxTempChartContainer",
                        "width": "400",
                        "height": "200",
                        "dataFormat": "json",
                        "canvasBgAlpha": "0",
                        "showAlternateHgridColor": "1",
                        "bgImage": "http://upload.wikimedia.org/wikipedia/commons/7/79/Misc_fruit.jpg",
                        "bgImageAlpha": "25",
                        "bgImageDisplayMode": "stretch",
                        "theme": "fint",
                        "dataSource": {
                            "chart": {
                                "caption": "Seasonal Maximum Temperature",
                                "xAxisName": "Season",
                                "yAxisName": "Temperatue in Fahrenheits",
                                "canvasBgAlpha": "0",
                                "showAlternateHgridColor": "1",
                                "bgImage": "images/thermometer.png",
                                "bgImageAlpha": "8",
                                "bgImageDisplayMode": "stretch",
                            },
                            "data": vm.maxTempDetails
                        }
                    });
                    var meanTempChart = new FusionCharts({
                        "type": "column2d",
                        "renderAt": "meanTempChartContainer",
                        "width": "400",
                        "height": "200",
                        "dataFormat": "json",
                        "canvasBgAlpha": "0",
                        "showAlternateHgridColor": "1",
                        "bgImage": "http://upload.wikimedia.org/wikipedia/commons/7/79/Misc_fruit.jpg",
                        "bgImageAlpha": "25",
                        "bgImageDisplayMode": "stretch",
                        "theme": "fint",
                        "dataSource": {
                            "chart": {
                                "caption": "Seasonal Mean Temperature",
                                "xAxisName": "Season",
                                "yAxisName": "Temperatue in Fahrenheits",
                                "canvasBgAlpha": "0",
                                "showAlternateHgridColor": "1",
                                "bgImage": "images/thermometer.png",
                                "bgImageAlpha": "8",
                                "bgImageDisplayMode": "stretch",
                            },
                            "data": vm.meanTempDetails
                        }
                    });
                    var avgSnowfallChart = new FusionCharts({
                        "type": "column2d",
                        "renderAt": "avgSnowfallChartContainer",
                        "width": "400",
                        "height": "200",
                        "dataFormat": "json",
                        "canvasBgAlpha": "0",
                        "showAlternateHgridColor": "1",
                        "bgImage": "http://upload.wikimedia.org/wikipedia/commons/7/79/Misc_fruit.jpg",
                        "bgImageAlpha": "25",
                        "bgImageDisplayMode": "stretch",
                        "theme": "fint",
                        "dataSource": {
                            "chart": {
                                "caption": "Average Snowfall",
                                "xAxisName": "Season",
                                "yAxisName": "Snowfall in inches",
                                "canvasBgAlpha": "0",
                                "showAlternateHgridColor": "1",
                                "bgImage": "http://www.tutorialchip.com/wp-content/uploads/2011/11/Snow-flake-Icon-520x483.jpg",
                                "bgImageAlpha": "8",
                                "bgImageDisplayMode": "stretch",
                            },
                            "data": vm.avgSnowfall
                        }
                    });
                    var avgRainfallChart = new FusionCharts({
                        "type": "column2d",
                        "renderAt": "avgRainfallChartContainer",
                        "width": "400",
                        "height": "200",
                        "dataFormat": "json",
                        "dataSource": {
                            "chart": {
                                "caption": "Average Rainfall",
                                "xAxisName": "Season",
                                "yAxisName": "Rainfall in inches",
                                "canvasBgAlpha": "0",
                                "showAlternateHgridColor": "1",
                                "bgImage": "https://maxcdn.icons8.com/Share/icon/Weather//torrential_rain1600.png",
                                "bgImageAlpha": "8",
                                "bgImageDisplayMode": "stretch",
                            },
                            "data": vm.avgRainfall
                        }
                    });
                    minTempChart.render();
                    maxTempChart.render();
                    meanTempChart.render();
                    avgSnowfallChart.render();
                    avgRainfallChart.render();
                })
            });
            vm.fetchGeneralUniversitiyDetails();
        }
    }
})();
