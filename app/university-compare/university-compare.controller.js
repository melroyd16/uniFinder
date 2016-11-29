(function () {
    'use strict';

    angular
        .module('app.university-compare')
        .controller('UniversityCompareCtrl', UniversityCompareCtrl);

    /* @ngInject */
    UniversityCompareCtrl.$inject = ['$modal'];

    function UniversityCompareCtrl($modal) {
        var vm = this;
        vm.property = 'Controller';
        vm.message = "hello world";
        vm.items = ['item1', 'item2', 'item3'];
        vm.showModal = false;


        vm.open = function (size, parentSelector) {
            vm.showModal = true;
            /*var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : angular.element(document).find('body');
            var modalInstance = $modal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'UniversityCompareCtrl',
                controllerAs: 'univCCtrl',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });*/
        };
    }
})();
