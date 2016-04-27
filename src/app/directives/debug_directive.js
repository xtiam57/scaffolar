angular.module('app')
  .directive('debug', function() {
    return {
      restrict: 'A',
      scope: {
        debug: '@',
        json: '=',
        open: '@'
      },
      replace: true,
      template: '<div><json-formatter open="open" json="json"></json-formatter></div>',
      link: function(scope, element, attrs) {
        if (_(scope.open).isEmpty()) {
          scope.open = 1;
        }
      },
    };
  });
