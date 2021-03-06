
var app = angular.module("app", ['ngGrid','ui.bootstrap']);
 
// Controller Part
app.controller("StudentController", function($scope, $http) {
    $scope.filteredStudents = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;

    $scope.currentPageVT = 0;
    $scope.pageSizeVT = 10;

    $scope.students = [];
    $scope.studentsp = [];

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
    };
 
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
        $scope.numberOfPages=function(){
            return Math.ceil($scope.students.length/$scope.pageSizeVT);
        };

        $http({
            method: 'GET',
            url: '/students'
        }).then(
            function(res) { // success
                $scope.students = res.data;
                $scope.studentsp = res.data;

                alert("studentsp: "+$scope.studentsp);
                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;
                    $scope.filteredStudents = $scope.studentsp.slice(begin, end);
                });
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

    $scope.gridOptions = {
        data: 'students',
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        multiSelect: false,
        columnDefs: [
            { field: 'stuId', displayName: 'stuId', enableCellEdit: false } ,
            { field: 'stuName', displayName: 'stuName', enableCellEdit: false} ,
            { field: 'stuSex', displayName: 'stuSex', enableCellEdit: true} ,
            { field:'', displayName: 'Save', enableCellEdit: false,
                cellTemplate: '<button id="editBtn" type="button"  ng-click="saveItem(row.entity.name, row.entity.surname,row.entity.address)" >Save</button>'}
        ]

    };
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
/*

app.controller("MyCtrl", function($scope) {
/!*function MyCtrl($scope) {*!/
    alert("MyCtl..");
    $scope.currentPageVT = 0;
    $scope.pageSizVT = 10;
    $scope.data = [];

    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);
    };
    for (var i=0; i<45; i++) {
        $scope.data.push("Item "+i);
    }
});*/
