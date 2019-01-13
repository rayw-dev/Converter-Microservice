const math = require('mathjs');
const util = require('util');

module.exports = {
    Unit: class {

        get Name() {
            return this._name;
        }
        set Name(value) {
            this._name = value;
        }

        get Symbol() {
            return this._symbol;
        }
        set Symbol(value) {
            this._symbol = value;
        }

        get ConvertFrom() {
            return this._convertFrom;
        }
        set ConvertFrom(value) {
            this._convertFrom = value;
        }

        get ConvertTo() {
            return this._convertTo;
        }
        set ConvertTo(value) {
            this._convertTo = value;
        }

        constructor(name, symbol, convertTo, convertFrom) {
            this.Name = name;
            this.Symbol = symbol;
            this.ConvertTo = convertTo;
            this.ConvertFrom = convertFrom;
        }
    },
    Converter: class {

        get Name() {
            return this._name;
        }
        set Name(value) {
            this._name = value;
        }

        get BaseUnit() {
            return this._baseUnit;
        }
        set BaseUnit(value) {
            this._baseUnit = value;
        }

        get Units() {
            return this._units;
        }
        set Units(value) {
            this._units = value;
        }

        constructor() {
            this.Units = new Array();
        }

        Convert(value, fromUnit, toUnit) {

            if (fromUnit === toUnit) {
                return value; //No conversion required
            }

            //convert from to base unit if required
            var valueInBaseUnit = value;
            if (fromUnit !== this.BaseUnit) {
                //convert To Base
                var conversionToBase = this.Units.find(c => c.Name === fromUnit);
                if (!conversionToBase) return null;
                valueInBaseUnit = math.eval(util.format(conversionToBase.ConvertFrom, value));
            }

            //Convert to required unit
            var valueInRequiredUnit = valueInBaseUnit;
            if (toUnit !== this.BaseUnit) {
                //convert To Required
                var conversionToRequired = this.Units.find(c => c.Name === toUnit);
                if (!conversionToRequired) return null;
                valueInRequiredUnit = math.eval(util.format(conversionToRequired.ConvertTo, valueInBaseUnit));
            }

            return valueInRequiredUnit;
        }
    }
};