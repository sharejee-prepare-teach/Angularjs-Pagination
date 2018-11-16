'use strict';
angular
    .module('projectplanner', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('twoprojects', {
                url: '/twoprojects',
                views: {
                    'menu': {
                        template: '<div>Start your projects!</div>',
                    },
                    'content': {
                        templateUrl: '/twoprojects',
                        controller: 'ProjectsController'
                    }
                }
            })
            .state('twoprojects.selected', {
                url: '/:projectId',
            })
            .state('twoprojects.selected.dates', {
                url: '/twoprojects.selected.dates',
                views: {
                    'menu@': {
                        templateUrl: '/twomenu'
                    },
                    'content@': {
                        templateUrl: '/twodateplanner',
                        controller: 'DateplannerController'
                    }
                }
            })
    });