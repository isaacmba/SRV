
var app = angular.module('app', ["ngMaterial","ngMdIcons","ui.router", "socialLogin",'md.data.table']);

// routing
app.config(


	function($stateProvider, $urlRouterProvider,socialProvider) {
		
		socialProvider.setLinkedInKey("77rfytzqxr2hp2");
		console.log(socialProvider);

		$stateProvider
			.state('login', {
				url:'/login',
				controller: 'LoginC',
				templateUrl: 'templates/Login.html'
				
			})
			.state('dash', { 
				// views: {
				// 	'sessions': {
				// 		templateUrl: 'dash-sessions.html',
				// 		controller: 'SessionController'
				// 	},
				// 	'searchbar' : {
				// 		templateUrl: 'dash-search.html',
				// 		controller: 'SearchController'
				// 	},
				// 	'portfolio': {
				// 		templateUrl: 'dash-portfolio.html',
				// 		controller: 'PortController',
				// 	},
				// 	'waitingroom': {
				// 		templateUrl: 'dash-waitingroom.html',
				// 		controller: 'WRController'
				// 	},
				// 	'profile': {
				// 		templateUrl: 'dash-profile.html',
				// 		controller:'ProfileController'
				// 	}
				// },
				url: '/dash',
				controller: 'DashC',
				templateUrl: 'templates/Dashboard.html',
				params:{
					user: null
				}
			})
			
			.state('dash.sessions',{
				url:'/dash',
				controller:'SessionController',
				templateUrl: 'templates/session.html'
			})
			.state('dash.portfolio',{
				url:'/dash',
				controller:'PortController',
				templateUrl: 'templates/portfolio.html'
			})	
			.state('dash.profile',{
				url:'/dash',
				controller:'ProfileController',
				templateUrl: 'templates/profile.html'
			})
			.state('dash.search',{
				url:'/dash',
				controller:'SearchController',
				templateUrl: 'templates/search.html'
			})			
			.state('dash.waitingroom',{
				url:'/dash/waitingroom',
				controller:'waitingroom',
				templateUrl: 'templates/waitingroom.html'
			})
			// .state('dash.compare')

			.state('admin',{
				url:'/admin',
				controller:'AdminC',
				templateUrl: 'templates/admin.html'
			})

		// $urlRouterProvider.otherwise('login');
		$urlRouterProvider.otherwise('dash');
	}
)
// .run(function($state){
// 		$state.go('SRV');
// 	})
	
	app.controller('DashC',function($scope,dash, $stateParams,$state,$http,crunch){
		// console.log($stateParams.user);
		// console.log(dash.user);
		// if(Object.keys(dash.user).length == 0 && $stateParams.user == null){
		// 	$state.go('login');
		// }
		// else{
			// dash.user = $stateParams.user;
			// console.log(dash.user);
			// $state.go('profile', user)
			$scope.sessions = dash.sessions;
			$scope.user = dash.user;
			$scope.portfolio = dash.portfolio;
			console.log($scope.user.uid);
		// }
		crunch.getInfo('ashton','kutcher')
			.success(function(data, status, headers, config){
				console.log(status);
				console.log(data.data);
				
			})
			.error(function(data, status, headers, config){
				console.log(status);
				if(status == 404){
					$state.go('login')
				}

		})

		$scope.addCrunchbase = function(name){
			name = name.toLowerCase();
			var first = name.split(' ').slice(0, -1).join(' ');
			var last = name.split(' ').slice(-1).join(' ');
			var cbinfo = crunch.getInfo(first,last);
			// var details = crunch.getDetails(first,last);	
		}


	    $scope.menu = [
	        {
	            link: '/dash',
	            title: 'Sessions/Protfolio',
	            icon: 'home',
	            ui: 'dash'
	        },
	        {
	            link: '/contacts',
	            title: 'Connections',
	            icon: 'group',
	            ui: 'contacts'
	        },
	        {
	          link : '/messages',
	          title: 'Messages',
	          icon: 'message',
	          ui: 'messages'
	        },
	        {
	            link: '/lamp',
	            title: 'Stuff',
	            icon: 'lightbulb_outline',
	            ui: 'stuff'
	        }
	    ]

		$scope.admin =  function(){
			$state.go('admin');
		}
		
		
	});

	app.controller('AdminC', function(dash, $scope,$state){
		this.myDate = new Date();
	})

	// profile Controller
	app.controller('ProfileC', function(dash,$scope, $stateParams, $state){
		console.log(dash.user);
		if(!dash.user.uid){
			$state.go('login');
		}
		$scope.user = dash.user;
		
	})

