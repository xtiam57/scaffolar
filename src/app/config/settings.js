angular.module ('app')
  .config(function ($logProvider, $locationProvider, RestangularProvider, API) {
    // Log configuration
    $logProvider.debugEnabled(true);

    // Setting the base URL for Restangular
    // RestangularProvider.setBaseUrl(API.url);

    // With this, We are telling Restangular to cache all request
    // We are improving latency
    // We are allowing offline work
    // RestangularProvider.setDefaultHttpFields({ cache: false });

    // Setting this property to true will elimate the # from all URLs
    // $locationProvider.html5Mode(false);
  });
