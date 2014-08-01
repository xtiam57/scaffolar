angular.module('app')
  .filter('home', function() {
    return function(input) {
      return input.toString().toUpperCase();
    };
  });
