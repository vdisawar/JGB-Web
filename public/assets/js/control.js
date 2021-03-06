webApp.controller('mainController', function mainController(Facebook, $scope, $rootScope, $http, $location) {
    $scope.info = {};
    $scope.loginAction = true;
    $rootScope.facebook_id = 0;
    $scope.lobbies = [];
    $scope.picturesDisplay = [];
    $scope.show = [];
    $scope.pictures = [[{
        author: "Vishal",
        time: "00:11:22"
    }, {
        author: "Josh",
        time: "00:11:22"
    }],[{
        author: "Mallory",
        time: "00:11:22"
    }, {
        author: "Jake",
        time: "00:11:22"
    }]
    ];
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

        $rootScope.facebook_id = args.facebook_id;

        if (args.userNotAuthorized === true) {
            //if the user has not authorized the app, we must write his credentials in our database
            console.log("user is connected to facebook but has not authorized our app");
            // Update session
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
        $scope.loginAction = false;
    };

    $scope.logout = function () {
        Facebook.logout();
        $rootScope.session = {};
        $scope.loginAction = true;
        alert("Success you logged out");
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

    // Get lobbies based on face book id
    $scope.getLobbies = function() {
        var id = $rootScope.facebook_id;
        $http.get('/api/Lobbies/get', {headers: {
            'x-facebook-id': id
            }
        }).then(function(response) {
                $scope.lobbies = response.data.data;
                for (var i = 0 ; i < lobbies.length; i++) {
                    show[i] = false;
                };
        });
    };

    //Convert array to base 64 to show photo
    $scope.arrayBufferToBase64 = function( image ) {
        var base64String = '';
        var bytes = new Uint8Array( image );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            base64String += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( base64String );
    }

    // Use lobby id to get pictures
    $scope.getPictures = function(lobby,key) {
        var id = $rootScope.facebook_id;
        var config = {headers: {
            'x-facebook-id': id
            }
        };
        $http.post('/api/Pictures/get', {lobbyId: lobby._id}, config).then(function(response) {
             $scope.picturesDisplay[key] = response.data.data;
             $scope.show[key] = true;
        });
    };

    //Hide pictures
    $scope.hidePictures = function(key) {
        $scope.picturesDisplay[key] = [];
        $scope.show[key] = false;
    };
});
