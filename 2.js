exports.solutions = [ solveFirst, solveSecond ];

exports.parse = function parse(rawData) {
	var split = rawData.split("\n");
	
	var parsedData = [];
	
	for (var i = 0; i < split.length; ++i) {
		var curr = split[i];
		
		if (curr) {
			var tokens = curr.split("x");
			
			if (tokens.length >= 3) {
				parsedData.push({
					length: +tokens[0],
					width: +tokens[1],
					height: +tokens[2]
				});
			}
		}
	}
	
	return parsedData;
}

function solveFirst(parsedData) {
	return calculateTotalWrappingPaper(parsedData);
}

function solveSecond(parsedData) {
	return calculateTotalRibbon(parsedData);
}

function calculateTotalWrappingPaper(parsedData) {
	var totalWrappingPaper = 0;
	
	for (var i = 0; i < parsedData.length; ++i) {
		totalWrappingPaper += calculateWrappingPaper(parsedData[i].length, parsedData[i].width, parsedData[i].height);
	}
	
	return totalWrappingPaper;
}

function calculateTotalRibbon(parsedData) {
	var totalRibbon = 0;
	
	for (var i = 0; i < parsedData.length; ++i) {
		totalRibbon += calculateRibbon(parsedData[i].length, parsedData[i].width, parsedData[i].height);
	}
	
	return totalRibbon;	
}

function calculateWrappingPaper(l, w, h) {	
	var a1 = l*w;
	var a2 = w*h;
	var a3 = h*l;
	
	var min = Math.min(a1, a2, a3);
	
	return 2*a1+2*a2+2*a3+min;
}

function calculateRibbon(l, w, h) {
	function calculateBasicRibbon(l, w, h) {
		var arr = [l, w, h];
		
		var largestIdx = 0;
		
		for (var i = 0; i < arr.length; ++i) {
			if (arr[i] >= arr[largestIdx]) {
				largestIdx = i;
			}
		}
		
		arr.splice(largestIdx, 1);
		
		var basicRibbon = 0;
		
		for (var i = 0; i < arr.length; ++i) {
			basicRibbon += 2*arr[i];
		}
		
		return basicRibbon;
	}
	
	var basicRibbon = calculateBasicRibbon(l, w, h);
	
	var bow = l*w*h;
		
	return basicRibbon + bow;
}