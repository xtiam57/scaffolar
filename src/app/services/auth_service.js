angular.module('app')
  .factory('AuthService', function(RESTful, $q, $rootScope, $location, $timeout, StorageService) {

    var _loginUrl = '/login';
    var _afterLoginUrl = '/';
    var _storageType = 'session';

    var _redirect = function(route) {
      $timeout(function() {
        $location.path(route);
      });
    };

    var _setUser = function(user) {
      // StorageService.put('gUser', user, _storageType);
      // $rootScope.gUser = user;

      // // Setting the token
      // if (user && user.auth_token)
      //   StorageService.put('X-Auth-Token', user.auth_token, _storageType);
    };

    return {
      login: function(credentials) {
        // var deferred = $q.defer();

        // RESTful.post('auth', credentials)
        //   .then(function(response) {
        //     _setUser(response);
        //     _redirect(_afterLoginUrl);
        //     deferred.resolve(response);
        //   }, function(response) {
        //     deferred.reject(response);
        //   });

        // return deferred.promise;
      },

      logout: function() {
        // var self = this;
        // // Destroynig BE session
        // RESTful.post('auth/logout', { oauth_token: self.getToken() })
        //   .then(function(response) {
        //     self.destroy();
        //   },
        //   function(response) {
        //     self.destroy();
        //   });
      },

      destroy: function(param) {
        // // Destroynig FE session
        // $rootScope.gUser = undefined;
        // StorageService.remove('gUser', _storageType);
        // StorageService.remove('X-Auth-Token', _storageType);
        // _redirect(_loginUrl);
      },

      getUser: function() {
        // $rootScope.gUser = StorageService.get('gUser', _storageType);
        // return $rootScope.gUser;
      },

      getToken: function() {
        // return StorageService.get('X-Auth-Token', _storageType);
      },

      checkAuth: function() {
        // var deferred = $q.defer();

        // if(_(this.getUser()).isNull() || _(this.getUser()).isUndefined() || _(this.getUser()).isEmpty()) {
        //   deferred.reject('Not Authenticated');
        //   _redirect(_loginUrl);
        // } else {
        //   deferred.resolve('Welcome');
        // }
        // return deferred.promise;
      },
    };
  });
