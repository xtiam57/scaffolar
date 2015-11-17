angular.module('app')
  .factory('StorageService', function(CacheFactory) {

    var _localCache = CacheFactory.createCache('app-local', {
      storageMode: 'localStorage',
    });

    var _sessionCache = CacheFactory.createCache('app-session', {
      storageMode: 'sessionStorage',
    });

    var _isSession = function(type) {
      return !_(type).isEmpty() &&
             (type.toLowerCase() === 'session' || type.toLowerCase() === 's');
    };

    return {
      get: function(key, storageType) {
        if (_isSession(storageType))
          return _sessionCache.get(key);

        return _localCache.get(key);
      },
      put: function(key, value, storageType) {
        if (_isSession(storageType))
          return _sessionCache.put(key, value);

        return _localCache.put(key, value);
      },
      remove: function(key, storageType) {
        if (_isSession(storageType))
          return _sessionCache.remove(key);

        return _localCache.remove(key);
      },
      removeAll: function(storageType) {
        if (_isSession(storageType))
          _sessionCache.removeAll();

        _localCache.removeAll();
      },
      info: function(storageType) {
        if (_isSession(storageType))
          return _sessionCache.info();

        return _localCache.info();
      },
    };
  });
