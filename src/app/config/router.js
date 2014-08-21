angular.module ('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'views/home.tpl.html',
        title: 'Home'
      });

    $urlRouterProvider.otherwise('/');
  });
