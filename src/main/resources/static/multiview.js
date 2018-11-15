var myapp = angular.module('myapp', ["ui.router"]);
myapp.config(function($stateProvider){
    $stateProvider
        .state('multihome', {
            url: "/multiuiview/home",
            views: {
                "viewA": {
                    template: "multihome.viewA"
                },
                "viewB": {
                    template: "multihome.viewB"
                }
            },
            controller : 'TestMHomeCtl'
        })
        .state('route1', {
            url: "/route1",
            views: {
                "viewA": {
                    template: "route1.viewA"
                },
                "viewB": {
                    template: "route1.viewB"
                }
            }
        })
        .state('route2', {
            url: "/route2",
            views: {
                "viewA": {
                    template: "route2.viewA"
                },
                "viewB": {
                    template: "route2.viewB"
                }
            }
        })
});
myapp.controller('TestMHomeCtl', function ($scope, $rootScope, $state) {
    alert("TestMHomeCtl..");
});