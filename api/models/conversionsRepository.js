'use strict';
const models = require('../models/converterModel.js');

module.exports = {
    getConverter: function(convertertype){
        var converter = this.converters().find(c => c.Name === convertertype);
        if(!converter) return null;
        return converter;
    },
    converters: function(){
        //eventually these will be pulled from a datastore
        var converterArray = new Array();

        var temperatureConverter = new models.Converter();
        temperatureConverter.Name = "Temperature";
        temperatureConverter.BaseUnit = "Celcius";
        temperatureConverter.Units.push(new models.Unit("Fahrenheit", "F", "(%s * 9 / 5 + 32)", "((%s - 32) * 5 / 9))"));
        temperatureConverter.Units.push(new models.Unit("Kelvin", "K", "%s + 273.15", "%s - 273.15"));
        temperatureConverter.Units.push(new models.Unit("Rankine", "R", "(%s + 273.15) * 9 / 5", "((%s - 491.67) * 5 / 9))"));

        converterArray.push(temperatureConverter);

        return converterArray;
    }
};