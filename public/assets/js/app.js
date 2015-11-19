var webApp = angular.module('webApp', ['FacebookProvider']);
// Main app config setup
webApp.run(function ($rootScope) {
    window.fbAsyncInit = function () {
        FB.init({
            appId:'1521128248199741',
            channelUrl: 'app/channel.html',
            status:true,
            cookie:true,
            xfbml:true,
            version: 'v2.5'
        });
        
        FB.Event.subscribe('auth.statusChange', function(response) {
            $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        });
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
});