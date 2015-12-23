"use strict";

exports.solutions = [solveFirst, solveSecond];

exports.parse = function parse(rawData) {
    const rxp = /^([a-z1]*\s)?([A-Z]*\s)?([a-z0-9]+)\s->\s([a-z]+)$/;

    var splitRawData = rawData.split("\n");

    var parsedData = [];

    for (let i = 0; i < splitRawData.length; ++i) {
        if (splitRawData[i]) {
            var tokenized = rxp.exec(splitRawData[i]);

            if (tokenized && tokenized.length === 5) {
                parsedData.push({
                    operandA: trim(tokenized[1]),
                    operator: trim(tokenized[2]),
                    operandB: trim(tokenized[3]),
                    outputRegister: tokenized[4]
                });
            }
        }
    }

    return parsedData;
}

function trim(str) {
    if (str) {
        return str.trim();
    }
    else return str;
}

function solveFirst(parsedData) {
    return solveCircuit(parsedData, "a");
}

function solveSecond(parsedData) {
    var gate = findGate(parsedData, "b");

    gate.operandA = undefined;
    gate.operandB = solveFirst(parsedData);
    gate.operator = undefined;
    gate.outputRegister = "b";
    
    return solveCircuit(parsedData, "a");
}

function solveCircuit(parsedData, requiredOutput) {
    var wireSignalState = {};

    while (!buildCircuit(parsedData, requiredOutput, wireSignalState));

    return wireSignalState[requiredOutput];
}

function buildCircuit(parsedData, requiredOutput, wireSignalState) {
    var gate = findGate(parsedData, requiredOutput);

    try {
        var result = processGate(gate, wireSignalState);
        
        // Found signal source
        
        result < 0 && (result = (2 << 15) + result);

        wireSignalState[gate.outputRegister] = result;

        return true;
    }
    catch (missingSignalSource) {
        buildCircuit(parsedData, missingSignalSource, wireSignalState);

        return false;
    }
}

function processGate(gate, wireSignalState) {
    if (gate) {
        var $ = getOperandValue.bind(wireSignalState);

        if (!gate.operator) {
            return $(gate.operandB);
        }
        else if (gate.operator === "NOT") {
            return ~$(gate.operandB);
        }
        else if (gate.operator === "AND") {
            return $(gate.operandA) & $(gate.operandB);
        }
        else if (gate.operator === "OR") {
            return $(gate.operandA) | $(gate.operandB);
        }
        else if (gate.operator === "LSHIFT") {
            return $(gate.operandA) << $(gate.operandB);
        }
        else if (gate.operator === "RSHIFT") {
            return $(gate.operandA) >> $(gate.operandB);
        }
    }
}

function findGate(parsedData, requiredOutput) {
    for (let i = 0; i < parsedData.length; ++i) {
        if (parsedData[i].outputRegister === requiredOutput) {
            return parsedData[i];
        }
    }
    return null;
}

function getOperandValue(operand) {
    var val = +operand;

    if (!isNaN(val)) {
        return val;
    }

    if (typeof this[operand] === "undefined") {
        throw operand;
    }
    return this[operand];
}