angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    /*************************************************************************/
    /** DATA */

    $scope.users = [
        {nick: "bznc", pass: "xxxx1234"},
        {nick: "viruz", pass: "xxxx1904"},
        {nick: "bob", pass: "xxxx0420"}
    ];
    $scope.usersN = 1;

    const minSizePass = 8;
    const mandatoryCharsPassLower = "qwertyuiopasdfghjklzxcvbnm";
    const mandatoryCharsPassUpper = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const mandatoryCharsPassDigit = "0123456789";

    const appBegin = true;
    const arrayTheme = ["light", "dark"];

    $scope.passDontMatchSpan = "";
    const passDontMatchMessage = "Both passwords don't match!";
    $scope.passSmallSpan = "";
    const passSmallMessage = "Password mandatory no less than 8";
    $scope.passNotAllowSpan = "";
    const passNotAllowMessage = "Password mandatory contain lower, upper, digit, ONLY!";
    $scope.userNotUniqueSpan = "";
    const userNotUniqueMessage = "This Nick is not available!";

    $scope.helloWorldView = appBegin;
    $scope.uXatView = !appBegin;
    $scope.loginView = !appBegin;
    $scope.createView = !appBegin;

    document.body.className = arrayTheme
        .some(theme => document.body.className.includes(theme))
        ? document.body.className : "dark " + document.body.className;

    /*************************************************************************/
    /** GERAL */

    $scope.setTimeoutSpan = function(element, span) {
        if(span != "") clearTimeout(span);
        span = setTimeout($scope.clearDemo, 3000, element, span);
    }

    $scope.clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }

    /*************************************************************************/
    /** INIT */

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

    /*************************************************************************/
    /** LOGIN */

    $scope.loginUser = function(user) {
        $scope.go();
    }

    /*************************************************************************/
    /** CREATE */

    $scope.createUser = function(user) {
        let resultValidation = $scope.createAccountValidation(user);
        if(resultValidation === 0) {
            $scope.go();
        } else {
            switch(resultValidation) {
                case 1: $scope.spanErrorPassDontMatch();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                case 2: $scope.spanErrorNickNotUnique();
                        user.nick = "";
                        break;
                case 3: $scope.spanErrorPassSmall();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                case 4: $scope.spanErrorPassNotAllow();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                default: ;
            }
        }
    }

    $scope.createAccountValidation = function(user) {
        if(!($scope.passEquals(user.pass, user.passTentative))) return 1;
        if(!($scope.verifyNickIsUnique(user.nick))) return 2;
        if(!($scope.passNotSmall(user.pass))) return 3;
        if(!($scope.passHaveMandatoryChars(user.pass))) return 4;

        return 0;
    }

    /*---------- OPERATIONS -------------------*/

    $scope.passEquals = function(passO, passT) {
        return passO === passT;
    }

    $scope.verifyNickIsUnique = function(nick) {
        let userListResult = $scope.users.filter(user => user.nick === nick);
        return userListResult.length === 0;
    }

    $scope.passNotSmall = function(pass) {
        return pass.length >= minSizePass;
    }

    $scope.passHaveMandatoryChars = function(pass) {
        let containsLower = false;
        let containsUpper = false;
        let containsDigit = false;
        [...mandatoryCharsPassLower].forEach((c) => {
            if(pass.includes(c)) {
                containsLower = true;
            }
        });
        [...mandatoryCharsPassUpper].forEach((c) => {
            if(pass.includes(c)) {
                containsUpper = true;
            }
        });
        [...mandatoryCharsPassDigit].forEach((c) => {
            if(pass.includes(c)) {
                containsDigit = true;
            }
        });
        return containsLower && containsUpper && containsDigit;
    }

    /*---------- SPAN CONTROLLER --------------*/

    $scope.spanErrorPassDontMatch = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passDontMatchMessage;
        $scope.setTimeoutSpan(spanError, $scope.passDontMatchSpan);
    }

    $scope.spanErrorPassSmall = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passSmallMessage;
        $scope.setTimeoutSpan(spanError, $scope.passSmallSpan);
    }

    $scope.spanErrorPassNotAllow = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passNotAllowMessage;
        $scope.setTimeoutSpan(spanError, $scope.passNotAllowSpan);
    }

    $scope.spanErrorNickNotUnique = function() {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = userNotUniqueMessage;
        $scope.setTimeoutSpan(spanError, $scope.userNotUniqueSpan);
    }

    /*************************************************************************/
}]);