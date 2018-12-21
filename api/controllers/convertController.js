'use strict';
const repository = require('../models/conversionsRepository.js');

exports.convert = function (req, res) {
    var converter = repository.getConverter(req.body.ConvertType);

    if(!converter) {
        res.status(404).send('Not Found');
        return;
    }

    var converted = converter.Convert(req.body.Value, req.body.FromUnit, req.body.ToUnit);
    var result = {
        FromUnit: req.body.FromUnit,
        FromValue: req.body.Value,
        ToUnit: req.body.ToUnit,
        ToValue: converted
    };
    res.status(200).json(result);
};