angular.module ('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/views/home/home.tpl.html',
        title: 'Home'
      });

    $urlRouterProvider.otherwise('/');
  });
