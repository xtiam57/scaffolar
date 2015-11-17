angular.module('app')
  .factory('MessageBox', function($uibModal) {
    return {
      okOnly: function(message, title, type, size, backdrop) {
        return this.open(message, 0, title, type, size, backdrop);
      },

      okCancel: function(message, title, type, size, backdrop) {
        return this.open(message, 1, title, type, size, backdrop);
      },

      yesNoCancel: function(message, title, type, size, backdrop) {
        return this.open(message, 2, title, type, size, backdrop);
      },

      yesNo: function(message, title, type, size, backdrop) {
        return this.open(message, 3, title, type, size, backdrop);
      },

      /**
       * Open a modal
       * @param  {String} message
       * @param  {Int} buttons
       *         0: OKOnly (Displays OK button only.)(default)
       *         1: OKCancel (Displays OK and Cancel buttons.)
       *         2: YesNoCancel (Displays Yes, No, and Cancel buttons.)
       *         3: YesNo (Displays Yes and No buttons.)
       * @param  {String} title
       * @param  {String} type     default(default)|danger|success|warning|info|primary
       * @param  {[type]} size     sm(default)|lg
       * @param  {[type]} backdrop
       *         true: (default)
       *         false: backdrop is present but modal window is not closed when clicking outside of the modal window
       * @return {Promise}          positives: ok|yes, negatives: no|cancel
       */
      open: function(message, buttons, title, type, size, backdrop) {
        if (!_([0, 1, 2, 3]).contains(buttons))
          buttons = 0;

        if (!_(['default', 'success', 'warning', 'danger', 'info', 'primary']).contains(type))
          type = 'default';

        if (!_(['sm', 'lg']).contains(size))
          size = null;

        if (!_([true, false]).contains(backdrop))
          backdrop = true;

        return $uibModal.open({
          templateUrl: 'app/services/messageBox/messageBox.tpl.html',
          controller: ['$scope', '$uibModalInstance', 'message', 'buttons', 'title', 'type', function($scope, $uibModalInstance, message, buttons, title, type) {
            $scope.message = message;
            $scope.buttons = buttons;
            $scope.title = title;
            $scope.type = type;

            $scope.ok = function (button) {
              $uibModalInstance.close(button);
            };
            $scope.cancel = function (button) {
              $uibModalInstance.dismiss(button);
            };
          }],
          backdrop: backdrop,
          size: size,
          resolve: {
            message: function () { return message; },
            buttons: function () { return buttons; },
            title: function () { return title; },
            type: function () { return type; },
          }
        }).result;
      },
    };
  });
