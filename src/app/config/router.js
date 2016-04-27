angular.module ('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/views/home/home.tpl.html',
        // The following line, is for routes that require authentication
        // resolve: { authRequired: ['AuthService', function(a) { return a.checkAuth(); }] },
        title: 'Home',
      });

    $urlRouterProvider.otherwise('/');
  });
