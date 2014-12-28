angular.module('app')
  .filter('conditional', function() {
    return function(input, trueText, falseText) {
      var t = trueText || 'Yes';
      var f = falseText || 'No';
      return input ? t : f;
    };
  });
