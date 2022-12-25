angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    const appBegin = true;
    const arrayTheme = ["light", "dark"];

    $scope.users = [
        {nick: "bznc", pass: "1234"}
    ];
    
    $scope.usersN = 1;

    $scope.passDontMatchSpan = "";
    $scope.userNotUniqueSpan = "";

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

    $scope.createUser = function(user, passTentative) {
        if($scope.passEquals(user.pass, passTentative)) {
            if($scope.verifyNickIsUnique(user.nick)) {
                $scope.go();
            } else {
                $scope.spanErrorNickNotUnique();
                user.nick = "";
            }
        } else {
            $scope.spanErrorPassDontMatch();
            passTentative = "";
        }
    }

    $scope.passEquals = function(passO, passT) {
        return passO === passT;
    }

    $scope.verifyNickIsUnique = function(nick) {
        let userListResult = $scope.users.filter(user => user.nick === nick);
        return userListResult.length = 0;
    }

    $scope.spanErrorPassDontMatch = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = "Both passwords don't match!";
        $scope.setTimeoutSpan(spanError, $scope.passDontMatchSpan);
    }

    $scope.spanErrorNickNotUnique = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = "This Nick is not available!";
        $scope.setTimeoutSpan(spanError, $scope.userNotUniqueSpan);
    }

    /***********************************************************************************************/

    $scope.setTimeoutSpan = function(element, span) {
        if(span != "") clearTimeout(span);
        span = setTimeout($scope.clearDemo, 3000, element, span);
    }

    $scope.clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }
}]);