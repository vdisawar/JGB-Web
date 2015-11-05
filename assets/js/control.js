function mainController(Facebook, $scope, $rootScope, $http, $location) {
    $scope.info = {};

    // Checks the status change and begins actions
    $rootScope.$on("fb_statusChange", function (event, args) {
        $rootScope.fb_status = args.status;
        $rootScope.$apply();
    });
    // Performs checking
    $rootScope.$on("fb_get_login_status", function () {
        Facebook.getLoginStatus();
    });
    // Login failed
    $rootScope.$on("fb_login_failed", function () {
        console.log("fb_login_failed");
    });
    // On succeed reassign id to null
    $rootScope.$on("fb_logout_succeded", function () {
        console.log("fb_logout_succeded");
        $rootScope.id = "";
    });
    // On fail, show fail
    $rootScope.$on("fb_logout_failed", function () {
        console.log("fb_logout_failed!");
    });

    // On connected, authenticate in backend
    $rootScope.$on("fb_connected", function (event, args) {

        var params = {};

        function authenticateViaFacebook(parameters) {
            //posts some user data to a page that will check them against some db
        }

        if (args.userNotAuthorized === true) {
            //if the user has not authorized the app, we must write his credentials in our database
            console.log("user is connected to facebook but has not authorized our app");
        }
        else {
            console.log("user is connected to facebook and has authorized our app");
            //the parameter needed in that case is just the users facebook id
            params = {'facebook_id':args.facebook_id};
            authenticateViaFacebook(params);
        }

    });


    $rootScope.updateSession = function () {
        //reads the session variables if exists
        console.log("Updated");
    };

    $rootScope.updateSession();

    // button functions
    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();
    };

    $scope.login = function () {
        Facebook.login();
    };

    $scope.logout = function () {
        Facebook.logout();
        $rootScope.session = {};
        //make a call to backend to logout
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }

    // Simple get user info
    $scope.getInfo = function () {
        FB.api('/' + $rootScope.session.facebook_id, function (response) {
            console.log('Good to see you, ' + response.name + '.');
        });
        $rootScope.info = $rootScope.session;

    };
}