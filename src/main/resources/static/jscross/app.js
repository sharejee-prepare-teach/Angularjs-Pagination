var app = angular.module('app', []);

app.factory('MapService', function() {
    var observerCallbacks = [];
    var markers = [];

    var publicMembers = {
        addMarker: addMarker,
        getMarkers: getMarkers,
        registerObserverCallback: registerObserverCallback
    };

    function addMarker (marker) {
        markers.push(marker);
        notifyObservers();
    };

    function getMarkers() {
        return markers;
    }

    function registerObserverCallback(callback){
        observerCallbacks.push(callback);
    };

    function notifyObservers(){
        angular.forEach(observerCallbacks, function(callback){
            callback();
        });
    };

    return publicMembers;
});

app.controller('MyController', function($scope, MapService) {
    MapService.registerObserverCallback(function() {
        $scope.markers = MapService.getMarkers();
    });
});

app.controller('AnotherController', function($scope, MapService) {

    $scope.addMarker = MapService.addMarker;
});