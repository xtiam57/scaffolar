angular.module('app')
  .directive('home', function() {
    return {
      priority: 0,
      template: '<div>This a <strong>Directive</strong></div>',
      replace: true,
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs, ngModel) {

      }
    };
  });
