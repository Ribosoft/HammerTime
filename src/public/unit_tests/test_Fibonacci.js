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