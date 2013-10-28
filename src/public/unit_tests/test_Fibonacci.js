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

var test = new UnitTest(Fibonacci);

test.AddAllCases([[0],[1],[2],[3],[4],[5]],[0,1,1,2,3,5]);

console.log(floatCompare(test));
