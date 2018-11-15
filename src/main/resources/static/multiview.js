var myapp = angular.module('myapp', ["ui.router"]);
myapp.config(function($stateProvider){
    $stateProvider
        .state('multihome', {
            url: "/multiuiview/home",
            views: {
                "viewA": {
                    template: "/multiuiview/route1",
                    controller : 'TestMHomeCtl'
                },
                "viewB": {
                    template: "/multiuiview/route2"
                }
            }

        })
        .state('route1', {
            url: "/multirouteone",
            views: {
                "viewA": {
                    template: "/multiuiview/route1"
                },
                "viewB": {
                    template: "/multiuiview/route2"
                }
            }
        })
        .state('route2', {
            url: "/multiroutetwo",
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