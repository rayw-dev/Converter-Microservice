const math = require('mathjs');
const util = require('util');

class Unit {

    get Name(){
        return this._name;
    }
    set Name(value){
        this._name = value;
    }
    
    get Symbol(){
        return this._symbol;
    }
    set Symbol(value){
        this._symbol = value;
    }
}

class Conversion {
    get FromUnit(){
        return this._fromUnit;
    }
    set FromUnit(value){
        this._fromUnit = value;
    }
    
    get ToUnit(){
        return this._toUnit;
    }
    set ToUnit(value){
        this._toUnit = value;
    }

    get Formula(){
        return this._formula;
    }
    set Formula(value){
        this._toUnit = _formula;
    }
}

class Converter {
    set Name(value){
        this._name = value;
    }
    get Name(){
        return this._name;
    }

    set BaseUnit(value){
        this._baseUnit = value;
    }
    get BaseUnit(){
        return this._baseUnit;
    }

    set Conversions(value){
        this._conversions = value;
    }
    get Conversions(){
        return this._conversions;
    }

    Convert(value, fromUnit, toUnit){
        var conversion = Conversions.find(c => c.FromUnit === fromUnit && c.ToUnit === toUnit);
        if(!conversion) return null;

        var formula = util.format(conversion.Formula, value);

        return math.eval(formula);
    }
}