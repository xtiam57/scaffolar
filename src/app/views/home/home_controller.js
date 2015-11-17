angular.module('app')
  .controller('HomeController', function($scope, MessageBox) {

    console.log('From controller');
    console.log('Another log from controller');

    MessageBox.okOnly('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ipsa enim explicabo dolore repellat voluptate, quaerat aperiam placeat reiciendis officia pariatur atque, consectetur voluptatum repudiandae, laborum recusandae esse eligendi dolorum.', 'A title');

    $scope.test = {
      a: '1',
      b: 2,
      c: [3],
    };
  });
