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
            controller : 'StudentControllerS'
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
app.controller('submenuController', function ($scope, $rootScope, $state) {
    alert("submenuController");
    $scope.showSubMenu = true;

    $scope.$watch(function(){
        return $state.$current.name
    }, function(currentStateName){
        $scope.showSubMenu = (currentStateName === 'news.sports' ? false : true);
    });
});
app.controller('StudentControllerS', function ($scope, $http) {
    _refreshStudentData();
    function _refreshStudentData() {
        var data;
        var ft = "";
        $http({
            method:'GET',
            url:'/students/p/'+1+'/'+3,
            data:{
                currentPage:1,
                pageSize:3
            }
        }).then(
            function(largeLoad) { // success
                //with data must send the total no of items as well
                $scope.totalServerItems = largeLoad.data.total;
                //here's the list of data to be displayed
                data = largeLoad.data.list.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, 1, 3);
                $scope.students = largeLoad.data.content;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }

    $scope.filterOptions = {

        //text you want to search will be put inside the filterText
        filterText: ""
    };

    $scope.pagingOptions = {
        //no of records that need to be displayed per page will be depend on pagesizes
        pageSizes: [1,2,3],
        pageSize: 1,
        //this is for the page no that is selected
        currentPage: 1
    };
    //this is the method that is used to call the server and bring back the data in nggrid
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            var page = $scope.pagingOptions.currentPage;
            var pageSize = $scope.pagingOptions.pageSize;

            //if filter text is there then this condition will execute
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http({
                    method:'GET',
                    url:'/students/p/'+page+'/'+pageSize,
                    data:{
                        currentPage:page,
                        pageSize:pageSize
                    }
                }).then(
                    function(largeLoad) { // success
                        //with data must send the total no of items as well
                        $scope.totalServerItems = largeLoad.data.total;
                        //here's the list of data to be displayed
                        data = largeLoad.data.list.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                        $scope.students = largeLoad.data.content;
                    },
                    function(res) { // error
                        console.log("Error: " + res.status + " : " + res.data);
                    }
                );
            }
            else
            {
                $http({
                    method:'GET',
                    url:'/students/p/'+page+'/'+pageSize,
                    data:{
                        currentPage:page,
                        pageSize:pageSize
                    }
                }).then(
                    function(largeLoad) { // success
                        $scope.totalServerItems = largeLoad.data.total;
                        $scope.setPagingData(largeLoad.data.list, page, pageSize);
                        $scope.students = largeLoad.data.content;
                    },
                    function(res) { // error
                        console.log("Error: " + res.status + " : " + res.data);
                    }
                );
            }
        },100);
    };
    //according to the data coming from server side,pagination will be set accordingly
    $scope.setPagingData = function(data, page, pageSize){
        $scope.myData = data;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    //watch for pagination option.here pagingOptions will be watched each time value changes and then set the data accordingly
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);


    $scope.gridOptions = {
        data: 'students',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs:[
            {displayName:'stuId',field:'stuId'},
            {displayName:'stuName',field:'stuName'},
            {displayName:'address',field:'address'}
        ]
    };
});
app.controller('StudentController', function ($scope, $http) {
    alert("StudentController");
    _refreshStudentData();
    function _refreshStudentData() {
        var data;
        var ft = "";
        $http({
            method:'GET',
            url:'/students/p/'+1+'/'+3,
            data:{
                currentPage:1,
                pageSize:3
            }
        }).then(
            function(largeLoad) { // success
                //with data must send the total no of items as well
                $scope.totalServerItems = largeLoad.data.total;
                //here's the list of data to be displayed
                data = largeLoad.data.list.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                });
                $scope.setPagingData(data, 1, 3);
                $scope.students = largeLoad.data.content;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }

    $scope.filterOptions = {

        //text you want to search will be put inside the filterText
        filterText: ""
    };

    $scope.pagingOptions = {
        //no of records that need to be displayed per page will be depend on pagesizes
        pageSizes: [1,2,3],
        pageSize: 1,
        //this is for the page no that is selected
        currentPage: 1
    };
    //this is the method that is used to call the server and bring back the data in nggrid
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            var page = $scope.pagingOptions.currentPage;
            var pageSize = $scope.pagingOptions.pageSize;

            //if filter text is there then this condition will execute
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http({
                    method:'GET',
                    url:'/students/p/'+page+'/'+pageSize,
                    data:{
                        currentPage:page,
                        pageSize:pageSize
                    }
                }).then(
                    function(largeLoad) { // success
                        //with data must send the total no of items as well
                        $scope.totalServerItems = largeLoad.data.total;
                        //here's the list of data to be displayed
                        data = largeLoad.data.list.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                        $scope.students = largeLoad.data.content;
                    },
                    function(res) { // error
                        console.log("Error: " + res.status + " : " + res.data);
                    }
                );
            }
            else
            {
                $http({
                    method:'GET',
                    url:'/students/p/'+page+'/'+pageSize,
                    data:{
                        currentPage:page,
                        pageSize:pageSize
                    }
                }).then(
                    function(largeLoad) { // success
                        $scope.totalServerItems = largeLoad.data.total;
                        $scope.setPagingData(largeLoad.data.list, page, pageSize);
                        $scope.students = largeLoad.data.content;
                    },
                    function(res) { // error
                        console.log("Error: " + res.status + " : " + res.data);
                    }
                );
            }
        },100);
    };
    //according to the data coming from server side,pagination will be set accordingly
    $scope.setPagingData = function(data, page, pageSize){
        $scope.myData = data;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    //watch for pagination option.here pagingOptions will be watched each time value changes and then set the data accordingly
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);


    $scope.gridOptionsIndex = {
        data: 'students',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs:[
            {displayName:'stuId',field:'stuId'},
            {displayName:'stuName',field:'stuName'},
            {displayName:'address',field:'address'}
        ]
    };
});
