(function () {
    'use strict';
    angular
        .module('app')
        .directive('pagination1', paginationDirective);

    function  paginationDirective() {
        var directive = {
            controller: paginationController,
            templateUrl: 'app/components/pagination/pagination.directive.html',
            restrict: 'EA',
            scope: {
                pageSize : '=pageSize',
                offset : '=offset',
                listSize : '=listSize'
            }
        };
        return directive;
    }

    paginationController.$inject = ['$scope'];

    function paginationController($scope) {
        $scope.pageLimitOptions = [5, 10, 15, 20, 25];
           
        $scope.generateDropDown = function(){
            $scope.paginationDropDown = [];
            if($scope.pageSize!=undefined && $scope.listSize!=undefined) {
                $scope.offset = 0;
                for(var i = 1; i <= $scope.listSize; i += $scope.pageSize) {
                    $scope.paginationDropDown.push({
                        text : i + "-" + ((i + $scope.pageSize - 1) > $scope.listSize ? $scope.listSize : (i + $scope.pageSize - 1)),
                        offset : i - 1
                    })
                }
            }
        }
        $scope.$watch('pageSize',$scope.generateDropDown,true);
        $scope.$watch('listSize',$scope.generateDropDown,true);
    }
})();