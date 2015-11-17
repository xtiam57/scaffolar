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
      template: '<div class="panel panel-warning" style="margin: 5px 0"><div class="panel-heading">Debugging: <code ng-if="debug">{{ debug }}</code></div><div class="panel-body small"><json-formatter open="open" json="json"></json-formatter></div></div>',
      link: function(scope, element, attrs) {
        if (_(scope.open).isEmpty()) {
          scope.open = 1;
        }
      },
    };
  });
