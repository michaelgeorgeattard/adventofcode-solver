var http = require("http"),
	q = require("q");

exports.getPuzzleInput = function (day) {
	var deferred = q.defer();

	http.get({
		hostname: "adventofcode.com",
		port: 80,
		path: `/day/${day}/input`,
		agent: false,
		headers: {"Cookie": "session={{Enter token here}}"}
	}, function (res) {
		var data = "";

		res.on("data", function (chunk) {
			data += chunk.toString("utf8");
		});

		res.on("end", function () {
			deferred.resolve(data);
		});
	});

	return deferred.promise;
}