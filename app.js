var dataService = require("./dataService"),
	solver = require("./6.js");

dataService.getPuzzleInput(6)
	.then(function (data) {
		if (typeof solver.parse === "undefined") {
			console.error("No parse function defined. Aborting");
		}
		
		var parsedData = solver.parse(data);
		
		for (var i = 1; i <= solver.solutions.length; ++i) {
			if (typeof solver.solutions[i-1] === "function") {
				var answer = solver.solutions[i-1](parsedData);
				
				console.log(`Solution for puzzle ${i} is ${answer}`);
			}
		}
	});