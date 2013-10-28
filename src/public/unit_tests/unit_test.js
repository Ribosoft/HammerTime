function UnitTest(func, input, output)
{
    this._Input = input || new Array(); 
    this._Output = output || new Array();
    this._func = func;
}

//input is an array of parameters to be passed to the function
//output is a single-value expected return value
UnitTest.prototype.AddNewCase = function (input,  output)
{
    this._Input.push(input);
    this._Output.push(output);
}

//inputs is an array of arrays of parameters to be passed to the function
//outputs is an array of expected single-value return values
UnitTest.prototype.AddAllCases = function(inputs, outputs)
{
    this._Input = this._Input.concat(inputs);
    this._Output = this._Output.concat(outputs);
};


var compare = function(comparator){
    return function(unitTest, obj){
	var thisArg = obj || null;
	var res = "Test\t\tInput\t\tOuput\t\tExpected\t\tP/F\n";
	for(var ii = 0; ii < unitTest._Input.length; ++ii)
	{
	    var expectedOutput = unitTest._Output[ii];
	    var output = unitTest._func.apply(thisArg, unitTest._Input[ii]);

	    var pass = comparator(expectedOutput, output);
	    
	    res +=  "T" + ii + "\t\t";
	    res += unitTest._Input[ii] + "\t\t" + output + "\t\t" + expectedOutput +"\t\t\t" + (pass? "pass":"fail") + '\n' ;
	}
	return res;
    };	
};

var floatCompare = function (unitTest, tolerance, obj)
{
    var tolerance = tolerance || 0.01;
    return compare(function(expected, actual){
	return Math.abs(actual - expected) <= tolerance;
    })(unitTest, obj);
}


var objectCompare = function (unitTest, obj)
{
    return compare(function(expected, actual){
	return JSON.stringify(expected) == JSON.stringify(actual);
    })(unitTest, obj);
}

var stringCompare = function(unitTest, obj){
    return compare(function(expected, actual){
	return expected == actual;
    })(unitTest, obj);
};

var containsString = function(unitTest, obj){
    var contains = function(str, substr){
	return str.indexOf(substr) !== -1;
    };

    var thisArg = obj || null;
    var res = "Test\t\tInput\t\tOuput\t\tExpected\t\tP/F\n";
    for(var ii = 0; ii < unitTest._Input.length; ++ii)
    {
	var expectedSubstr = unitTest._Output[ii];
	var output = unitTest._func.apply(thisArg, unitTest._Input[ii]);

	var pass = contains(output, expectedSubstr);
	
	res +=  "T" + ii + "\t\t";
	res += unitTest._Input[ii] + "\t\t" + output + "\t\t" + expectedOutput +"\t\t\t" + (pass? "pass":"fail") + '\n' ;
    }
    return res;    
};

var matchesRegex = function(unitTest, obj){
    var thisArg = obj || null;
    var res = "Test\t\tInput\t\tOuput\t\tExpected\t\tP/F\n";
    for(var ii = 0; ii < unitTest._Input.length; ++ii)
    {
	var regex = unitTest._Output[ii];
	var output = unitTest._func.apply(thisArg, unitTest._Input[ii]);

	var pass = (!!output.match(regex));
	
	res +=  "T" + ii + "\t\t";
	res += unitTest._Input[ii] + "\t\t" + output + "\t\t" + expectedOutput +"\t\t\t" + (pass? "pass":"fail") + '\n' ;
    }
    return res;    
