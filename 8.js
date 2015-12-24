"use strict";

var _ = require("lodash");

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
    var parsed = rawData.split("\n");

    parsed.length -= 1;

    return parsed;
}

function solveFirst(parsedData) {
    var totalStringLength = _.sum(parsedData, str => {
        return str.length;
    });

    var memorySize = _.sum(parsedData, str => {
        return eval(str).length;
    })

    return totalStringLength - memorySize;
}

function solveSecond(parsedData) {
    var totalEncodeStringLength = _.sum(parsedData, str => {
        var strLength = str.length;
        
        var modifiedStr = str.substring(1, str.length - 1);
        
        strLength += 4;
        
        strLength += _.sum(modifiedStr.match(/(\\")|(\\)/g) || [], match => {
            if (match.indexOf("\"") !== -1) {
                return 2;
            }
            
            else return 1;    
        });
        
        return strLength;
    });

    var totalStringLength = _.sum(parsedData, str => {
        return str.length;
    });
    
    return totalEncodeStringLength - totalStringLength;
}