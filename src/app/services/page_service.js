angular.module('app')
  .factory('PageService', function ($rootScope, $state) {
    return {
      refresh: function() {
        if ($state.is($state.current.name)) {
          $rootScope.page = {
            title : $state.current.title,
          };
        }
      },
    };
  });


