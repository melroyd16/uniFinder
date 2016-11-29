(function () {
    'use strict';

    angular
        .module('app')
        .filter('searchBoldfilter', searchBoldfilter);

    function searchBoldfilter() {
        
        return makeBold;

        ////////////////

        function makeBold(input, query) {
            return input.replace(RegExp('('+ query + ')', 'g'), '<span class="super-class">$1</span>');
        };
    }
})();