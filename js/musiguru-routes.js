app.config(function($routeProvider){
	
	$routeProvider
	.when('/',{
			templateUrl:"html/home.html",
			controller:"Homectrl"
		})
	.when('/library',{
			templateUrl:"html/library.html",
			controller:"Libraryctrl"
		})
	.when('/lessonboard/:categoryid/:moduleid/:serialno',{
			templateUrl:"html/lessonboard.html",
			controller:"LessonBoardctrl"
		})
	.when('/modules/:categoryId',{
			templateUrl:"html/modules.html",
			controller:"Modulesctrl"
		})
	.when('/privacy',{
			templateUrl:"html/privacy.html",
			controller:"Footerctrl"
		})
	.when('/terms',{
		templateUrl:"html/terms.html",
		controller:"Footerctrl"
	})
	.when('/introduction',{
		templateUrl:"html/registration/symphony_new.html",
		controller:"SymphoneyHomeCntrl"
	})
	.when('/register/:location', {
        templateUrl: 'html/registration/register.html',
        controller: "RegisterCntl"
    })
	.when('/postregister', {
        templateUrl: 'html/registration/post_choir_registration.html',
        controller: "PostRegisterCntl"
    })
	.when('/partner-signup', {
        templateUrl: 'html/registration/assoicateRegister.html',
        controller: "Associatectrl"
    })
	.when('/partner-terms', {
        templateUrl: 'html/registration/partnerterms.html',
        controller: "AssociateTermsctrl"
    })
	/*.when('/post-partner-signup', {
        templateUrl: 'html/registration/post_assoicateRegister.html',
        controller: "PostAssociateRegisterCntl"
    })*/
	.when('/mydashboard', {
        templateUrl: 'html/post_login.html',
        controller: "PostLoginCntl"
    })
	.when('/mylessonboard/:moduleid/:serialno', {
        templateUrl: 'html/mylessonboard.html',
        controller: "MyLesonboardCntl"
    })
	.when('/studentactivate/:activatationcode', {
        templateUrl: 'html/home.html',
        controller: "StudentActivateCntl"
    })
	.when('/partner', {
        templateUrl: 'html/partnerpage.html',
        controller: "PartnerCntl"
    }).otherwise({redirectTo: '/'});
	
});
app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
})