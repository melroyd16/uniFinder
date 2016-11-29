(function () {
    'use strict';

    angular
        .module('app')
        .service('UnivListService', UnivListService);

    UnivListService.$inject = ['$http'];

    /* @ngInject */
    function UnivListService($http) {
        var vm = this;
        vm.getUnivList = getUnivList;

        ////////////////

        function getUnivList() {
            $http.get(SEARCH_UNIVERSITIES("", 10, 140,10, 140, 10, 140, false, [], 0, 300, 0, 150)).success(function (data) {
                    vm.allUniversitiesList = data.results.bindings;
                console.log(data);
            });
        }
    }
})();