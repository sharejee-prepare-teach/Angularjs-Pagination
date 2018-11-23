var app = angular.module('dsntApp', ['ngMaterial', "ui.router"]);
app.config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('maintabsthree', {
                    url: "/maintabsthree",
                    templateUrl: "maintabsthree",
                    controller : 'MainController'
                })
                .state('tabthree', {
                    url: "/tabthree",
                    templateUrl: "tabthree",
                    controller : 'tabCtrl'
                })
                .state('view1', {
                    url: "/view1",
                    templateUrl: "partials/view1.html"
                })
                .state('view2', {
                    url: "/view2",
                    templateUrl: "partials/view2.html"
                })
                .state('view3', {
                    url: "/view3",
                    templateUrl: "partials/view3.html"
                })
            ;
    $urlRouterProvider.otherwise('/tab/dash');
        });
app.controller('tabCtrl', function($scope, $location, $log) {
    alert("tabCtrl..");
            $scope.selectedIndex = 0;

            $scope.$watch('selectedIndex', function(current, old) {
                switch (current) {
                    case 0:
                        $location.url("/view1");
                        break;
                    case 1:
                        $location.url("/view2");
                        break;
                    case 2:
                        $location.url("/view3");
                        break;
                }
            });
});

app.controller('MainController', function($scope, $location, $log) {
    alert("MainController..");
});
