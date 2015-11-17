angular.module('app')
  .factory('AlertService', function($rootScope, $timeout) {

    var _notifications = {
      sticky: [],
      currentRoute : []
    };

    $rootScope.getAlerts = function() {
      return [].concat(_notifications.sticky, _notifications.currentRoute);
    };

    var _pushAlert = function(alertArray, alert) {
      if (!_.isObject(alert)) {
        throw new Error('Only objects can be added to the Alert Service');
      }
      _notifications.currentRoute.push(alert);
      return alert;
    };

    var _createAlert = function(alert) {
      var defaults = {
        duration: false,
        type: 'info',
        message: '',
        title: '',
        icon: '',
        trace: '',
        expired: false,
        close: function() {
          return alertService.close(this);
        }
      };

      return _.extend(defaults, alert);
    };

    var _triggerTimer = function(alert) {
      if (alert.duration) {
        $timeout(function() {
          alert.close();
        }, alert.duration * 1000);
      }
      return alert;
    };

    var alertService = {

      stick: function(alert) {
        return _pushAlert(_notifications.sticky, _createAlert(alert));
      },

      show: function(alert) {
        return _pushAlert(_notifications.currentRoute, _triggerTimer(_createAlert(alert)));
      },

      close: function(alert) {
        _.each(_notifications, function(notificationsByType) {
          var idx = notificationsByType.indexOf(alert);
          if (idx > -1) {
            alert.expired = true;
            notificationsByType.splice(idx, 1);
          }
        });
      },

      clear: function() {
        _.each(_notifications, function(notificationsByType) {
          notificationsByType = [];
        });
      }
    };

    return alertService;
  });
