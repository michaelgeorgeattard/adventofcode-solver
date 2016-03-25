"use strict";

var _ = require("lodash");

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
    const rxp = /^([A-z]*) to ([A-z]*) = ([0-9]*)/;

    var splitRawData = rawData.split("\n");

    var parsedData = _.compact(_.map(splitRawData, str => {
        if (str) {
            var tokenized = rxp.exec(str);

            if (tokenized && tokenized.length === 4) {
                return {
                    from: tokenized[1],
                    to: tokenized[2],
                    distance: +tokenized[3]
                };
            }
        }
    }));

    return parsedData;
}

function solveFirst(parsedData) {
    var fromLocations = _.pluck(parsedData, "from");

    var toLocations = _.pluck(parsedData, "to");

    var uniqueLocations = _.union(fromLocations, toLocations);

    var routeMap = _.map(uniqueLocations, (location, idx) => {
        return _.pluck(_.filter(parsedData, "from", location), "to");
    });

    _.each(routeMap, (destinationRoutes, originIdx) => {
        let originLocation = uniqueLocations[originIdx];



        console.log(destinationRoutes);
    });

    console.log(uniqueLocations);
}

function solveSecond(parsedData) {

}

function getPossibleRoutes(start, end, parsedData) {
    var curr = start;

    do {
        var nextRouteLocations = getNextRouteLocations(curr, parsedData);

        _.each(nextRouteLocations, nextRouteLocation => {
            getNextRouteLocations(nextRouteLocation, parsedData);
        });

    } while (true);
}

function a() {
    var nextRoute
}

function getNextRouteLocations(current, parsedData) {
    return _.pluck(_.filter(parsedData, "from", current), "to");
}