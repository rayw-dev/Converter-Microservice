'use strict';
const converters = require('../models/converterModel.js');

exports.convert = function (req, res) {
    var tempConverter = converters.GenerateTemperatureConverter();
    var converted = tempConverter.Convert(req.body.Value, req.body.FromUnit, req.body.ToUnit);

    var result = {
        FromUnit: req.body.FromUnit,
        FromValue: req.body.Value,
        ToUnit: req.body.ToUnit,
        ToValue: converted
    };
    res.json(result);
}