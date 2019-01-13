'use strict';
const models = require('../api/models/converterModel.js');
const repository = require('../api/models/conversionsRepository.js');
var assert = require('assert');

var testResources = {
    temperatureTester: class{
        get Celcius() {
            return this._celcius;
        }
        set Celcius(value) {
            this._celcius = value;
        }
        get Fahrenheit() {
            return this._fahrenheit;
        }
        set Fahrenheit(value) {
            this._fahrenheit = value;
        }
        get Kelvin() {
            return this._kelvin;
        }
        set Kelvin(value) {
            this._kelvin = value;
        }
        get Rankine() {
            return this._rankine;
        }
        set Rankine(value) {
            this._rankine = value;
        }
        get Message() {
            return this._message;
        }
        set Message(value) {
            this._message = value;
        }

        constructor(celcius, fahrenheit, kelvin, rankine, message) {
            this.Celcius = celcius;
            this.Fahrenheit = fahrenheit;
            this.Kelvin = kelvin;
            this.Rankine = rankine;
            this.Message = message;
        }

        doTest(converter){
            //Celcius
            this.testConverter(converter, this.Celcius, this.Celcius, "Celcius", "Celcius", this.Message);
            this.testConverter(converter, this.Celcius, this.Fahrenheit, "Celcius", "Fahrenheit", this.Message);
            this.testConverter(converter, this.Celcius, this.Kelvin, "Celcius", "Kelvin", this.Message);
            this.testConverter(converter, this.Celcius, this.Rankine, "Celcius", "Rankine", this.Message);

            //Fahrenheit
            this.testConverter(converter, this.Fahrenheit, this.Fahrenheit, "Fahrenheit", "Fahrenheit", this.Message);
            this.testConverter(converter, this.Fahrenheit, this.Celcius, "Fahrenheit", "Celcius", this.Message);
            this.testConverter(converter, this.Fahrenheit, this.Kelvin, "Fahrenheit", "Kelvin", this.Message);
            this.testConverter(converter, this.Fahrenheit, this.Rankine, "Fahrenheit", "Rankine", this.Message);

            //Kelvin
            this.testConverter(converter, this.Kelvin, this.Kelvin, "Kelvin", "Kelvin", this.Message);
            this.testConverter(converter, this.Kelvin, this.Celcius, "Kelvin", "Celcius", this.Message);
            this.testConverter(converter, this.Kelvin, this.Fahrenheit, "Kelvin", "Fahrenheit", this.Message);
            this.testConverter(converter, this.Kelvin, this.Rankine, "Kelvin", "Rankine", this.Message);

            //Rankine
            this.testConverter(converter, this.Rankine, this.Rankine, "Rankine", "Rankine", this.Message);
            this.testConverter(converter, this.Rankine, this.Celcius, "Rankine", "Celcius", this.Message);
            this.testConverter(converter, this.Rankine, this.Fahrenheit, "Rankine", "Fahrenheit", this.Message);
            this.testConverter(converter, this.Rankine, this.Kelvin, "Rankine", "Kelvin", this.Message);
        }

        testConverter(converter, value, expected, fromUnit, toUnit, message){
            it(`should return ${expected} when converting ${value} ${fromUnit} to ${toUnit} (${message})`, function() {
                var diff = 0.0001;
                assert(Math.abs(expected-converter.Convert(value, fromUnit, toUnit)) < diff);
            });
        }
    },
    temperatureTestCases: function(){
        var testItems = new Array();
        testItems.push(new this.temperatureTester(-273.15, -459.67, 0.0, 0.0, "Absolute Zero"));
        testItems.push(new this.temperatureTester(-50, -58, 223.15, 401.67, "-50°C"));
        testItems.push(new this.temperatureTester(-40, -40, 233.15, 419.67, "-40°C"));
        testItems.push(new this.temperatureTester(-30, -22, 243.15, 437.67, "-30°C"));
        testItems.push(new this.temperatureTester(-20, -4, 253.15, 455.67, "-20°C"));
        testItems.push(new this.temperatureTester(-10, 14, 263.15, 473.67, "-10°C"));
        testItems.push(new this.temperatureTester(-9, 15.8, 264.15, 475.47, "-9°C"));
        testItems.push(new this.temperatureTester(-8, 17.6, 265.15, 477.27, "-8°C"));
        testItems.push(new this.temperatureTester(-7, 19.4, 266.15, 479.07, "-7°C"));
        testItems.push(new this.temperatureTester(-6, 21.2, 267.15, 480.87, "-6°C"));
        testItems.push(new this.temperatureTester(-5, 23, 268.15, 482.67, "-5°C"));
        testItems.push(new this.temperatureTester(-4, 24.8, 269.15, 484.47, "-4°C"));
        testItems.push(new this.temperatureTester(-3, 26.6, 270.15, 486.27, "-3°C"));
        testItems.push(new this.temperatureTester(-2, 28.4, 271.15, 488.07, "-2°C"));
        testItems.push(new this.temperatureTester(-1, 30.2, 272.15, 489.87, "-1°C"));
        testItems.push(new this.temperatureTester(0, 32, 273.15, 491.67, "0°C Freezing/Melting point of Water"));
        testItems.push(new this.temperatureTester(1, 33.8, 274.15, 493.47, "1°C"));
        testItems.push(new this.temperatureTester(2, 35.6, 275.15, 495.27, "2°C"));
        testItems.push(new this.temperatureTester(3, 37.4, 276.15, 497.07, "3°C"));
        testItems.push(new this.temperatureTester(4, 39.2, 277.15, 498.87, "4°C"));
        testItems.push(new this.temperatureTester(5, 41, 278.15, 500.67, "5°C"));
        testItems.push(new this.temperatureTester(6, 42.8, 279.15, 502.47, "6°C"));
        testItems.push(new this.temperatureTester(7, 44.6, 280.15, 504.27, "7°C"));
        testItems.push(new this.temperatureTester(8, 46.4, 281.15, 506.07, "8°C"));
        testItems.push(new this.temperatureTester(9, 48.2, 282.15, 507.87, "9°C"));
        testItems.push(new this.temperatureTester(10, 50, 283.15, 509.67, "10°C"));
        testItems.push(new this.temperatureTester(20, 68, 293.15, 527.67, "20°C"));
        testItems.push(new this.temperatureTester(21, 69.8, 294.15, 529.47, "21°C Room Temperature"));
        testItems.push(new this.temperatureTester(22.4100001, 72.33800018, 295.5600001, 532.00800018, "22.4100001°C Random specific value"));
        testItems.push(new this.temperatureTester(30, 86, 303.15, 545.67, "30°C"));
        testItems.push(new this.temperatureTester(37, 98.6, 310.15, 558.27, "37°C Average Human Body Temperature"));
        testItems.push(new this.temperatureTester(40, 104, 313.15, 563.67, "40°C"));
        testItems.push(new this.temperatureTester(50, 122, 323.15, 581.67, "50°C"));
        testItems.push(new this.temperatureTester(60, 140, 333.15, 599.67, "60°C"));
        testItems.push(new this.temperatureTester(70, 158, 343.15, 617.67, "70°C"));
        testItems.push(new this.temperatureTester(80, 176, 353.15, 635.67, "80°C"));
        testItems.push(new this.temperatureTester(90, 194, 363.15, 653.67, "90°C"));
        testItems.push(new this.temperatureTester(100, 212, 373.15, 671.67, "100°C Boiling point of Water"));
        testItems.push(new this.temperatureTester(200, 392, 473.15, 851.67, "200°C"));
        testItems.push(new this.temperatureTester(300, 572, 573.15, 1031.67, "300°C"));
        testItems.push(new this.temperatureTester(400, 752, 673.15, 1211.67, "400°C"));
        testItems.push(new this.temperatureTester(500, 932, 773.15, 1391.67, "500°C"));
        testItems.push(new this.temperatureTester(600, 1112, 873.15, 1571.67, "600°C"));
        testItems.push(new this.temperatureTester(700, 1292, 973.15, 1751.67, "700°C"));
        testItems.push(new this.temperatureTester(800, 1472, 1073.15, 1931.67, "800°C"));
        testItems.push(new this.temperatureTester(1000, 1832, 1273.15, 2291.67, "1000°C"));
        return testItems;
    }
}

describe('Temperature Conversion Tests', function() {
    var converter = repository.getConverter("Temperature");
    var testCases = testResources.temperatureTestCases();

    //run the testCases
    for (var i = 0, len = testCases.length; i < len; i++) {
        testCases[i].doTest(converter);
      }
});

