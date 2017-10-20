
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
				url: '/dash',
				controller: 'DashC',
				templateUrl: 'templates/Dashboard.html',
				params:{
					user: null
				}
			})
			.state('profile',{
				url:'/profile/:uid',
				controller:'ProfileC',
				templateUrl:'templates/profile.html',
				params: {
					user: null
				}
			})
			.state('waitingroom',{
				url: '/waitingroom/:id',
				// controller: function($stateParams,$scope,dash){
				// 	console.log($stateParams.id);
				// 	// var id = $stateParams.id;
				// 	// $scope.session = dash.sessions.id.data;
				// },
				controller: 'waitingroomCtrl',
				templateUrl: 'templates/waitingroom.html'
			})
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
		if(Object.keys(dash.user).length == 0 && $stateParams.user == null){
			$state.go('login');
		}
		else{
			// dash.user = $stateParams.user;
			// console.log(dash.user);
			// $state.go('profile', user)
			$scope.sessions = dash.sessions;
			$scope.user = dash.user;
			$scope.portfolio = dash.portfolio;
			console.log($scope.user.uid);
		}
		$scope.investments = crunch.getPerson('ashton','kutcher');
		console.log($scope.investments);

		$scope.addCrunchbase = function(name){
			name = name.toLowerCase();
			var first = name.split(' ').slice(0, -1).join(' ');
			var last = name.split(' ').slice(-1).join(' ');
			var person = crunch.getPerson(first,last);
			console.log(person);
			$scope.investments = person;
			
		}

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
	app.controller('LoginC', ['$scope', '$mdDialog', '$state', function($scope, $mdDialog, $state){
	    var alert;
	    $scope.showDialog = showDialog;
	    $scope.items = [1,2,3];

	     function showDialog() {
	       var parentEl = angular.element(document.body);
	       $mdDialog.show({
	         parent: parentEl,
	         // targetEvent: $event,
	         template:
	             '<md-dialog ng-cloak flex="50" >' +
                    '<form>' +
                    
		'                      <md-dialog-actions  layout="column" >' +                    
                        '<md-button linked-in ng-click="login($event)" style="height: 100px; line-height: 100px;">' + 
                        '<!--  <ng-md-icon  icon="linkedin" style="fill: #0275d8"> --></ng-md-icon> ' + 
                        'Login w/LinkedIn</md-button>' +
                      '</md-dialog-actions>' +
                      '<md-dialog-actions layout="column" >' +
              
                        '<md-button ng-click="cancel()" style="height: 100px; line-height: 100px;">Cancel</md-button>' +
                      '</md-dialog-actions>' +
                    '</form>' +
                  '</md-dialog>',
	         locals: {
	           items: $scope.items
	         },
	         controller: DialogController
	      });
	      function DialogController(dash,$scope, $mdDialog, socialLoginService, $state) {

	        $scope.cancel = function() {
	          $mdDialog.hide();
	        }
	        //retrieve user linkedin
			$scope.$on('event:social-sign-in-success', (event, userDetails)=> {
				$scope.result = userDetails;
				$mdDialog.hide();
				console.log(userDetails);
				dash.user = userDetails;
				$state.go('dash', {user: userDetails});

			})
	      }
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

	app.controller('dashCtrl', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog,$mdMedia){

	    $scope.loginPopup = function(ev){
	      // console.log($mdDialog.confirm); 
		  	 var confirm = $mdDialog.confirm({
				controller: DialogController,
				templateUrl: 'dialog1.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
			})

			$mdDialog.show(confirm);
		  };



		  $scope.admin = function(ev){
		  	
		  };

		  
	        
    

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
});

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