var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider){
    $stateProvider
        .state('news', {
            url: '/newst',
            templateUrl : 'newst'
        })
        .state('news.sports', {
            url: '/sportst',
            templateUrl : 'sportst'
        })
        .state('news.music', {
            url: '/musict',
            templateUrl : 'musict'
        })
});

app.controller('submenuController', function ($scope, $rootScope, $state) {
    alert("ctl");
    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
        $scope.showSubMenu = currentStateName === 'news.sports' ? false : true;
    })
});