// Login controller
	// 'hi' yitz
	// 3 login state controls: login, logout, go to dashboard state. login page js invokes action from the function factory. the function factory takes care of 
	// whatever its asked. 
	app.controller('LoginC', ['$scope', '$mdDialog', '$state', 'crunch', function($scope, $mdDialog, $state, crunch){
	    var alert;
	    $scope.showDialog = showDialog;
	    var linkedinInfo;

	    

	    function showDialog() {
	       var parentEl = angular.element(document.body);
	       $mdDialog.show({
	         parent: parentEl,
	         template:
	             '<md-dialog ng-cloak flex="50" >' +
                    '<form>' +
                    
						'<md-dialog-actions  layout="column" >' +                    
                        '<md-button linked-in ng-click="login($event)" style="height: 100px; line-height: 100px;">' + 
                        '<!--  <ng-md-icon  icon="linkedin" style="fill: #0275d8"> --></ng-md-icon> ' + 
                        'Login w/LinkedIn</md-button>' +
                      '</md-dialog-actions>' +
                      '<md-dialog-actions layout="column" >' +
              
                        '<md-button ng-click="cancel()" style="height: 100px; line-height: 100px;">Cancel</md-button>' +
                      '</md-dialog-actions>' +
                    '</form>' +
                  '</md-dialog>',
	         controller: DialogController
	      });
	      function DialogController(dash,$scope, $mdDialog, socialLoginService, $state) {

	        $scope.cancel = function() {
	          $mdDialog.hide();
	        }
	        //retrieve user linkedin
			$scope.$on('event:social-sign-in-success', (event, userDetails)=> {

				$mdDialog.hide();
				console.log(userDetails);
				linkedinInfo = userDetails;
				
				
				userDetails.name = userDetails.name.toLowerCase();
				var first = userDetails.name.split(' ').slice(0, -1).join(' ');
				var last = userDetails.name.split(' ').slice(-1).join(' ');
				console.log(first + "     " + last);
				linkedinInfo.first = first;
				linkedinInfo.last = last;
				console.log(linkedinInfo);
				// checkCB(first,last);
				$state.go('dash');
			})
	      }
	    }
	  //   function splitName(name){
	  //   	name = name.toLowerCase();
	  //   	var f = name.split(' ').slice(0, -1).join(' ');
			// var l = name.split(' ').slice(-1).join(' ');
			// // return {f:f,l:l};
	  //   }

	    function checkCB(first,last){
	    	console.log('clicked');
	    	crunch.getInfo(first,last)
				.success(function(data, status, headers, config){
					console.log(status);
					console.log(data.data);
			
				})
				.error(function(data, status, headers, config){
					console.log(status);
					$scope.error = true;
					$scope.errormessage = "Your name doesnt see to be asscociated with a Crunchbase profile. If you use a different name for crunchbase enter it below.";
					
				})
	    }

	    $scope.closeDialog = function() {
	      $mdDialog.hide();
	    };
	}]);

	app.controller('waitingroomCtrl', ['$scope', 'dash',function($scope,dash){
		// $scope.sessions = dash.sessions;
		// $scope.user = dash.user;
		// // console.log($stateParams.id);
		// // console.log($scope.id)
		$scope.upcoming = dash.upcoming;
		console.log(dash);
		$scope.addSession = function(sessionId){
			dash.addUpcomingSession(sessionId);
		}
	}])



// function DialogController($scope, $mdDialog,socialLoginService) {

//  	$scope.$on('event:social-sign-in-success', (event, userDetails)=> {
// 		// $scope.result = userDetails;
// 		console.log(userDetails);
// 		$scope.$apply();
// 		$mdDialog.cancel();

// 	})


// 	$scope.$on('event:social-sign-out-success', function(event, userDetails){
// 		$scope.result = userDetails;
// 		console.log(userDetails);

// 	})
		

//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
// }