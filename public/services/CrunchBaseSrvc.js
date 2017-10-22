app.factory('crunch',function($http){
	
	var details = [];
	var investments = [];


	return {
		details: details,
		investments: investments,
		getInfo : function(first,last){
			return $http.get('https://api.crunchbase.com/v3.1/people/'+first+'-'+last+'?user_key=2a3d08f3d5d44364196be2c6255e8187')
				.success(function(data, status, headers, config){
					console.log("Succes: "+status);
					// var I = data.data.relationships.investments.items;
					// var D = data.data.properties;
					// investments = I;
					// details = D;
					// console.log(investments);
					// console.log(details);

				})
				.error(function (data, status, headers, config){
					console.log("Error"+status)
			    });

			// .then(function(success, fail){
			// 	console.log(res.data);
			// 	var I = res.data.data.relationships.investments.items;
			// 	console.log(I);

			// 	for (var i = 0; i < I.length; i++) {
			// 		I[i].name = I[i].relationships.invested_in.properties.name;
			// 		I[i].employeeMin = I[i].relationships.invested_in.properties.num_employees_min;
			// 		I[i].employeeMax = I[i].relationships.invested_in.properties.num_employees_max; 
			// 		I[i].moneyRaised = I[i].relationships.funding_round.properties.money_raised;
					

			// 	}
			// 	console.log(I);
			// 	return I;
			// })
		},

		// compareTwo
	}

});
