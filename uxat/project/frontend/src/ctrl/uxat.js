angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    const appBegin = true;
    const arrayTheme = ["light", "dark"];

    $scope.helloWorldView = appBegin;
    $scope.uXatView = !appBegin;
    $scope.loginView = !appBegin;
    $scope.createView = !appBegin;

    document.body.className = arrayTheme.some(theme => document.body.className.includes(theme))
        ? document.body.className : "dark " + document.body.className;

    $scope.go = function() {
        $scope.helloWorldView = false;
        $scope.uXatView = true;
        $scope.loginView = false;
        $scope.createView = false;
    }

    $scope.loginAccess = function() {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = true;
        $scope.createView = false;
    }

    $scope.createAccess = function() {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = false;
        $scope.createView = true;
    }
}]);