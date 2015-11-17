angular.module('app')
  .factory('MessageService', function(AlertService) {

    var _icon = '',
        _alert = null,
        _message = '';

    var _getMessage = function(type, message, success, icon, duration, trace) {
      return {
        type: type,
        message: message,
        title: success,
        trace: trace,
        icon: icon,
        duration: duration,
      };
    };

    return {
      add: function(resource) {
        _icon = 'fa fa-plus';
        _message = 'The <i class="bold">' + resource + '</i> has been added correctly';
        _alert = _getMessage('success', _message, 'Succesfully added', _icon, 5);
        AlertService.show(_alert);
      },

      update: function(resource) {
        _icon = 'fa fa-save';
        _message = 'The <i class="bold">' + resource + '</i> has been updated correctly';
        _alert = _getMessage('success', _message, 'Succesfully updated', _icon, 5);
        AlertService.show(_alert);
      },

      delete: function(resource) {
        _icon = 'fa fa-trash-o';
        _message = 'The <i class="bold">' + resource + '</i> has been deleted correctly';
        _alert = _getMessage('success', _message, 'Succesfully deleted', _icon, 5);
        AlertService.show(_alert);
      },

      info: function(title, message, trace){
        _icon ='fa fa-info-circle';
        _alert = _getMessage('info', message, title, _icon, 10, trace);
        AlertService.show(_alert);
      },

      warning: function(title, message, trace){
        _icon = 'fa fa-warning';
        _alert = _getMessage('warning', message, title, _icon, 10, trace);
        AlertService.show(_alert);
      },

      error: function(message, trace){
        _icon = 'fa fa-times-circle';
        _alert = _getMessage('danger', message, 'An error has occurred', _icon, 15, trace);
        AlertService.show(_alert);
      }
    };
  });
