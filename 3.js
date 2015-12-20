/* global Map */

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
	return rawData;
}

function solveFirst(parsedData) {
	return getNumberOfVisitedHouses(parsedData, 1);
}

function solveSecond(parsedData) {
	return getNumberOfVisitedHouses(parsedData, 2);
}

function getNumberOfVisitedHouses(parsedData, santaCount) {
	var houseMap = new Map();
	
	// Initial position set to highest possible value,
	// as pairing function does not accept negative
	// integer values.
	
	var pos = [];
	
	for (var i = 0; i < santaCount; ++i) {
		pos[i] = {
			x: parsedData.length,
			y: parsedData.length
		};
		
		addToHouseList(houseMap, pos[i]);
	}

	for (var i = 0; i < parsedData.length; ++i) {
		var santaNumber = i % santaCount;
		
		switch (parsedData[i]) {
			case '^': --pos[santaNumber].y;
				break;
			case 'v': ++pos[santaNumber].y;
				break;
			case '<': --pos[santaNumber].x;
				break;
			case '>': ++pos[santaNumber].x;
				break;
		}

		addToHouseList(houseMap, pos[santaNumber]);
	}

	return houseMap.size;
}

/**
 *	Cantor pairing function. Only unique when a,b >= 0
 **/
function pairingFunction(a, b) {
	return ((a + b) * (a + b + 1) / 2) + b;
}

function addToHouseList(houseList, pos) {
	var pairKey = pairingFunction(pos.x, pos.y);

	var currentHouseCount = houseList.get(pairKey);

	houseList.set(pairKey, ++currentHouseCount || 1);
}