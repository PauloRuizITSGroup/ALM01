var service = {
	results: [],
	execute: function () {
		$.response.contentType = "application/json";

		try {
			this.getCities();
			
			$.response.setBody(JSON.stringify({
				Success: true,
				Results: service.results,
				Message: undefined
			}));
		}
		catch(error) {
			$.response.setBody(JSON.stringify({
				Success: false,
				Results: [],
				Message: error.message
			}));
		}
	},
	getCities: function () {
		var sqlStatement = "SELECT * FROM \"ALM01.HANAModule::Location.Location\"";
			
		var conn = $.hdb.getConnection();
		var result = conn.executeQuery(sqlStatement);
		
		var cities = [];
		if (result.length > 0) {
			for (var row in result) {
				service.results.push(result[row]);
			}
		}
		
		conn.close();
	}
}

service.execute();
