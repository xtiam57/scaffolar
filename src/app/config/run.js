angular.module('app')
  .run(function($rootScope, $log, PageService) {
    // Acts like a before filer, trigger before render the view
    // Broadcasted before a route change. At this point the route services starts
    // resolving all of the dependencies needed for the route change to occur.
    // Typically this involves fetching the view template as well as any dependencies defined
    // in resolve route property. Once all of the dependencies are resolved $routeChangeSuccess
    // is fired.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      // TODO: check if the current route requires Auth and the user is logged in
    });


    // Broadcasted after a route dependencies are resolved. ngView listens
    // for the directive to instantiate the controller and render the view.
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      PageService.refresh();
    });


    // Broadcasted if any of the resolve promises are rejected.
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

    });


    // Fired when a requested state cannot be found using the provided state name during transition. The event is broadcast allowing any handlers a single chance to deal with the error (usually by lazy-loading the unfound state).
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

    });
  });
