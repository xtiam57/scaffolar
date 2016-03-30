angular.module('app')
  .factory('DateHelper', function($filter) {
    return {
      isSame: function(date1, date2) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        return date1.isSame(date2);
      },
      isAfter: function(date1, date2, includeLimit) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        if (includeLimit)
          return date1.isAfter(date2) || date1.isSame(date2);
        return date1.isAfter(date2);
      },
      isBefore: function(date1, date2, includeLimit) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        if (includeLimit)
          return date1.isBefore(date2) || date1.isSame(date2);
        return date1.isBefore(date2);
      },
      isBetween: function(date1, min, max, includeLimit) {
        return this.isAfter(date1, min, includeLimit) && this.isBefore(date1, max, includeLimit);
      },
    };
  })

  .factory('TimeHelper', function($filter) {
    return {
      getDuration: function(date1, date2, period) {
        return Math.round(moment(date1).diff(moment(date2), period, true) * 100000) / 100000;
      },
      setTime: function(date1, time) {
        if (_(date1).isDate() && _(time).isDate()) {
          date1.setHours(time.getHours());
          date1.setMinutes(time.getMinutes());
          date1.setSeconds(time.getSeconds());
        }
        return date1;
      },
      addDuration: function(date1, duration, period) {
        return moment(date1).add(duration, period).toDate();
      },
      subtractDuration: function(date1, duration, period) {
        return moment(date1).subtract(duration, period).toDate();
      },
    };
  })

  .factory('StringHelper', function($filter) {
    return {
      generateGUID: function() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
    };
  })

  .factory('NumericHelper', function($filter) {
    return {
      round: function(value, decimals) {
        return parseFloat($filter('number')(value, decimals));
      },
      /**
      * Returns a random integer between min (inclusive) and max (inclusive)
      * Using Math.round() will give you a non-uniform distribution!
      */
      random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      toFraction: function(value) {
        return isNaN(value) ? value : Ratio.parse(value).simplify().toQuantityOf(2, 3, 4, 5, 8, 16, 32, 40).toLocaleString();
      },
    };
  })

  .factory('ArrayHelper', function($filter) {
    return {

    };
  });









