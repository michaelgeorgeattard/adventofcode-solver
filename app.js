var dataService = require("./dataService"),
	solver = require("./9.js");

dataService.getPuzzleInput(9)
	.then(function (data) {
		if (typeof solver.parse === "undefined") {
			console.error("No parse function defined. Aborting.");
		}
		
		var parsedData = solver.parse(data);
        
        if (!parsedData) {
            console.error("Failed to parse puzzle data. Aborting.");
        }
		
		for (var i = 1; i <= solver.solutions.length; ++i) {
			if (typeof solver.solutions[i-1] === "function") {
				var answer = solver.solutions[i-1](parsedData);
				
				console.log(`Solution for puzzle ${i} is ${answer}`);
			}
		}
	});