"use strict";

var three = require("./3.js");

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
    const rxp = /^(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)$/i;

    var splitRawData = rawData.split("\n");

    var parsedData = [];

    for (let i = 0; i < splitRawData.length; ++i) {
        if (splitRawData[i]) {
            var tokenized = rxp.exec(splitRawData[i]);

            if (tokenized && tokenized.length === 6) {
                parsedData.push({
                    name: tokenized[1],
                    startX: +tokenized[2],
                    startY: +tokenized[3],
                    endX: +tokenized[4],
                    endY: +tokenized[5]
                });
            }
        }
    }

    return parsedData;
}

function solveFirst(parsedData) {
    var grid = new Map();

    var meanings = {
        "toggle":   (currentValue) => {
                        return +!currentValue;
                    },   
        "turn on":  (currentValue) => {
                        return 1;
                    },      
        "turn off": (currentValue) => {
                        return 0;
                    }        
    };

    for (let i = 0; i < parsedData.length; ++i) {
        executeCommand(parsedData[i], grid, meanings);
    }

    return grid.size;
}

function solveSecond(parsedData) {
    var grid = new Map();

    var meanings = {
        "toggle":   (currentValue) => {
                        return currentValue + 2;
                    },   
        "turn on":  (currentValue) => {
                        return currentValue + 1;
                    },      
        "turn off": (currentValue) => {
                        return Math.max(currentValue - 1, 0);
                    }        
    };

    for (let i = 0; i < parsedData.length; ++i) {
        executeCommand(parsedData[i], grid, meanings);
    }
    
    var brightness = 0;
    
    grid.forEach(v => {
       brightness += v; 
    });

    return brightness;
}

function executeCommand(command, grid, meanings) {
    for (let x = command.startX; x <= command.endX; ++x) {
        for (let y = command.startY; y <= command.endY; ++y) {
            var value = grid.get(three.pairingFunction(x, y)) || 0;

            value = meanings[command.name](value);

            if (value) {
                grid.set(three.pairingFunction(x, y), value);
            }
            else {
                grid.delete(three.pairingFunction(x, y));
            }
        }
    }
}