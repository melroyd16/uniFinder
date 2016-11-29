(function() {
    'use strict';

    angular
        .module('app')
        .controller('WelcomeCtrl', WelcomeCtrl);

    
    WelcomeCtrl.$inject = ['UnivListService'];
    
    /* @ngInject */
    function WelcomeCtrl(UnivListService){
        console.log(UnivListService);
        var vm = this;
        vm.property = 'Controller';
        UnivListService.getUnivList();
    }
})();