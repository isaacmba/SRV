app.factory('crunch',function($http){

	var crunch = {};
	
	crunch.getPerson = function(first,last){
		return $http.get('https://api.crunchbase.com/v3.1/people/'+first+'-'+last+'?user_key=2a3d08f3d5d44364196be2c6255e8187').then(function(res){
			console.log(res.data);
			crunch.Investments = res.data.data.relationships.investments.items;
			console.log(crunch.Investments);

			for (var i = 0; i < crunch.Investments.length; i++) {
				crunch.Investments[i].name = crunch.Investments[i].relationships.invested_in.properties.name;
				crunch.Investments[i].employeeMin = crunch.Investments[i].relationships.invested_in.properties.num_employees_min;
				crunch.Investments[i].employeeMax = crunch.Investments[i].relationships.invested_in.properties.num_employees_max; 
				crunch.Investments[i].moneyRaised = crunch.Investments[i].relationships.funding_round.properties.money_raised;
				

			}
			return crunch.Investments;
		})
	}

	return crunch;
});