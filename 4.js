var crypto = require("crypto");

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
	return rawData.trim();
}

function solveFirst(parsedData) {
	return bruteForce(parsedData, function (md5) {
		return md5.startsWith("00000");
	});
}

function solveSecond(parsedData) {
	return bruteForce(parsedData, function (md5) {
		return md5.startsWith("000000");
	});
}

function bruteForce(parsedData, cb) {
	var i = 0;
	
	while (++i) {
		var md5 = getMD5(`${parsedData}${i}`);
		
		if (cb(md5)) {		
			return i;
		}
	}
}

function getMD5(string) {
	return crypto.createHash("md5").update(string).digest("hex");
}