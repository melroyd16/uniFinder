(function () {
    'use strict';

    angular
        .module('app.university-search')
        .controller('UniversitySearchCtrl', UniversitySearchCtrl);


    UniversitySearchCtrl.$inject = ['$scope', 'UnivListService', '$http', '$timeout', '$state']
        /* @ngInject */
    function UniversitySearchCtrl($scope, UnivListService, $http, $timeout, $state) {

        var vm = this;
        vm.property = 'Controller';
        vm.hello = "hello";
        vm.uniNameFilter = "";
        vm.pageSize = 10;
        vm.pageOffset = 0;
        vm.universitiesList = UnivListService.allUniversitiesList;
        vm.displayDuplicateState = false;
        vm.stateOptions = STATE_ARRAY;
        vm.selectedState = null;
        vm.selectedStates = [];
        vm.stateConfig = {
            modelLabel: "code",
            optionLabel: "text"
        };

        vm.fetchUniversitiesList = function () {
            vm.displayLoader = true;
            var filterLocation = vm.selectedStates.length > 0 ? true : false;
            $http.get(SEARCH_UNIVERSITIES(vm.uniNameFilter, vm.minTempSlider.min, vm.minTempSlider.max,
                vm.maxTempSlider.min, vm.maxTempSlider.max,
                vm.meanTempSlider.min, vm.meanTempSlider.max, filterLocation, vm.finalStates,
                vm.snowfallSlider.min, vm.snowfallSlider.max, vm.rainfallSlider.min, vm.rainfallSlider.max)).success(function (data) {
                vm.universitiesList = data.results.bindings;
                vm.displayLoader = false;
            });
        }

        vm.renderSliders = function () {
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            });
        }

        vm.fetchStates = function () {
            return STATE_ARRAY;
        }
        vm.removeState = function (state_name) {
            for (var i = 0; i < vm.selectedStates.length; i++) {
                if (vm.selectedStates[i].text === state_name) {
                    vm.selectedStates.splice(i, 1);
                    break;
                }
            }
            vm.consolidateStates();
        }
        vm.consolidateStates = function () {
            vm.finalStates = [];
            for (var i = 0; i < vm.selectedStates.length; i++) {
                vm.finalStates.push(vm.selectedStates[i].code);
            }
            vm.fetchUniversitiesList();
        }

        vm.clearAllStates = function () {
            vm.selectedStates = [];
            vm.consolidateStates();
        }

        vm.initializeWeather = function () {
            vm.minTempSlider = {
                min: 0,
                max: 150,
                options: {
                    floor: 0,
                    ceil: 150,
                    step: 1,
                    onEnd: vm.fetchUniversitiesList
                }
            };
            vm.maxTempSlider = angular.copy(vm.minTempSlider);
            vm.meanTempSlider = angular.copy(vm.minTempSlider);
            vm.snowfallSlider = angular.copy(vm.minTempSlider);
            vm.rainfallSlider = angular.copy(vm.minTempSlider);
            vm.snowfallSlider.options.ceil = 300;
            vm.snowfallSlider.max = 300;
            vm.fetchUniversitiesList();
        }

        vm.viewUniversityDetails = function (currentUniversity) {
            $state.go("university-details", {
                univId: currentUniversity.univ_id.value,
                univLocation: currentUniversity.loc_name.value
            });
        }

        init();

        function init() {
            vm.initializeWeather();
            vm.uniNameFilter = "";


            $('.collapse').on('shown.bs.collapse', function () {
                $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
            }).on('hidden.bs.collapse', function () {
                $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
            });

            vm.stateEvents = {
                onItemSelect: function ($item) {
                    for (var i = 0; i < vm.selectedStates.length; i++) {
                        if ($item.text === vm.selectedStates[i].text) {
                            vm.displayDuplicateState = true;
                            return;
                        }
                    }
                    vm.selectedStates.push($item);
                    vm.consolidateStates();
                }
            };

            if (!UnivListService.allUniversitiesList) {
                vm.fetchUniversitiesList();
            }
        }
    }
})();
