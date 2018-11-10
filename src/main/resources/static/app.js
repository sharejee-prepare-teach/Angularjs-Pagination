var app = angular.module('myApp', ['ngGrid','ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
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
        .state('student', {
            url: '/student',
            templateUrl : 'student',
            controller : 'StudentController'
        })
        .state('about', {
            url: '/about',
            templateUrl : 'about'
        })
        .state('indext', {
            url: '/indext',
            templateUrl : 'indext',
            controller : 'StudentController'
    });
    $urlRouterProvider.otherwise("/");
});
/*app.controller('SportstController', function ($scope, $rootScope, $state) {
    alert("SportstController");
    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
        $scope.showSubMenu = (currentStateName === 'news.sports' ? false : true);
    });
});*/
app.controller('submenuController', function ($scope, $rootScope, $state) {
    alert("submenuController");
    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
        $scope.showSubMenu = (currentStateName === 'news.sports' ? false : true);
    });
});

app.controller('StudentController', function ($scope, $http) {
/*
    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
        $scope.showSubMenu = (currentStateName === 'news.sports' ? false : true);
    });*/

    alert("StudentController");
    _refreshStudentData();
    function _refreshStudentData() {
        $http({
            method: 'GET',
            url: '/students'
        }).then(
            function(res) { // success
                $scope.students = res.data;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
    $scope.gridOptions = {
        data: 'students',
        enablePaging: false,
        columnDefs:[
            {displayName:'stuId',field:'stuId'},
            {displayName:'stuName',field:'stuName'},
            {displayName:'address',field:'address'}
        ]
    };
});

/*app.controller('StudentController', ['$scope','StudentService',
    function ($scope, StudentService) {
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 5,
            sort: null
        };

        StudentService.getStudents(
            paginationOptions.pageNumber,
            paginationOptions.pageSize).success(function(data){
            $scope.gridOptions.data = data.content;
            $scope.gridOptions.totalItems = data.totalElements;
        });

        $scope.gridOptions = {
            paginationPageSizes: [5, 10, 20],
            paginationPageSize: paginationOptions.pageSize,
            enableColumnMenus:false,
            useExternalPagination: true,
            columnDefs: [
                { name: 'stuId' },
                { name: 'stuName' },
                { name: 'address' }
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged(
                    $scope,
                    function (newPage, pageSize) {
                        paginationOptions.pageNumber = newPage;
                        paginationOptions.pageSize = pageSize;
                        StudentService.getStudents(newPage,pageSize)
                            .success(function(data){
                                $scope.gridOptions.data = data.content;
                                $scope.gridOptions.totalItems = data.totalElements;
                            });
                    });
            }
        };
    }]);

app.service('StudentService',['$http', function ($http) {

    function getStudents(pageNumber,size) {
        pageNumber = pageNumber > 0?pageNumber - 1:0;
        return $http({
            method: 'GET',
            url: '/students/p/'+1+'/'+3
            /!*url:'/students/p/'+1+'/'+3,*!/
        });
    }
    return {
        getStudents: getStudents
    };
}]);*/
