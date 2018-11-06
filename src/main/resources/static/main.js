
var app = angular.module("app", ['ngGrid']);
 
// Controller Part
app.controller("StudentController", function($scope, $http) {
 
 
    $scope.students = [];
    $scope.studentForm = {
        stuId: 1,
        stuName: "",
        stuSex: "",
        address: ""
    };
 
    // Now load the data from server
    _refreshStudentData();
 
    // HTTP POST/PUT methods for add/edit student  
    // Call: http://localhost:8080/student
    $scope.submitStudent = function() {
 
        var method = "";
        var url = "";
 
        if ($scope.studentForm.stuId == -1) {
            method = "POST";
            url = '/student';
        } else {
          alert('update'+$scope.studentForm.stuId);
            method = "PUT";
            url = '/student/'+$scope.studentForm.stuId;
          
        }
 
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.studentForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
 
    $scope.createStudent = function() {
        _clearFormData();
    }
 
    // HTTP DELETE- delete student by Id
    // Call: http://localhost:8080/student/{stuId}
    $scope.deleteStudent= function(student) {
        $http({
            method: 'DELETE',
            url: '/student/' + student.stuId
        }).then(_success, _error);
    };
 
    // In case of edit
    $scope.editStudent = function(student) {
        $scope.studentForm.stuId = student.stuId;
        $scope.studentForm.stuName = student.stuName;
        $scope.studentForm.stuSex = student.stuSex;
        $scope.studentForm.Address = student.address;
       
    };
 
    // Private Method  
    // HTTP GET- get all students collection
    // Call: http://localhost:8080/students
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
 
    function _success(res) {
        _refreshStudentData();
        _clearFormData();
    }
 
    function _error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data);
    }
 
    // Clear the form
    function _clearFormData() {
        $scope.studentForm.stuId = -1;
        $scope.studentForm.stuName = "";
        $scope.studentForm.stuSex = "";
        $scope.studentForm.address = "";
    };

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

        //field : id is the key from the data coming from server side
        columnDefs:[
            {displayName:'stuId',field:'stuId'},
            {displayName:'stuName',field:'stuName'},
            {displayName:'stuSex',field:'stuSex'},
        ]
    };
});
