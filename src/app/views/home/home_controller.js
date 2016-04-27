angular.module('app')
  .controller('HomeController', function($scope, $mdDialog) {

    // Materialize.toast('<span style="color:red">I am toast content</span>', 10000);

    // MessageService.add('car');
    $scope.open = function(event) {
      console.log('open');

      $mdDialog.show(
        $mdDialog.confirm()
          // .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .cancel('cancel')
          .targetEvent(event)
      ).then(function(response) {
        console.log(response+'--');
      },
      function(response) {
        console.log(response);
      });
    };

    console.log('From controller');
    console.log('Another log from controller');

    // MessageBox.okOnly('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ipsa enim explicabo dolore repellat voluptate, quaerat aperiam placeat reiciendis officia pariatur atque, consectetur voluptatum repudiandae, laborum recusandae esse eligendi dolorum.', 'A title', 'default', '30');

    $scope.test = {
      a: '1',
      b: 2,
      c: [3, 5, {
        a: 'a'
      }],
    };
  });
