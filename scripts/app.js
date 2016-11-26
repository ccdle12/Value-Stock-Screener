"use strict";

angular.module('stockApp', ['ngResource', 'ui-rangeSlider', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angularUtils.directives.dirPagination', 'ui.router' ])
.config(function($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('app',{
          url:'/',
          views: {
            'header': {
                templateUrl : 'views/header.html',
            },
            'content': {
                templateUrl : 'views/SP.html',
                controller  : 'tableController'
            },
            'footer': {
                templateUrl : 'views/footer.html',
            }
          }
        })
        .state('app.favorites',{
          url:'favorites',
          views: {
            'content@': {
              templateUrl : 'views/favorites.html',
              controller: 'favoritesController',
              // resolve: {
              //   checkFavs :  function (checkFavs) {
              //     return checkFavs();
              //   }
              // }
            }
          }
        });
        $urlRouterProvider.otherwise('/');
})
;
