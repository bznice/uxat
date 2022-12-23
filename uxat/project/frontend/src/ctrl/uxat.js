angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    const appBegin = true;
    const arrayTheme = ["light", "dark"];~

    $scope.users;
    $scope.usersN = 0;

    $scope.passTentative;

    $scope.passDontMatchSpan = "";

    $scope.helloWorldView = appBegin;
    $scope.uXatView = !appBegin;
    $scope.loginView = !appBegin;
    $scope.createView = !appBegin;

    document.body.className = arrayTheme.some(theme => document.body.className.includes(theme))
        ? document.body.className : "dark " + document.body.className;

    /***********************************************************************************************/

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

    /***********************************************************************************************/
    /** LOGIN */

    $scope.loginUser = function(user) {
        $scope.go();
    }

    /***********************************************************************************************/
    /** CREATE */

    $scope.createUser = function(user) {
        if($scope.passEquals(user.pass, $scope.passTentative)) {
            $scope.go();
        } else {
            $scope.passDontMatch();
        }
    }

    $scope.passEquals = function(passO, passC) {
        return passO === passC;
    }

    $scope.passDontMatch = function() {
        var spanError = document.getElementById("passDontMatch");
        spanError.textContent = "Both passwords don't match!";
        if($scope.passDontMatchSpan != "") clearTimeout($scope.passDontMatchSpan);
        $scope.passDontMatchSpan = setTimeout($scope.clearDemo, 3000, spanError, $scope.passDontMatchSpan);
    }

    /***********************************************************************************************/

    $scope.clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }
}]);