(function(){
    'use strict';
    angular.module('app',['rzModule', 'ngSanitize', 'apg.typeaheadDropdown', 'ui.bootstrap', 'perfect_scrollbar', 'app.university-search','app.university-compare', 'app.universityDetails','ui.router']);
    
    angular.module('app').config(config);

    function config($stateProvider, $urlRouterProvider) {
        console.log('within app config');
        $urlRouterProvider.otherwise("/welcome")
        $stateProvider.state('welcome', {
            url:'/welcome',
            templateUrl: 'app/welcome/welcome.partial.html',
            controller: 'WelcomeCtrl as welcomeCtrl'
        }).state('university-search',{
            url:'/university-search',
            templateUrl: 'app/university-search/university-search.partial.html',
            controller: 'UniversitySearchCtrl as univSCtrl'
        }).state('university-details',{
            url:'/university-details/:univId/:univLocation',
            templateUrl: 'app/university-details/university-details.partial.html',
            controller: 'UniversityDetailsCtrl as univDCtrl'
        }).state('university-compare',{
            url:'/university-compare',
            templateUrl: 'app/university-compare/university-compare.partial.html',
            controller: 'UniversityCompareCtrl as univCCtrl'
        })
    }
})();