function UnitTest()
{
	this._Input = new Array(); 
	this._Output = new Array();

}

UnitTest.prototype.AddNew = function (  input,  output)
{
	this._Input.push(input);
	this._Output.push(output);
}

		//Takes an object and a function belonging to that object
UnitTest.prototype.Execute = function (func)
{
	var res = "Test\t\tInput\t\tOuput\t\tExpected\t\tP/F\n";
	for(var ii = 0; ii < this._Input.length; ++ii)
	{
		var currentInputString = this._Input[ii];
		var currentExpectedOutputString = this._Output[ii];
		var trueOutputString ;
		var pass = true;
		trueOutputString = func.apply(null, currentInputString);
		 
		
		if(JSON.stringify(trueOutputString) != JSON.stringify(currentExpectedOutputString))
			pass = false;
		res +=  "T" + ii + "\t\t";
		res += currentInputString + "\t\t" + trueOutputString + "\t\t" + currentExpectedOutputString +"\t\t\t" + (pass? "pass":"fail") + '\n' ;
	}
	return res;
}

function Fibonacci(count)
{
	var now=0;
	var next=1;
	for(var ii = 0; ii < count; ++ii)
	{
		var temp = next;
		next = next + now;
		now = temp;
	}
	return now;
}

var test = new UnitTest();

test.AddNew([0],0);
test.AddNew([1],1);
test.AddNew([2],1);
test.AddNew([3],2);
test.AddNew([4],3);
test.AddNew([5],5);

console.log(test.Execute(Fibonacci));


var test_CleanInput = new UnitTest();

test_CleanInput.AddNew([""],"");
test_CleanInput.AddNew([">GUGUG	U GU G;SDF\n;TUG CU GCUGT"],""); //Unterminated comment
test_CleanInput.AddNew([";GUTCATUHCUA UAHCUHT\nguGuUg ; TUTU"],"");//Comment in tehe middle of the line
test_CleanInput.AddNew([";GUT;  >CAT; >UA HT\n ; >;;>\n;\nAUGCGCUGA"],"AUGCGCUGA");
test_CleanInput.AddNew([";\n\n>gugu"],">GUGU");
test_CleanInput.AddNew([";comment\nAGtC\n"],"AGTC");
console.log(test_CleanInput.Execute(CleanInput));