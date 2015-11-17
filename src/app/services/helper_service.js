angular.module('app')
  .factory('HelperService', function($filter) {
    return {
      DateHelper: {
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
      },
      TimeHelper: {

      },
      StringHelper: {

      },
      ObjectHelper: {

      },
      NumericHelper: {

      },
      ArrayHelper: {

      }
    };
  });
