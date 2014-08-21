angular.module('app')
  .factory('HomeService', function() {
    return {
      get: function() {
          return 'Pop ';
      },
    };
  });
