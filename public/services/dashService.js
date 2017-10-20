app.factory('dash', ['$state', '$http',function($http,$state){
	


	var dashData = {};

	dashData.addUpcomingSession = function(id){
		dashData.sessions.push(dashData.upcoming[id]);
		console.log(dashData.sessions);
	}
	

	dashData.sessions = [
		{
			id: 1,
			data: 
			{
				date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		},	
		{
			id: 2,
			data: 
			{
				date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		},	
		{
			id: 3,
			data: 
			{
				date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
				timeToStart:'5:00'

			}
		}
		
		
	];

    dashData.user = {};

    dashData.upcoming = [
    	{
    		id:1, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},{
    		id:2, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},{
    		id:3, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},{
    		id:4, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},{
    		id:5, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},{
    		id:6, 
    		data : {
    			date: 'Tuesday 8/30/12',
				time: '11:00 - 12:00 EST',
				title: 'Title',
    		}
    	},
    ]

    return dashData;
}])