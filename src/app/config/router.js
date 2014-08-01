angular.module ('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'templates/home.tpl.html',
      });

    $urlRouterProvider.otherwise('/');
  });
