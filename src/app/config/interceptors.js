angular.module ('app')
  .config(function ($httpProvider) {
    // Intercept all http responses
    $httpProvider.interceptors.push(['$q', function($q) {
      return {
        response: function(response) {
          return response || $q.when(response);
        },
        responseError: function(rejection) {
          return $q.reject(rejection);
        },
        request: function(config) {
          return config || $q.when(config);
        },
      };
    }]);
  });
