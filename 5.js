"use strict";

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
    var parsed = rawData.split("\n");

    parsed.length -= 1;

    return parsed;
}

function solveFirst(parsedData) {
    return checkNiceness(parsedData, niceRulesPartOne);
}

function solveSecond(parsedData) {
    return checkNiceness(parsedData, niceRulesPartTwo);
}

function checkNiceness(parsedData, niceRules) {
    var totalNiceCount = 0;

    for (let i = 0; i < parsedData.length; ++i) {
        for (let j = 0; j < niceRules.length; ++j) {
            if (!niceRules[j](parsedData[i])) {
                break;
            }

            (j === (niceRules.length - 1)) && ++totalNiceCount;
        }
    }

    return totalNiceCount;
}

var niceRulesPartOne = [
    (str) => {
        const threshold = 3;

        var vowels = ["a", "e", "i", "o", "u"];

        var vowelCount = 0;

        for (let i = 0; i < str.length; ++i) {
            vowels.indexOf(str[i]) > -1 && ++vowelCount;

            if (vowelCount >= threshold) {
                return true;
            }
        }

        return false;
    }, (str) => {
        var lookBehind;

        for (let i = 0; i < str.length; ++i) {
            if (lookBehind && str[i] === lookBehind) {
                return true;
            }

            lookBehind = str[i];
        }

        return false;
    }, (str) => {
        var bannedWords = ["ab", "cd", "pq", "xy"];

        for (let i = 0; i < bannedWords.length; ++i) {
            if (str.indexOf(bannedWords[i]) > -1) {
                return false;
            }
        }

        return true;
    }];

var niceRulesPartTwo = [
    (str) => {
        const tokenLength = 2;

        for (let i = 0; i < str.length - (tokenLength * 2 - 1); ++i) {
            let token = str.substring(i, i + tokenLength);

            let restOfString = str.substring(i + tokenLength);

            if (restOfString.indexOf(token) > -1) {
                return true;
            }
        }

        return false;
    }, (str) => {
        const lookBehindCount = 2;

        var lookBehind;

        for (let i = 0; i < str.length; ++i) {
            (i >= lookBehindCount) && (lookBehind = str.substring(i - lookBehindCount, i));

            if (lookBehind && str[i] === lookBehind[0]) {
                return true;
            }
        }

        return false;
    }];