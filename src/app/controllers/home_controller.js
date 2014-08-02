angular.module('app')
  .controller('HomeController', function($scope, HomeService) {
    $scope.variable = HomeService.get() + 'World!!';
    console.log('text');
  });
